
CREATE OR REPLACE FUNCTION public.notify_admins(_title text, _message text, _type text DEFAULT 'info', _link text DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_count integer := 0;
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF _title IS NULL OR length(trim(_title)) = 0 OR length(_title) > 200 THEN
    RAISE EXCEPTION 'Invalid title';
  END IF;
  IF _message IS NULL OR length(trim(_message)) = 0 OR length(_message) > 1000 THEN
    RAISE EXCEPTION 'Invalid message';
  END IF;
  IF _type NOT IN ('achievement','lesson','streak','tip','info') THEN
    _type := 'info';
  END IF;

  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT ur.user_id, _title, _message, _type, _link
  FROM public.user_roles ur
  WHERE ur.role IN ('admin'::app_role, 'secretary'::app_role)
    AND ur.user_id <> v_actor;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.notify_admins(text, text, text, text) TO authenticated;
