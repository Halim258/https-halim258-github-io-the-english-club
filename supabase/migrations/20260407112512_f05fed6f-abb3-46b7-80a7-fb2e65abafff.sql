
CREATE TABLE public.school_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.school_sessions(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT NOT NULL,
  student_id_legacy INTEGER,
  check_in TIMESTAMP WITH TIME ZONE DEFAULT now(),
  check_out TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'present',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.school_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage school_attendance"
  ON public.school_attendance
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
