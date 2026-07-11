
CREATE TABLE public.lesson_slide_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_key text NOT NULL,
  reached integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_slide_progress TO authenticated;
GRANT ALL ON public.lesson_slide_progress TO service_role;

ALTER TABLE public.lesson_slide_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own slide progress"
  ON public.lesson_slide_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own slide progress"
  ON public.lesson_slide_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own slide progress"
  ON public.lesson_slide_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own slide progress"
  ON public.lesson_slide_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_lesson_slide_progress_user ON public.lesson_slide_progress(user_id);
