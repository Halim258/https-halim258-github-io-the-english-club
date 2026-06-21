REVOKE EXECUTE ON FUNCTION public.get_school_group_teacher_email(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_school_group_teacher_email(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;