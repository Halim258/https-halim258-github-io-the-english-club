-- Stop exposing reviewer user_id to anonymous internet users.
drop policy if exists "Anyone can view reviews" on public.reviews;

create policy "Authenticated users can view reviews"
on public.reviews
for select
to authenticated
using (true);

revoke select on public.reviews from anon;

-- Public-safe read path: no user_id exposed, only an is_mine flag.
create or replace function public.get_public_reviews(_limit integer default 20)
returns table (
  id uuid,
  display_name text,
  text text,
  rating integer,
  created_at timestamptz,
  is_mine boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select r.id, r.display_name, r.text, r.rating, r.created_at,
         (auth.uid() is not null and r.user_id = auth.uid()) as is_mine
  from public.reviews r
  order by r.created_at desc
  limit greatest(1, least(coalesce(_limit, 20), 50))
$$;

grant execute on function public.get_public_reviews(integer) to anon, authenticated;