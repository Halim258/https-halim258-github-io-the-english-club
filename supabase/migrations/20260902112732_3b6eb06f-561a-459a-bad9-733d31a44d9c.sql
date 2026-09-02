CREATE OR REPLACE FUNCTION public.get_teacher_students_progress()
RETURNS TABLE(
  user_id uuid,
  student_name text,
  group_id uuid,
  group_level text,
  group_days text,
  status text,
  enrolled_at timestamp with time zone,
  lessons_completed integer,
  avg_accuracy integer,
  total_xp integer,
  current_streak integer,
  last_activity_date date,
  in_progress_count integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH mine AS (
    SELECT DISTINCT ge.user_id, ge.student_name, ge.group_id, ge.status, ge.created_at,
           sg.level, sg.days
    FROM public.group_enrollments ge
    JOIN public.school_groups sg ON sg.id = ge.group_id
    WHERE public.has_role(auth.uid(), 'admin'::app_role)
       OR public.is_group_teacher(ge.group_id)
  )
  SELECT
    m.user_id,
    m.student_name,
    m.group_id,
    m.level,
    m.days,
    m.status,
    m.created_at,
    COALESCE((SELECT count(*) FROM public.lesson_progress lp
              WHERE lp.user_id = m.user_id AND lp.completed), 0)::int,
    COALESCE((SELECT round(avg(lp.score))::int FROM public.lesson_progress lp
              WHERE lp.user_id = m.user_id AND lp.completed AND lp.score IS NOT NULL), 0)::int,
    COALESCE((SELECT ux.total_xp FROM public.user_xp ux WHERE ux.user_id = m.user_id), 0),
    COALESCE((SELECT ux.current_streak FROM public.user_xp ux WHERE ux.user_id = m.user_id), 0),
    (SELECT ux.last_activity_date FROM public.user_xp ux WHERE ux.user_id = m.user_id),
    COALESCE((SELECT count(*) FROM public.lesson_slide_progress sp
              WHERE sp.user_id = m.user_id
                AND sp.total > 0
                AND sp.reached + 1 < sp.total
                AND NOT EXISTS (
                  SELECT 1 FROM public.lesson_progress lp
                  WHERE lp.user_id = m.user_id AND lp.completed
                    AND lp.level_id || '-' || lp.lesson_number::text = sp.lesson_key
                )), 0)::int
  FROM mine m
  ORDER BY m.student_name;
$$;

CREATE OR REPLACE FUNCTION public.get_teacher_student_lessons(_user_id uuid)
RETURNS TABLE(
  level_id text,
  lesson_number integer,
  completed boolean,
  score integer,
  completed_at timestamp with time zone,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR EXISTS (
      SELECT 1 FROM public.group_enrollments ge
      WHERE ge.user_id = _user_id AND public.is_group_teacher(ge.group_id)
    )
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT lp.level_id, lp.lesson_number, lp.completed, lp.score, lp.completed_at, lp.created_at
  FROM public.lesson_progress lp
  WHERE lp.user_id = _user_id
  ORDER BY lp.level_id, lp.lesson_number;
END;
$$;