ALTER TABLE public.school_newcomers
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS follow_up_at timestamptz,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS interest text;

CREATE INDEX IF NOT EXISTS school_newcomers_status_idx ON public.school_newcomers (status);
CREATE INDEX IF NOT EXISTS school_newcomers_follow_up_idx ON public.school_newcomers (follow_up_at);