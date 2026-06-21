
-- 1. Drop teacher SELECT policy on group_enrollments (contains contact PII)
DROP POLICY IF EXISTS "Teachers can view own group enrollments" ON public.group_enrollments;

-- 2. Harden is_group_teacher: require verified email
CREATE OR REPLACE FUNCTION public.is_group_teacher(_group_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(auth.uid(), 'teacher'::app_role)
    AND coalesce((auth.jwt() ->> 'email_verified')::boolean, false) = true
    AND EXISTS (
      SELECT 1 FROM public.school_groups sg
      WHERE sg.id = _group_id
        AND sg.teacher_email IS NOT NULL
        AND lower(sg.teacher_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

-- 3. Provide a teacher-facing RPC that returns enrollments WITHOUT student contact info
CREATE OR REPLACE FUNCTION public.get_teacher_group_enrollments()
RETURNS TABLE(
  id uuid,
  group_id uuid,
  student_name text,
  status text,
  created_at timestamptz,
  group_level text,
  group_days text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT ge.id, ge.group_id, ge.student_name, ge.status, ge.created_at,
         sg.level, sg.days
  FROM public.group_enrollments ge
  JOIN public.school_groups sg ON sg.id = ge.group_id
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
     OR public.is_group_teacher(ge.group_id);
$$;

GRANT EXECUTE ON FUNCTION public.get_teacher_group_enrollments() TO authenticated;

-- 4. Add admin SELECT policy on xp_award_events (audit access)
CREATE POLICY "Admins can view xp award events"
  ON public.xp_award_events
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
