
CREATE OR REPLACE FUNCTION public.get_recent_signups(_limit integer DEFAULT 100)
RETURNS TABLE(id uuid, full_name text, email text, avatar_url text, created_at timestamptz, is_student boolean, role app_role)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    p.full_name,
    u.email::text AS email,
    p.avatar_url,
    p.created_at,
    EXISTS (
      SELECT 1 FROM public.school_students s
      WHERE (s.email IS NOT NULL AND lower(s.email) = lower(u.email::text))
    ) AS is_student,
    (SELECT ur.role FROM public.user_roles ur WHERE ur.user_id = p.id LIMIT 1) AS role
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
     OR public.has_role(auth.uid(), 'secretary'::app_role)
  ORDER BY p.created_at DESC
  LIMIT LEAST(GREATEST(coalesce(_limit, 100), 1), 500);
$$;

GRANT EXECUTE ON FUNCTION public.get_recent_signups(integer) TO authenticated;
