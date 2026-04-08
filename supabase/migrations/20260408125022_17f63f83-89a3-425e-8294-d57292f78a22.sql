
CREATE TABLE public.discussion_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  level_id TEXT NOT NULL,
  lesson_number INTEGER NOT NULL,
  question_index INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.discussion_answers ENABLE ROW LEVEL SECURITY;

-- Students can insert their own answers
CREATE POLICY "Users can insert own answers"
  ON public.discussion_answers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Students can view their own answers
CREATE POLICY "Users can view own answers"
  ON public.discussion_answers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Students can update their own answers
CREATE POLICY "Users can update own answers"
  ON public.discussion_answers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Teachers can view all answers
CREATE POLICY "Teachers can view all answers"
  ON public.discussion_answers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'teacher'));

-- Admins can view all answers
CREATE POLICY "Admins can view all answers"
  ON public.discussion_answers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Unique constraint: one answer per user per question
CREATE UNIQUE INDEX discussion_answers_unique 
  ON public.discussion_answers (user_id, level_id, lesson_number, question_index);
