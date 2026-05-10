-- Favorites
CREATE TABLE public.library_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('book','audiobook','article','word')),
  item_key TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_type, item_key)
);

ALTER TABLE public.library_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own favorites" ON public.library_favorites
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users add own favorites" ON public.library_favorites
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own favorites" ON public.library_favorites
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_library_favorites_user ON public.library_favorites(user_id, created_at DESC);

-- History
CREATE TABLE public.library_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('book','audiobook','article','word')),
  item_key TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_type, item_key)
);

ALTER TABLE public.library_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own history" ON public.library_history
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users add own history" ON public.library_history
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own history" ON public.library_history
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own history" ON public.library_history
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_library_history_user ON public.library_history(user_id, viewed_at DESC);