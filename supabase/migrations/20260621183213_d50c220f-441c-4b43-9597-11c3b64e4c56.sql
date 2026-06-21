-- Lock direct achievement writes and move awarding to validated backend functions
DROP POLICY IF EXISTS "Users can earn achievements" ON public.achievements;
REVOKE INSERT, UPDATE, DELETE ON public.achievements FROM anon, authenticated;
GRANT SELECT ON public.achievements TO authenticated;
GRANT ALL ON public.achievements TO service_role;

-- Lock direct XP writes; XP changes now go through SECURITY DEFINER functions only
DROP POLICY IF EXISTS "Users can create own XP" ON public.user_xp;
DROP POLICY IF EXISTS "Users can update own XP" ON public.user_xp;
REVOKE INSERT, UPDATE, DELETE ON public.user_xp FROM anon, authenticated;
GRANT SELECT ON public.user_xp TO authenticated;
GRANT ALL ON public.user_xp TO service_role;

-- Private award ledger used by backend functions to prevent duplicate XP grants
CREATE TABLE IF NOT EXISTS public.xp_award_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  source text NOT NULL,
  source_key text NOT NULL,
  amount integer NOT NULL CHECK (amount > 0 AND amount <= 100),
  awarded_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, source, source_key)
);

GRANT ALL ON public.xp_award_events TO service_role;
ALTER TABLE public.xp_award_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_xp_award_events_user_source
  ON public.xp_award_events (user_id, source, awarded_at DESC);

