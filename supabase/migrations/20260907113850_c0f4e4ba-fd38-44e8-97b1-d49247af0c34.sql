ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name text;
  v_email text;
  v_avatar text;
  v_phone text;
BEGIN
  v_email := NEW.email;
  v_name := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data ->> 'full_name'), ''),
    NULLIF(trim(NEW.raw_user_meta_data ->> 'name'), ''),
    initcap(replace(split_part(v_email, '@', 1), '.', ' ')),
    'New user'
  );
  v_avatar := COALESCE(
    NULLIF(NEW.raw_user_meta_data ->> 'avatar_url', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'picture', '')
  );
  v_phone := NULLIF(trim(NEW.raw_user_meta_data ->> 'phone'), '');

  INSERT INTO public.profiles (id, full_name, avatar_url, phone)
  VALUES (NEW.id, v_name, v_avatar, v_phone);

  IF v_email IS NOT NULL THEN
    UPDATE public.school_students
      SET user_id = NEW.id
      WHERE user_id IS NULL
        AND email IS NOT NULL
        AND lower(email) = lower(v_email);
  END IF;

  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT
    ur.user_id,
    'New sign-up: ' || v_name,
    coalesce(v_email, '')
      || CASE WHEN v_phone IS NOT NULL THEN ' (' || v_phone || ')' ELSE '' END
      || ' just created an account. Confirm payment and enroll them as a student.',
    'info',
    '/admin?tab=new-signups&enroll=' || NEW.id::text
  FROM public.user_roles ur
  WHERE ur.role IN ('admin'::app_role, 'secretary'::app_role);

  RETURN NEW;
END;
$$;