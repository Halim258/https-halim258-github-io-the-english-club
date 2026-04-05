
-- Profiles table for storing user info
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Placement test results table
CREATE TABLE public.placement_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 50,
  cefr_level TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  time_taken_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.placement_test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own results" ON public.placement_test_results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results" ON public.placement_test_results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow anonymous inserts (show result without login, user_id nullable)
ALTER TABLE public.placement_test_results ALTER COLUMN user_id DROP NOT NULL;

CREATE POLICY "Anyone can insert results" ON public.placement_test_results
  FOR INSERT TO anon WITH CHECK (user_id IS NULL);

CREATE POLICY "Anyone can view own anonymous results" ON public.placement_test_results
  FOR SELECT TO anon USING (user_id IS NULL);
