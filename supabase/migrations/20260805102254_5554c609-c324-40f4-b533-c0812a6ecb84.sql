CREATE OR REPLACE FUNCTION public.notify_students(_title text, _message text, _type text DEFAULT 'tip'::text, _link text DEFAULT NULL::text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_actor uuid := auth.uid();
  v_count integer := 0;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF NOT (public.has_role(v_actor, 'admin'::app_role) OR public.has_role(v_actor, 'secretary'::app_role) OR public.has_role(v_actor, 'teacher'::app_role)) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF _title IS NULL OR length(trim(_title)) = 0 OR length(_title) > 200 THEN
    RAISE EXCEPTION 'Invalid title';
  END IF;
  IF _message IS NULL OR length(trim(_message)) = 0 OR length(_message) > 2000 THEN
    RAISE EXCEPTION 'Invalid message';
  END IF;
  IF _type NOT IN ('achievement','lesson','streak','tip','info') THEN
    _type := 'tip';
  END IF;

  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT ur.user_id, _title, _message, _type, _link
  FROM public.user_roles ur
  WHERE ur.role = 'student'::app_role
    AND NOT EXISTS (
      SELECT 1 FROM public.notifications n
      WHERE n.user_id = ur.user_id
        AND n.title = _title
        AND n.created_at > now() - interval '20 hours'
    );

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$function$;

REVOKE ALL ON FUNCTION public.notify_students(text, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.notify_students(text, text, text, text) TO authenticated;