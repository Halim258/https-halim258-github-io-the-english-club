-- Make admin-only SELECT on school_products explicit (in addition to the existing admin ALL policy)
DROP POLICY IF EXISTS "Only admins can view school_products" ON public.school_products;
CREATE POLICY "Only admins can view school_products"
ON public.school_products
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

COMMENT ON TABLE public.school_products IS 'Admin-only inventory/pricing. No student-facing read access by design. If a public catalog is needed, add a narrowly scoped SELECT policy.';
