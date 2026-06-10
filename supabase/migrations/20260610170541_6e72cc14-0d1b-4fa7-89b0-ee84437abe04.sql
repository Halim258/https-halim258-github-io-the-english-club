-- 1. Drop overly permissive teacher policies on group_enrollments
DROP POLICY IF EXISTS "Teachers can view enrollments" ON public.group_enrollments;
DROP POLICY IF EXISTS "Teachers can update enrollments" ON public.group_enrollments;

-- 2. Explicit INSERT policy on user_roles — only admins
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Re-revoke correct_answer column read for client roles
REVOKE SELECT (correct_answer) ON public.daily_challenges FROM anon, authenticated;

-- 4. Allow authenticated users to view profiles (needed for community display)
DROP POLICY IF EXISTS "Authenticated can view profiles" ON public.profiles;
CREATE POLICY "Authenticated can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);
