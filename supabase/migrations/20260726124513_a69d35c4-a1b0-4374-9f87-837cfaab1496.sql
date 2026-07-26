-- Promote Radwa Badwi (personal email) to teacher and align school_groups.teacher_email
UPDATE public.user_roles SET role = 'teacher'::app_role
WHERE user_id = 'c4a0ce2e-e26a-4785-bb4e-fe069957070a';

UPDATE public.school_groups
SET teacher_email = 'radwabadwi20299@gmail.com'
WHERE id = 'f919f055-1169-40df-b40a-46232a4c5f87';