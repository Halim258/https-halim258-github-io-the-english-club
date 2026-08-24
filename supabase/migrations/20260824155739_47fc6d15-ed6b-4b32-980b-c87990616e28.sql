-- 1) Backfill missing display names from signup metadata / email
UPDATE public.profiles p
SET full_name = COALESCE(
      NULLIF(trim(u.raw_user_meta_data ->> 'full_name'), ''),
      NULLIF(trim(u.raw_user_meta_data ->> 'name'), ''),
      initcap(replace(split_part(u.email, '@', 1), '.', ' ')),
      'Student'
    ),
    updated_at = now()
FROM auth.users u
WHERE u.id = p.id
  AND (p.full_name IS NULL OR trim(p.full_name) = '');

-- 2) Backfill avatars from OAuth metadata when available
UPDATE public.profiles p
SET avatar_url = COALESCE(
      NULLIF(u.raw_user_meta_data ->> 'avatar_url', ''),
      NULLIF(u.raw_user_meta_data ->> 'picture', '')
    ),
    updated_at = now()
FROM auth.users u
WHERE u.id = p.id
  AND (p.avatar_url IS NULL OR trim(p.avatar_url) = '')
  AND COALESCE(
      NULLIF(u.raw_user_meta_data ->> 'avatar_url', ''),
      NULLIF(u.raw_user_meta_data ->> 'picture', '')
    ) IS NOT NULL;

-- 3) New sign-ups always get a readable name + avatar in their profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_name text;
  v_email text;
  v_avatar text;
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

  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, v_name, v_avatar);

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
    coalesce(v_email, '') || ' just created an account. Confirm payment and enroll them as a student.',
    'info',
    '/admin?tab=new-signups&enroll=' || NEW.id::text
  FROM public.user_roles ur
  WHERE ur.role IN ('admin'::app_role, 'secretary'::app_role);

  RETURN NEW;
END;
$function$;