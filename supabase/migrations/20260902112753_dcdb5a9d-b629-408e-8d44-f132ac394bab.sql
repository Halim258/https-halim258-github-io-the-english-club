REVOKE EXECUTE ON FUNCTION public.get_teacher_students_progress() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_teacher_student_lessons(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_teacher_students_progress() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_teacher_student_lessons(uuid) TO authenticated;