DROP POLICY IF EXISTS "Authenticated users can view reviews" ON public.reviews;

CREATE POLICY "Users can view their own reviews"
ON public.reviews FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reviews"
ON public.reviews FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));