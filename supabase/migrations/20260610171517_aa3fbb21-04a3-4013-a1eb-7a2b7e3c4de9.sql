
-- 1) Daily challenges: reassert column-level revoke on correct_answer
REVOKE SELECT (correct_answer) ON public.daily_challenges FROM anon, authenticated;
COMMENT ON COLUMN public.daily_challenges.correct_answer IS 'Server-only. SELECT revoked from anon/authenticated. Use submit_daily_challenge RPC to validate answers.';

-- 2) school_groups: stop exposing teacher_email to all authenticated users
DROP POLICY IF EXISTS "Anyone can view public groups" ON public.school_groups;

-- Revoke column-level SELECT of teacher_email from clients; admin reads happen via RPC/service_role
REVOKE SELECT (teacher_email) ON public.school_groups FROM anon, authenticated;
GRANT SELECT (teacher_email) ON public.school_groups TO service_role;

-- Safe public listing function (excludes teacher_email)
CREATE OR REPLACE FUNCTION public.get_public_school_groups()
RETURNS TABLE (
  id uuid,
  level text,
  days text,
  start_time text,
  end_time text,
  teacher_name text,
  description text,
  max_students integer,
  is_public boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, level, days, start_time, end_time, teacher_name, description, max_students, is_public
  FROM public.school_groups
  WHERE is_public = true;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_school_groups() TO anon, authenticated;

-- Admin-only function to read teacher_email when needed
CREATE OR REPLACE FUNCTION public.get_school_group_teacher_email(_group_id uuid)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  SELECT teacher_email INTO v_email FROM public.school_groups WHERE id = _group_id;
  RETURN v_email;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_school_group_teacher_email(uuid) TO authenticated;
