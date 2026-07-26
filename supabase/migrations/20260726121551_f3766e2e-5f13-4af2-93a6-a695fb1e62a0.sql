
ALTER TABLE public.school_students
  ADD COLUMN IF NOT EXISTS access_expires_at timestamptz;

CREATE OR REPLACE FUNCTION public.is_current_user_member()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.school_students s
    WHERE (s.user_id = auth.uid()
       OR (s.email IS NOT NULL AND lower(s.email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
      AND (s.access_expires_at IS NULL OR s.access_expires_at > now())
  )
  OR public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'secretary'::app_role)
  OR public.has_role(auth.uid(), 'teacher'::app_role);
$function$;
