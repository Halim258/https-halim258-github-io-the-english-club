DROP POLICY IF EXISTS "Authenticated users can view posts" ON public.community_posts;
CREATE POLICY "Members and staff can view posts"
ON public.community_posts FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  OR public.is_current_user_member()
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'teacher')
  OR public.has_role(auth.uid(), 'secretary')
);

DROP POLICY IF EXISTS "Authenticated users can view comments" ON public.community_comments;
CREATE POLICY "Members and staff can view comments"
ON public.community_comments FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  OR public.is_current_user_member()
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'teacher')
  OR public.has_role(auth.uid(), 'secretary')
);