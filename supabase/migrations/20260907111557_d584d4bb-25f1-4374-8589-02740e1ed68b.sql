CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Tip of the day',
  english text NOT NULL,
  arabic text,
  action text,
  image_url text,
  hashtags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  publish_date date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX blog_posts_publish_date_idx ON public.blog_posts (publish_date DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (published = true AND publish_date <= (now() AT TIME ZONE 'utc')::date);

CREATE POLICY "Staff can read all posts"
ON public.blog_posts FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary') OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Staff can create posts"
ON public.blog_posts FOR INSERT
TO authenticated
WITH CHECK (author_id = auth.uid() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary') OR public.has_role(auth.uid(), 'teacher')));

CREATE POLICY "Authors and admins can update posts"
ON public.blog_posts FOR UPDATE
TO authenticated
USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors and admins can delete posts"
ON public.blog_posts FOR DELETE
TO authenticated
USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_blog_posts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_touch_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.touch_blog_posts_updated_at();