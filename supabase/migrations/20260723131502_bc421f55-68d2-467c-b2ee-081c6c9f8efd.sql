
CREATE OR REPLACE FUNCTION public.is_current_user_member()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.school_students s
    WHERE s.user_id = auth.uid()
       OR (s.email IS NOT NULL AND lower(s.email) = lower(coalesce(auth.jwt() ->> 'email', '')))
  )
  OR public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'secretary'::app_role)
  OR public.has_role(auth.uid(), 'teacher'::app_role);
$$;

GRANT EXECUTE ON FUNCTION public.is_current_user_member() TO authenticated;
