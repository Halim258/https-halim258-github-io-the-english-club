
-- Add columns to school_groups for public enrollment
ALTER TABLE public.school_groups 
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS teacher_name text,
  ADD COLUMN IF NOT EXISTS teacher_email text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS max_students integer DEFAULT 20;

-- Allow authenticated users to view public groups
CREATE POLICY "Anyone can view public groups"
  ON public.school_groups FOR SELECT TO authenticated
  USING (is_public = true);

-- Create group enrollments table
CREATE TABLE public.group_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.school_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  student_name text NOT NULL,
  student_email text,
  student_phone text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.group_enrollments ENABLE ROW LEVEL SECURITY;

-- Students can enroll themselves
CREATE POLICY "Users can enroll themselves"
  ON public.group_enrollments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view own enrollments
CREATE POLICY "Users can view own enrollments"
  ON public.group_enrollments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admins and teachers can view all enrollments
CREATE POLICY "Admins can manage enrollments"
  ON public.group_enrollments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can view enrollments"
  ON public.group_enrollments FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role));

-- Teachers can update enrollment status (approve/reject)
CREATE POLICY "Teachers can update enrollments"
  ON public.group_enrollments FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role));