CREATE OR REPLACE FUNCTION public.sync_user_achievements(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_completed_count integer := 0;
  v_current_streak integer := 0;
BEGIN
  IF _user_id IS NULL THEN
    RETURN;
  END IF;

  SELECT count(*)::integer
    INTO v_completed_count
  FROM public.lesson_progress
  WHERE user_id = _user_id
    AND completed = true;

  SELECT coalesce(max(current_streak), 0)
    INTO v_current_streak
  FROM public.user_xp
  WHERE user_id = _user_id;

  INSERT INTO public.achievements (user_id, badge_key)
  SELECT _user_id, badge_key
  FROM (
    VALUES
      ('first_test', EXISTS (SELECT 1 FROM public.placement_test_results WHERE user_id = _user_id)),
      ('five_lessons', v_completed_count >= 5),
      ('ten_lessons', v_completed_count >= 10),
      ('twenty_lessons', v_completed_count >= 20),
      ('fifty_lessons', v_completed_count >= 50),
      ('hundred_lessons', v_completed_count >= 100),
      ('perfect_score', EXISTS (
        SELECT 1 FROM public.lesson_progress
        WHERE user_id = _user_id AND coalesce(score, 0) >= 100
      ) OR EXISTS (
        SELECT 1 FROM public.placement_test_results
        WHERE user_id = _user_id AND score = total_questions
      )),
      ('streak_3', v_current_streak >= 3),
      ('streak_7', v_current_streak >= 7),
      ('streak_30', v_current_streak >= 30),
      ('level_up', (SELECT count(DISTINCT cefr_level) FROM public.placement_test_results WHERE user_id = _user_id) > 1),
      ('first_bookmark', EXISTS (SELECT 1 FROM public.bookmarks WHERE user_id = _user_id)),
      ('community_post', EXISTS (SELECT 1 FROM public.community_posts WHERE user_id = _user_id))
  ) AS eligibility(badge_key, is_eligible)
  WHERE is_eligible
  ON CONFLICT (user_id, badge_key) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_user_achievements(uuid) FROM PUBLIC;

CREATE OR REPLACE FUNCTION public.sync_my_achievements()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  PERFORM public.sync_user_achievements(v_user);
END;
$$;

REVOKE ALL ON FUNCTION public.sync_my_achievements() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sync_my_achievements() TO authenticated;

CREATE OR REPLACE FUNCTION public.apply_user_xp_award(
  _user_id uuid,
  _source text,
  _source_key text,
  _amount integer
)
RETURNS TABLE(total_xp integer, current_streak integer, longest_streak integer, xp_earned integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_today date := current_date;
  v_yesterday date := current_date - 1;
  v_inserted_amount integer;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'User is required';
  END IF;

  IF _source IS NULL OR length(trim(_source)) = 0 OR _source_key IS NULL OR length(trim(_source_key)) = 0 THEN
    RAISE EXCEPTION 'Award source is required';
  END IF;

  IF _amount IS NULL OR _amount <= 0 OR _amount > 100 THEN
    RAISE EXCEPTION 'Invalid XP amount';
  END IF;

  INSERT INTO public.xp_award_events (user_id, source, source_key, amount)
  VALUES (_user_id, _source, _source_key, _amount)
  ON CONFLICT (user_id, source, source_key) DO NOTHING
  RETURNING amount INTO v_inserted_amount;

  IF v_inserted_amount IS NULL THEN
    RETURN QUERY
    SELECT ux.total_xp, ux.current_streak, ux.longest_streak, 0
    FROM public.user_xp ux
    WHERE ux.user_id = _user_id;
    RETURN;
  END IF;

  INSERT INTO public.user_xp (user_id, total_xp, current_streak, longest_streak, last_activity_date)
  VALUES (_user_id, _amount, 1, 1, v_today)
  ON CONFLICT (user_id) DO UPDATE SET
    total_xp = public.user_xp.total_xp + EXCLUDED.total_xp,
    current_streak = CASE
      WHEN public.user_xp.last_activity_date = v_today THEN public.user_xp.current_streak
      WHEN public.user_xp.last_activity_date = v_yesterday THEN public.user_xp.current_streak + 1
      ELSE 1
    END,
    longest_streak = GREATEST(
      public.user_xp.longest_streak,
      CASE
        WHEN public.user_xp.last_activity_date = v_today THEN public.user_xp.current_streak
        WHEN public.user_xp.last_activity_date = v_yesterday THEN public.user_xp.current_streak + 1
        ELSE 1
      END
    ),
    last_activity_date = v_today
  RETURNING public.user_xp.total_xp, public.user_xp.current_streak, public.user_xp.longest_streak, _amount
  INTO total_xp, current_streak, longest_streak, xp_earned;

  PERFORM public.sync_user_achievements(_user_id);
  RETURN NEXT;
END;
$$;

REVOKE ALL ON FUNCTION public.apply_user_xp_award(uuid, text, text, integer) FROM PUBLIC;

CREATE OR REPLACE FUNCTION public.complete_lesson(
  _level_id text,
  _lesson_number integer,
  _score integer DEFAULT NULL
)
RETURNS TABLE(completed boolean, xp_earned integer, total_xp integer, current_streak integer, longest_streak integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_existing_completed boolean;
  v_should_award boolean := false;
  v_xp_amount integer;
  v_award record;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF _level_id IS NULL OR length(trim(_level_id)) < 1 OR length(_level_id) > 40 THEN
    RAISE EXCEPTION 'Invalid level';
  END IF;

  IF _lesson_number IS NULL OR _lesson_number < 1 OR _lesson_number > 1000 THEN
    RAISE EXCEPTION 'Invalid lesson number';
  END IF;

  IF _score IS NOT NULL AND (_score < 0 OR _score > 100) THEN
    RAISE EXCEPTION 'Invalid score';
  END IF;

  SELECT lp.completed
    INTO v_existing_completed
  FROM public.lesson_progress lp
  WHERE lp.user_id = v_user
    AND lp.level_id = _level_id
    AND lp.lesson_number = _lesson_number
  FOR UPDATE;

  IF FOUND THEN
    v_should_award := NOT coalesce(v_existing_completed, false);

    UPDATE public.lesson_progress
    SET completed = true,
        completed_at = now(),
        score = _score
    WHERE user_id = v_user
      AND level_id = _level_id
      AND lesson_number = _lesson_number;
  ELSE
    v_should_award := true;

    INSERT INTO public.lesson_progress (user_id, level_id, lesson_number, completed, completed_at, score)
    VALUES (v_user, _level_id, _lesson_number, true, now(), _score);
  END IF;

  IF v_should_award THEN
    v_xp_amount := CASE
      WHEN _score IS NULL THEN 15
      ELSE GREATEST(10, ROUND(_score::numeric / 2)::integer)
    END;

    SELECT * INTO v_award
    FROM public.apply_user_xp_award(
      v_user,
      'lesson',
      lower(trim(_level_id)) || ':' || _lesson_number::text,
      v_xp_amount
    );

    RETURN QUERY SELECT true, v_award.xp_earned, v_award.total_xp, v_award.current_streak, v_award.longest_streak;
    RETURN;
  END IF;

  PERFORM public.sync_user_achievements(v_user);

  RETURN QUERY
  SELECT true, 0, ux.total_xp, ux.current_streak, ux.longest_streak
  FROM public.user_xp ux
  WHERE ux.user_id = v_user;
END;
$$;

REVOKE ALL ON FUNCTION public.complete_lesson(text, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complete_lesson(text, integer, integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.award_learning_activity_xp(
  _activity text,
  _score integer DEFAULT NULL
)
RETURNS TABLE(total_xp integer, current_streak integer, longest_streak integer, xp_earned integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_amount integer;
  v_source_key text;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  CASE _activity
    WHEN 'writing_practice' THEN
      v_amount := 15;
      v_source_key := current_date::text;
    WHEN 'vocab_quiz' THEN
      IF _score IS NULL OR _score < 0 OR _score > 10 THEN
        RAISE EXCEPTION 'Invalid quiz score';
      END IF;
      v_amount := _score * 10;
      v_source_key := current_date::text;
    ELSE
      RAISE EXCEPTION 'Unsupported learning activity';
  END CASE;

  IF v_amount <= 0 THEN
    RETURN QUERY
    SELECT ux.total_xp, ux.current_streak, ux.longest_streak, 0
    FROM public.user_xp ux
    WHERE ux.user_id = v_user;
    RETURN;
  END IF;

  RETURN QUERY
  SELECT * FROM public.apply_user_xp_award(v_user, _activity, v_source_key, v_amount);
END;
$$;

REVOKE ALL ON FUNCTION public.award_learning_activity_xp(text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.award_learning_activity_xp(text, integer) TO authenticated;

-- Teacher-scoped enrollment access based on the signed-in teacher's verified backend role and group email assignment
CREATE OR REPLACE FUNCTION public.is_group_teacher(_group_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'teacher'::app_role)
    AND EXISTS (
      SELECT 1
      FROM public.school_groups sg
      WHERE sg.id = _group_id
        AND sg.teacher_email IS NOT NULL
        AND lower(sg.teacher_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

REVOKE ALL ON FUNCTION public.is_group_teacher(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_group_teacher(uuid) TO authenticated;

DROP POLICY IF EXISTS "Teachers can view enrollments" ON public.group_enrollments;
DROP POLICY IF EXISTS "Teachers can update enrollments" ON public.group_enrollments;
DROP POLICY IF EXISTS "Teachers can view own group enrollments" ON public.group_enrollments;

CREATE POLICY "Teachers can view own group enrollments"
ON public.group_enrollments
FOR SELECT
TO authenticated
USING (public.is_group_teacher(group_id));

CREATE OR REPLACE FUNCTION public.update_group_enrollment_status(
  _enrollment_id uuid,
  _status text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_group_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF _status NOT IN ('pending', 'approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status';
  END IF;

  SELECT ge.group_id
    INTO v_group_id
  FROM public.group_enrollments ge
  WHERE ge.id = _enrollment_id;

  IF v_group_id IS NULL THEN
    RAISE EXCEPTION 'Enrollment not found';
  END IF;

  IF NOT (public.has_role(auth.uid(), 'admin'::app_role) OR public.is_group_teacher(v_group_id)) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  UPDATE public.group_enrollments
  SET status = _status
  WHERE id = _enrollment_id;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.update_group_enrollment_status(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_group_enrollment_status(uuid, text) TO authenticated;