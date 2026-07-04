
CREATE TABLE public.curriculum_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_slug text NOT NULL,
  course_index integer NOT NULL,
  completed_steps integer[] NOT NULL DEFAULT '{}',
  checklists jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes jsonb NOT NULL DEFAULT '{}'::jsonb,
  quiz_answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  quiz_submitted jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, category_slug, course_index)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.curriculum_progress TO authenticated;
GRANT ALL ON public.curriculum_progress TO service_role;

ALTER TABLE public.curriculum_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own curriculum progress"
  ON public.curriculum_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own curriculum progress"
  ON public.curriculum_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own curriculum progress"
  ON public.curriculum_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own curriculum progress"
  ON public.curriculum_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_curriculum_progress_user ON public.curriculum_progress(user_id);

CREATE OR REPLACE FUNCTION public.update_curriculum_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_curriculum_progress_updated_at
BEFORE UPDATE ON public.curriculum_progress
FOR EACH ROW EXECUTE FUNCTION public.update_curriculum_progress_updated_at();
