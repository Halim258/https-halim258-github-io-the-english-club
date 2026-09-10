ALTER TABLE public.school_groups ADD COLUMN IF NOT EXISTS teacher_employee_id uuid REFERENCES public.school_employees(id) ON DELETE SET NULL;
ALTER TABLE public.school_students ADD COLUMN IF NOT EXISTS school_group_id uuid REFERENCES public.school_groups(id) ON DELETE SET NULL;

-- create real group rows for legacy group numbers still referenced by students
INSERT INTO public.school_groups (legacy_id, level, is_public)
SELECT DISTINCT s.group_id, NULL, false
FROM public.school_students s
WHERE s.group_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM public.school_groups g WHERE g.legacy_id = s.group_id);

-- link students to their group
UPDATE public.school_students s
SET school_group_id = g.id
FROM public.school_groups g
WHERE s.school_group_id IS NULL AND s.group_id IS NOT NULL AND g.legacy_id = s.group_id;

-- link groups to their teacher employee record
UPDATE public.school_groups g
SET teacher_employee_id = e.id
FROM public.school_employees e
WHERE g.teacher_employee_id IS NULL AND g.teacher_id IS NOT NULL AND e.legacy_id = g.teacher_id;

CREATE INDEX IF NOT EXISTS idx_school_students_school_group_id ON public.school_students(school_group_id);
CREATE INDEX IF NOT EXISTS idx_school_groups_teacher_employee_id ON public.school_groups(teacher_employee_id);