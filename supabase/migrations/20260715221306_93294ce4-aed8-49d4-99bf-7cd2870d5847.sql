
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_name text;
  v_email text;
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');

  v_name := coalesce(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1), 'New user');
  v_email := NEW.email;

  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT
    ur.user_id,
    'New sign-up: ' || v_name,
    coalesce(v_email, '') || ' just created an account. Confirm payment and enroll them as a student.',
    'info',
    '/admin?tab=new-signups&enroll=' || NEW.id::text
  FROM public.user_roles ur
  WHERE ur.role IN ('admin'::app_role, 'secretary'::app_role);

  RETURN NEW;
END;
$function$;
