
-- 1) school_students: replace email_verified-based self-view with a stable user_id link

ALTER TABLE public.school_students
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS school_students_user_id_idx ON public.school_students(user_id);

-- Backfill existing rows by matching email
UPDATE public.school_students s
SET user_id = u.id
FROM auth.users u
WHERE s.user_id IS NULL
  AND s.email IS NOT NULL
  AND lower(s.email) = lower(u.email);

-- Replace the vulnerable self-view policy
DROP POLICY IF EXISTS "Students can view their own school record" ON public.school_students;

CREATE POLICY "Students can view their own school record"
ON public.school_students
FOR SELECT
TO authenticated
USING (user_id IS NOT NULL AND user_id = auth.uid());

-- Extend handle_new_user to auto-link student rows on signup
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

  -- Link any existing school_students record with the same email to this new auth user
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

-- 2) school_sessions: broaden read access beyond admin-only

CREATE POLICY "Teachers can view all sessions"
ON public.school_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Enrolled students can view their group sessions"
ON public.school_sessions
FOR SELECT
TO authenticated
USING (
  school_sessions.group_id IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM public.school_students s
    WHERE s.user_id = auth.uid()
      AND s.group_id = school_sessions.group_id
  )
);
