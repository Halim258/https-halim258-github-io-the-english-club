
-- Auto-assign teacher role on signup when email matches a school_groups.teacher_email
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_is_teacher boolean := false;
BEGIN
  IF NEW.email IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.school_groups sg
      WHERE sg.teacher_email IS NOT NULL
        AND lower(sg.teacher_email) = lower(NEW.email)
    ) INTO v_is_teacher;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, CASE WHEN v_is_teacher THEN 'teacher'::app_role ELSE 'student'::app_role END)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$function$;

-- Backfill: promote any existing users whose email matches a teacher_email to teacher
UPDATE public.user_roles ur
SET role = 'teacher'::app_role
FROM auth.users u, public.school_groups sg
WHERE ur.user_id = u.id
  AND sg.teacher_email IS NOT NULL
  AND u.email IS NOT NULL
  AND lower(sg.teacher_email) = lower(u.email)
  AND ur.role <> 'teacher'::app_role
  AND ur.role <> 'admin'::app_role
  AND ur.role <> 'secretary'::app_role;

-- Insert teacher role for any matching users who don't yet have a row
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'teacher'::app_role
FROM auth.users u
JOIN public.school_groups sg
  ON sg.teacher_email IS NOT NULL
 AND lower(sg.teacher_email) = lower(u.email)
WHERE NOT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id);
