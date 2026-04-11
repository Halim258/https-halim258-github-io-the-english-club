
CREATE POLICY "Admins can insert notifications for any user"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
