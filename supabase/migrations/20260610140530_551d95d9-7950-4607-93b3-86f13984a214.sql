
-- 1. Daily challenges: hide correct_answer from clients
DROP POLICY IF EXISTS "Anyone authenticated can view daily challenges" ON public.daily_challenges;

CREATE POLICY "Authenticated can view daily challenges"
ON public.daily_challenges
FOR SELECT
TO authenticated
USING (true);

REVOKE SELECT (correct_answer) ON public.daily_challenges FROM authenticated, anon;

-- Server-side validation RPC
CREATE OR REPLACE FUNCTION public.submit_daily_challenge(_challenge_id uuid, _answer text)
RETURNS TABLE (is_correct boolean, correct_answer text, xp_earned integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_correct text;
  v_xp integer;
  v_is_correct boolean;
  v_already_done boolean;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT dc.correct_answer, dc.xp_reward
    INTO v_correct, v_xp
  FROM public.daily_challenges dc
  WHERE dc.id = _challenge_id;

  IF v_correct IS NULL THEN
    RAISE EXCEPTION 'Challenge not found';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.daily_challenge_completions
    WHERE user_id = v_user AND challenge_id = _challenge_id
  ) INTO v_already_done;

  v_is_correct := (_answer = v_correct);

  IF NOT v_already_done THEN
    INSERT INTO public.daily_challenge_completions (user_id, challenge_id, is_correct, xp_earned)
    VALUES (v_user, _challenge_id, v_is_correct, CASE WHEN v_is_correct THEN v_xp ELSE 0 END);

    IF v_is_correct THEN
      UPDATE public.user_xp
        SET total_xp = total_xp + v_xp
      WHERE user_id = v_user;
    END IF;
  END IF;

  RETURN QUERY SELECT v_is_correct, v_correct, CASE WHEN v_is_correct AND NOT v_already_done THEN v_xp ELSE 0 END;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_daily_challenge(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_daily_challenge(uuid, text) TO authenticated;

-- 2. Placement test results: remove anonymous public SELECT
DROP POLICY IF EXISTS "Anyone can view own anonymous results" ON public.placement_test_results;

-- 3. Lock down trigger SECURITY DEFINER functions (they are only used by triggers)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_xp() FROM PUBLIC, anon, authenticated;

-- 4. Remove sensitive tables from Realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_students;
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_sessions;
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_income;
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_outcome;
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_receipts;
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_newcomers;
ALTER PUBLICATION supabase_realtime DROP TABLE public.school_attendance;
