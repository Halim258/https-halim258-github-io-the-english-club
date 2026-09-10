UPDATE public.school_students SET school_group_id = NULL, group_id = NULL WHERE school_group_id IS NOT NULL OR group_id IS NOT NULL;
UPDATE public.school_groups SET teacher_employee_id = NULL;
DELETE FROM public.group_enrollments;
DELETE FROM public.school_groups;