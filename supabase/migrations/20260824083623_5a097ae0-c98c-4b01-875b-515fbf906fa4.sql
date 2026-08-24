create or replace function public.get_student_slide_progress(_user_id uuid)
returns table (
  lesson_key text,
  reached integer,
  total integer,
  updated_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not (
    _user_id = auth.uid()
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'secretary')
    or public.has_role(auth.uid(), 'teacher')
  ) then
    raise exception 'not authorized';
  end if;

  return query
    select p.lesson_key, p.reached, p.total, p.updated_at
    from public.lesson_slide_progress p
    where p.user_id = _user_id
    order by p.updated_at desc;
end;
$$;

create or replace function public.get_student_activity_feed(_user_id uuid, _limit integer default 40)
returns table (
  kind text,
  title text,
  detail text,
  amount integer,
  happened_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not (
    _user_id = auth.uid()
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'secretary')
    or public.has_role(auth.uid(), 'teacher')
  ) then
    raise exception 'not authorized';
  end if;

  return query
  with items as (
    select 'lesson'::text as kind,
           'Completed lesson ' || lp.lesson_number as title,
           lp.level_id as detail,
           lp.score as amount,
           lp.completed_at as happened_at
    from public.lesson_progress lp
    where lp.user_id = _user_id and lp.completed and lp.completed_at is not null
    union all
    select 'xp', 'Earned XP', e.source || ' · ' || e.source_key, e.amount, e.awarded_at
    from public.xp_award_events e
    where e.user_id = _user_id
    union all
    select 'library', h.title, h.item_type, null::integer, h.viewed_at
    from public.library_history h
    where h.user_id = _user_id
    union all
    select 'badge', replace(a.badge_key, '_', ' '), 'achievement', null::integer, a.earned_at
    from public.achievements a
    where a.user_id = _user_id
    union all
    select 'test', 'Placement test · ' || t.cefr_level, t.score || '/' || t.total_questions, t.score, t.created_at
    from public.placement_test_results t
    where t.user_id = _user_id
  )
  select i.kind, i.title, i.detail, i.amount, i.happened_at
  from items i
  order by i.happened_at desc
  limit greatest(1, least(coalesce(_limit, 40), 200));
end;
$$;

grant execute on function public.get_student_slide_progress(uuid) to authenticated;
grant execute on function public.get_student_activity_feed(uuid, integer) to authenticated;