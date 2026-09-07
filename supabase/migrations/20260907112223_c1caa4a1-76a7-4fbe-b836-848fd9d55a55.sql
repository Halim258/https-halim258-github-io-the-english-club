CREATE TABLE public.study_time (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  study_date date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  seconds integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, study_date)
);

GRANT SELECT, INSERT, UPDATE ON public.study_time TO authenticated;
GRANT ALL ON public.study_time TO service_role;

ALTER TABLE public.study_time ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own study time"
ON public.study_time FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Staff can read study time"
ON public.study_time FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary') OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Users can insert their own study time"
ON public.study_time FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own study time"
ON public.study_time FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.log_study_seconds(_seconds integer)
RETURNS TABLE(today_seconds integer, week_seconds integer, total_seconds integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_today date := (now() AT TIME ZONE 'utc')::date;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF _seconds IS NULL OR _seconds <= 0 OR _seconds > 3600 THEN
    RAISE EXCEPTION 'Invalid duration';
  END IF;

  INSERT INTO public.study_time (user_id, study_date, seconds)
  VALUES (v_user, v_today, _seconds)
  ON CONFLICT (user_id, study_date) DO UPDATE
    SET seconds = LEAST(public.study_time.seconds + EXCLUDED.seconds, 86400),
        updated_at = now();

  RETURN QUERY
  SELECT
    COALESCE((SELECT st.seconds FROM public.study_time st WHERE st.user_id = v_user AND st.study_date = v_today), 0),
    COALESCE((SELECT sum(st.seconds)::int FROM public.study_time st WHERE st.user_id = v_user AND st.study_date > v_today - 7), 0),
    COALESCE((SELECT sum(st.seconds)::int FROM public.study_time st WHERE st.user_id = v_user), 0);
END;
$$;

REVOKE ALL ON FUNCTION public.log_study_seconds(integer) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_study_seconds(integer) TO authenticated;