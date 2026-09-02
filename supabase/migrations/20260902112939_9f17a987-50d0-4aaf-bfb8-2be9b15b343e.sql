CREATE TABLE public.level_assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  level_id text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  passed boolean NOT NULL DEFAULT false,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  teacher_reviewed boolean NOT NULL DEFAULT false,
  teacher_note text,
  teacher_id uuid,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, level_id)
);
GRANT SELECT, INSERT, UPDATE ON public.level_assessment_results TO authenticated;
GRANT ALL ON public.level_assessment_results TO service_role;
ALTER TABLE public.level_assessment_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their assessment results" ON public.level_assessment_results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Students can create their assessment results" ON public.level_assessment_results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND teacher_reviewed = false);
CREATE POLICY "Students can update their assessment results" ON public.level_assessment_results
  FOR UPDATE TO authenticated USING (auth.uid() = user_id AND teacher_reviewed = false)
  WITH CHECK (auth.uid() = user_id AND teacher_reviewed = false);

CREATE OR REPLACE FUNCTION public.submit_level_assessment(
  _level_id text,
  _score integer,
  _total_questions integer,
  _answers jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _level_id IS NULL OR length(trim(_level_id)) = 0 OR length(_level_id) > 80 THEN RAISE EXCEPTION 'Invalid level'; END IF;
  IF _total_questions IS NULL OR _total_questions < 1 OR _total_questions > 100 THEN RAISE EXCEPTION 'Invalid question count'; END IF;
  IF _score IS NULL OR _score < 0 OR _score > _total_questions THEN RAISE EXCEPTION 'Invalid score'; END IF;
  INSERT INTO public.level_assessment_results (user_id, level_id, score, total_questions, passed, answers, teacher_reviewed, teacher_note, teacher_id, completed_at, updated_at)
  VALUES (auth.uid(), lower(trim(_level_id)), _score, _total_questions, _score >= ceil(_total_questions * 0.6), coalesce(_answers, '{}'::jsonb), false, NULL, NULL, now(), now())
  ON CONFLICT (user_id, level_id) DO UPDATE SET
    score = EXCLUDED.score,
    total_questions = EXCLUDED.total_questions,
    passed = EXCLUDED.passed,
    answers = EXCLUDED.answers,
    teacher_reviewed = false,
    teacher_note = NULL,
    teacher_id = NULL,
    completed_at = now(),
    updated_at = now()
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_teacher_level_assessments()
RETURNS TABLE(
  id uuid,
  user_id uuid,
  student_name text,
  level_id text,
  score integer,
  total_questions integer,
  passed boolean,
  teacher_reviewed boolean,
  teacher_note text,
  completed_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT ON (r.id)
    r.id, r.user_id, coalesce(p.full_name, ge.student_name, 'Student'), r.level_id,
    r.score, r.total_questions, r.passed, r.teacher_reviewed, r.teacher_note, r.completed_at
  FROM public.level_assessment_results r
  LEFT JOIN public.profiles p ON p.id = r.user_id
  JOIN public.group_enrollments ge ON ge.user_id = r.user_id
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
     OR public.is_group_teacher(ge.group_id)
  ORDER BY r.id, r.completed_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.complete_teacher_level_review(_result_id uuid, _note text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  SELECT user_id INTO v_user_id FROM public.level_assessment_results WHERE id = _result_id;
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Assessment not found'; END IF;
  IF NOT (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR EXISTS (
      SELECT 1 FROM public.group_enrollments ge
      WHERE ge.user_id = v_user_id AND public.is_group_teacher(ge.group_id)
    )
  ) THEN RAISE EXCEPTION 'Not authorized'; END IF;
  UPDATE public.level_assessment_results
  SET teacher_reviewed = true,
      teacher_note = nullif(trim(coalesce(_note, '')), ''),
      teacher_id = auth.uid(),
      updated_at = now()
  WHERE id = _result_id;
  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_level_assessment(text, integer, integer, jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_teacher_level_assessments() FROM anon;
REVOKE EXECUTE ON FUNCTION public.complete_teacher_level_review(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.submit_level_assessment(text, integer, integer, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_teacher_level_assessments() TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_teacher_level_review(uuid, text) TO authenticated;