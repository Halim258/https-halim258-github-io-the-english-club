-- Add teacher to the role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'teacher';

-- Add youtube_intro_url to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS youtube_intro_url text DEFAULT NULL;
