create or replace function public.is_public_group(_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.school_groups g
    where g.id = _group_id and g.is_public = true
  )
$$;

drop policy if exists "Users can enroll themselves" on public.group_enrollments;

create policy "Users can enroll themselves in public groups"
on public.group_enrollments
for insert
to authenticated
with check (
  auth.uid() = user_id
  and public.is_public_group(group_id)
  and status in ('pending','approved')
  and char_length(coalesce(student_name,'')) between 1 and 120
  and (student_email is null or (char_length(student_email) <= 200 and student_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  and (student_phone is null or student_phone ~ '^[0-9+()\-\s]{5,25}$')
);