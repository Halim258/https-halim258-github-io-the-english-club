CREATE TABLE public.drawing_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level_id text NOT NULL,
  lesson_number integer NOT NULL,
  image_path text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.drawing_submissions TO authenticated;
GRANT ALL ON public.drawing_submissions TO service_role;

ALTER TABLE public.drawing_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own drawing submissions"
ON public.drawing_submissions FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers and admins can view all"
ON public.drawing_submissions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

CREATE INDEX idx_drawing_submissions_user_lesson
  ON public.drawing_submissions(user_id, level_id, lesson_number);

CREATE TRIGGER trg_drawing_submissions_updated_at
BEFORE UPDATE ON public.drawing_submissions
FOR EACH ROW EXECUTE FUNCTION public.update_curriculum_progress_updated_at();

-- Storage RLS on objects
CREATE POLICY "Users can view own drawing files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'drawing-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload own drawing files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'drawing-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own drawing files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'drawing-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own drawing files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'drawing-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Teachers and admins can view all drawing files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'drawing-submissions' AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role)));