CREATE POLICY "Admins can update any comment"
ON public.community_comments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete any comment"
ON public.community_comments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));