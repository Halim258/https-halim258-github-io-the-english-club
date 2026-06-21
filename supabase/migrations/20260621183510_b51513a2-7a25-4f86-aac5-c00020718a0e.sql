REVOKE ALL ON FUNCTION public.apply_user_xp_award(uuid, text, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.award_learning_activity_xp(text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.complete_lesson(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_group_teacher(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_my_achievements() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_user_achievements(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_group_enrollment_status(uuid, text) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.award_learning_activity_xp(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_lesson(text, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.sync_my_achievements() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_group_enrollment_status(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_group_teacher(uuid) TO authenticated;