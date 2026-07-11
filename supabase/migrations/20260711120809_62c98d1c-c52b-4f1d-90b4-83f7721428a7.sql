
CREATE OR REPLACE FUNCTION public.get_cohort_analytics()
RETURNS TABLE (
  enrollment_id uuid,
  group_id uuid,
  group_level text,
  group_days text,
  teacher_email text,
  teacher_name text,
  cohort_month text,
  enrolled_at timestamptz,
  user_id uuid,
  student_name text,
  status text,
  level_id text,
  completed_count integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ge.id AS enrollment_id,
    ge.group_id,
    sg.level AS group_level,
    sg.days AS group_days,
    sg.teacher_email,
    sg.teacher_name,
    to_char(ge.created_at, 'YYYY-MM') AS cohort_month,
    ge.created_at AS enrolled_at,
    ge.user_id,
    ge.student_name,
    ge.status,
    lp.level_id,
    COALESCE(SUM(CASE WHEN lp.completed THEN 1 ELSE 0 END), 0)::int AS completed_count
  FROM public.group_enrollments ge
  JOIN public.school_groups sg ON sg.id = ge.group_id
  LEFT JOIN public.lesson_progress lp ON lp.user_id = ge.user_id
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
     OR public.is_group_teacher(ge.group_id)
  GROUP BY ge.id, ge.group_id, sg.level, sg.days, sg.teacher_email, sg.teacher_name,
           ge.created_at, ge.user_id, ge.student_name, ge.status, lp.level_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_cohort_analytics() TO authenticated;
