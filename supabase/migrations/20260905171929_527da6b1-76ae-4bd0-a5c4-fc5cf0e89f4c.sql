DELETE FROM public.user_roles
WHERE user_id IN (
  SELECT id FROM auth.users WHERE lower(email) = 'mohammedjamal999999@gmail.com'
);

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE lower(email) = 'mohammedjamal999999@gmail.com'
ON CONFLICT DO NOTHING;