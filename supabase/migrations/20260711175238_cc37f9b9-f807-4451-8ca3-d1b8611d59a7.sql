
-- ── Community: restrict reads to authenticated users ──────────────────
DROP POLICY IF EXISTS "Anyone can view posts" ON public.community_posts;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.community_comments;
DROP POLICY IF EXISTS "Anyone can view likes" ON public.community_likes;

CREATE POLICY "Authenticated users can view posts"
  ON public.community_posts FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Authenticated users can view comments"
  ON public.community_comments FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Authenticated users can view likes"
  ON public.community_likes FOR SELECT
  TO authenticated USING (true);

-- Revoke anon SELECT on these tables (defense in depth)
REVOKE SELECT ON public.community_posts FROM anon;
REVOKE SELECT ON public.community_comments FROM anon;
REVOKE SELECT ON public.community_likes FROM anon;

-- ── user_xp: scope direct SELECT to owner (+ admins) ─────────────────
DROP POLICY IF EXISTS "Anyone can view XP" ON public.user_xp;

CREATE POLICY "Users read their own XP"
  ON public.user_xp FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins read all XP"
  ON public.user_xp FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

REVOKE SELECT ON public.user_xp FROM anon;

-- ── Leaderboard RPC: expose only ranking fields, authenticated only ──
CREATE OR REPLACE FUNCTION public.get_leaderboard_xp(_limit integer DEFAULT 100)
RETURNS TABLE (
  user_id uuid,
  total_xp integer,
  current_streak integer,
  longest_streak integer,
  last_activity_date date
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ux.user_id, ux.total_xp, ux.current_streak, ux.longest_streak, ux.last_activity_date
  FROM public.user_xp ux
  WHERE auth.uid() IS NOT NULL
  ORDER BY ux.total_xp DESC
  LIMIT LEAST(GREATEST(coalesce(_limit, 100), 1), 500);
$$;

REVOKE ALL ON FUNCTION public.get_leaderboard_xp(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard_xp(integer) TO authenticated;
