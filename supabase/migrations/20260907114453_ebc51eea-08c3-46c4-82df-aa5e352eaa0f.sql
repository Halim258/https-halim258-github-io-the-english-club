CREATE TABLE public.pcc_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  school_or_group text,
  note text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.pcc_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pcc_registrations TO authenticated;
GRANT ALL ON public.pcc_registrations TO service_role;

ALTER TABLE public.pcc_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for PCC"
  ON public.pcc_registrations FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(full_name)) BETWEEN 2 AND 120
    AND length(trim(email)) BETWEEN 5 AND 255
    AND length(trim(phone)) BETWEEN 6 AND 30
    AND coalesce(length(note), 0) <= 1000
    AND coalesce(length(school_or_group), 0) <= 160
    AND status = 'new'
    AND (user_id IS NULL OR user_id = auth.uid())
  );

CREATE POLICY "Users can see their own PCC entry"
  ON public.pcc_registrations FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Staff can read PCC entries"
  ON public.pcc_registrations FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  );

CREATE POLICY "Staff can update PCC entries"
  ON public.pcc_registrations FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  );

CREATE POLICY "Admins can delete PCC entries"
  ON public.pcc_registrations FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER touch_pcc_registrations_updated_at
  BEFORE UPDATE ON public.pcc_registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_curriculum_progress_updated_at();