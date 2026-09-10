-- 1. Columns
ALTER TABLE public.school_receipts
  ADD COLUMN IF NOT EXISTS item_key text,
  ADD COLUMN IF NOT EXISTS item_label text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'issued',
  ADD COLUMN IF NOT EXISTS settles_receipt_id uuid REFERENCES public.school_receipts(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS public_token uuid NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS student_record_id uuid REFERENCES public.school_students(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.school_receipts
  DROP CONSTRAINT IF EXISTS school_receipts_status_check;
ALTER TABLE public.school_receipts
  ADD CONSTRAINT school_receipts_status_check CHECK (status IN ('issued','faulty'));

CREATE UNIQUE INDEX IF NOT EXISTS school_receipts_receipt_number_key
  ON public.school_receipts (receipt_number) WHERE receipt_number IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS school_receipts_public_token_key
  ON public.school_receipts (public_token);
CREATE INDEX IF NOT EXISTS school_receipts_student_record_idx
  ON public.school_receipts (student_record_id);

DROP TRIGGER IF EXISTS touch_school_receipts_updated_at ON public.school_receipts;
CREATE TRIGGER touch_school_receipts_updated_at
  BEFORE UPDATE ON public.school_receipts
  FOR EACH ROW EXECUTE FUNCTION public.update_curriculum_progress_updated_at();

-- 2. Next receipt number (starts at 2501)
CREATE OR REPLACE FUNCTION public.next_receipt_number()
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT GREATEST(2500, COALESCE(MAX(receipt_number), 0)) + 1 FROM public.school_receipts;
$$;

-- 3. Create receipt (with optional new student + optional settlement of an old receipt)
CREATE OR REPLACE FUNCTION public.create_receipt(
  _item_key text,
  _paid numeric,
  _receipt_number integer DEFAULT NULL,
  _student_record_id uuid DEFAULT NULL,
  _new_student_name text DEFAULT NULL,
  _new_student_phone text DEFAULT NULL,
  _price numeric DEFAULT NULL,
  _payment_method text DEFAULT 'cash',
  _payment_date timestamptz DEFAULT NULL,
  _period_month date DEFAULT NULL,
  _note text DEFAULT NULL,
  _settles_receipt_id uuid DEFAULT NULL,
  _status text DEFAULT 'issued'
)
RETURNS TABLE(id uuid, receipt_number integer, public_token uuid, student_record_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_student public.school_students;
  v_number integer;
  v_price numeric;
  v_paid numeric := coalesce(_paid, 0);
  v_label text;
  v_date timestamptz := coalesce(_payment_date, now());
  v_month date := coalesce(_period_month, date_trunc('month', coalesce(_payment_date, now()))::date);
  v_id uuid;
  v_token uuid;
  v_digits text;
  v_user uuid;
  v_old public.school_receipts;
BEGIN
  IF v_actor IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF NOT (public.has_role(v_actor,'admin'::app_role) OR public.has_role(v_actor,'secretary'::app_role)) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF _status NOT IN ('issued','faulty') THEN RAISE EXCEPTION 'Invalid status'; END IF;
  IF _payment_method IS NOT NULL AND _payment_method NOT IN ('cash','instapay','vodafone_cash','bank','other') THEN
    RAISE EXCEPTION 'Invalid payment method';
  END IF;

  -- fixed / free prices
  CASE _item_key
    WHEN 'membership_beginner'     THEN v_price := 500;  v_label := 'Membership: Beginner';
    WHEN 'membership_conversation' THEN v_price := 500;  v_label := 'Membership: Conversation';
    WHEN 'membership_advanced'     THEN v_price := 500;  v_label := 'Membership: Advanced';
    WHEN 'private'                 THEN v_price := coalesce(_price, 1500); v_label := 'Private';
    WHEN 'space'                   THEN v_price := coalesce(_price, 0);    v_label := 'Space';
    WHEN 'remaining'               THEN v_label := 'Remaining balance';
    ELSE RAISE EXCEPTION 'Invalid purchase item';
  END CASE;

  IF _status = 'faulty' THEN
    v_paid := 0;
    v_price := coalesce(v_price, 0);
  END IF;

  -- student
  IF _student_record_id IS NOT NULL THEN
    SELECT * INTO v_student FROM public.school_students WHERE id = _student_record_id;
    IF v_student.id IS NULL THEN RAISE EXCEPTION 'Student not found'; END IF;
  ELSIF _status <> 'faulty' THEN
    IF _new_student_name IS NULL OR length(trim(_new_student_name)) = 0 THEN
      RAISE EXCEPTION 'Student name is required';
    END IF;
    IF _new_student_phone IS NULL OR length(regexp_replace(_new_student_phone, '\D', '', 'g')) < 7 THEN
      RAISE EXCEPTION 'A valid phone number is required for a new student';
    END IF;
    v_digits := right(regexp_replace(_new_student_phone, '\D', '', 'g'), 10);
    SELECT p.id INTO v_user FROM public.profiles p
      WHERE p.phone IS NOT NULL AND right(regexp_replace(p.phone, '\D', '', 'g'), 10) = v_digits
      LIMIT 1;
    INSERT INTO public.school_students (name, phone_number, whatsapp, status, user_id, student_number, reservation_date)
    VALUES (
      trim(_new_student_name), trim(_new_student_phone), trim(_new_student_phone), 'active', v_user,
      (SELECT coalesce(max(student_number), 0) + 1 FROM public.school_students), now()
    )
    RETURNING * INTO v_student;
  END IF;

  -- settlement of a previous receipt
  IF _item_key = 'remaining' THEN
    IF _settles_receipt_id IS NULL THEN RAISE EXCEPTION 'Choose the unpaid receipt to settle'; END IF;
    SELECT * INTO v_old FROM public.school_receipts WHERE id = _settles_receipt_id FOR UPDATE;
    IF v_old.id IS NULL THEN RAISE EXCEPTION 'Previous receipt not found'; END IF;
    IF v_paid <= 0 THEN v_paid := greatest(coalesce(v_old.remaining_fees, 0), 0); END IF;
    v_price := v_paid;
    UPDATE public.school_receipts
      SET paid_fees = coalesce(paid_fees,0) + v_paid,
          remaining_fees = greatest(coalesce(fees,0) - (coalesce(paid_fees,0) + v_paid), 0)
      WHERE id = _settles_receipt_id;
  END IF;

  IF _status <> 'faulty' AND v_paid <= 0 THEN RAISE EXCEPTION 'Amount paid must be greater than zero'; END IF;
  IF v_paid > coalesce(v_price, v_paid) THEN v_price := v_paid; END IF;

  -- number (explicit lets the admin skip numbers)
  v_number := coalesce(_receipt_number, public.next_receipt_number());
  IF v_number < 1 THEN RAISE EXCEPTION 'Invalid receipt number'; END IF;
  IF EXISTS (SELECT 1 FROM public.school_receipts r WHERE r.receipt_number = v_number) THEN
    RAISE EXCEPTION 'Receipt number % is already used', v_number;
  END IF;

  INSERT INTO public.school_receipts (
    receipt_number, student_name, phone_number, fees, paid_fees, remaining_fees,
    reservation_date, user_id, student_record_id, period_month, payment_method, note,
    created_by, item_key, item_label, status, settles_receipt_id
  ) VALUES (
    v_number,
    coalesce(v_student.name, trim(coalesce(_new_student_name, 'Void receipt'))),
    coalesce(v_student.phone_number, nullif(trim(coalesce(_new_student_phone,'')), '')),
    coalesce(v_price, 0), v_paid, greatest(coalesce(v_price,0) - v_paid, 0),
    v_date, v_student.user_id, v_student.id, v_month, coalesce(_payment_method,'cash'),
    nullif(trim(coalesce(_note,'')), ''), v_actor, _item_key, v_label, _status, _settles_receipt_id
  )
  RETURNING school_receipts.id, school_receipts.public_token INTO v_id, v_token;

  IF _status = 'issued' AND v_paid > 0 THEN
    INSERT INTO public.school_income (amount, date, receipt_number, reason, category)
    VALUES (v_paid, v_date, v_number, v_label || ' — ' || coalesce(v_student.name, ''), 'fees');
  END IF;

  RETURN QUERY SELECT v_id, v_number, v_token, v_student.id;
END;
$$;

-- 4. Public single-receipt view by share token
CREATE OR REPLACE FUNCTION public.get_receipt_by_token(_token uuid)
RETURNS TABLE(
  receipt_number integer, student_name text, phone_number text, item_label text,
  fees numeric, paid_fees numeric, remaining_fees numeric, status text,
  payment_method text, note text, period_month date, issued_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT r.receipt_number, r.student_name, r.phone_number, r.item_label,
         r.fees, r.paid_fees, r.remaining_fees, r.status,
         r.payment_method, r.note, r.period_month, r.reservation_date
  FROM public.school_receipts r
  WHERE r.public_token = _token
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_receipt_by_token(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.next_receipt_number() TO authenticated;

-- 5. Sign-up: also match a student record by phone number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_name text;
  v_email text;
  v_avatar text;
  v_phone text;
  v_digits text;
BEGIN
  v_email := NEW.email;
  v_name := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data ->> 'full_name'), ''),
    NULLIF(trim(NEW.raw_user_meta_data ->> 'name'), ''),
    initcap(replace(split_part(v_email, '@', 1), '.', ' ')),
    'New user'
  );
  v_avatar := COALESCE(
    NULLIF(NEW.raw_user_meta_data ->> 'avatar_url', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'picture', '')
  );
  v_phone := NULLIF(trim(NEW.raw_user_meta_data ->> 'phone'), '');

  INSERT INTO public.profiles (id, full_name, avatar_url, phone)
  VALUES (NEW.id, v_name, v_avatar, v_phone);

  IF v_email IS NOT NULL THEN
    UPDATE public.school_students
      SET user_id = NEW.id
      WHERE user_id IS NULL
        AND email IS NOT NULL
        AND lower(email) = lower(v_email);
  END IF;

  IF v_phone IS NOT NULL THEN
    v_digits := right(regexp_replace(v_phone, '\D', '', 'g'), 10);
    IF length(v_digits) >= 7 THEN
      UPDATE public.school_students
        SET user_id = NEW.id
        WHERE user_id IS NULL
          AND (
            right(regexp_replace(coalesce(phone_number,''), '\D', '', 'g'), 10) = v_digits
            OR right(regexp_replace(coalesce(whatsapp,''), '\D', '', 'g'), 10) = v_digits
          );
      UPDATE public.school_receipts
        SET user_id = NEW.id
        WHERE user_id IS NULL
          AND right(regexp_replace(coalesce(phone_number,''), '\D', '', 'g'), 10) = v_digits;
    END IF;
  END IF;

  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT
    ur.user_id,
    'New sign-up: ' || v_name,
    coalesce(v_email, '')
      || CASE WHEN v_phone IS NOT NULL THEN ' (' || v_phone || ')' ELSE '' END
      || ' just created an account. Confirm payment and enroll them as a student.',
    'info',
    '/admin?tab=new-signups&enroll=' || NEW.id::text
  FROM public.user_roles ur
  WHERE ur.role IN ('admin'::app_role, 'secretary'::app_role);

  RETURN NEW;
END;
$function$;