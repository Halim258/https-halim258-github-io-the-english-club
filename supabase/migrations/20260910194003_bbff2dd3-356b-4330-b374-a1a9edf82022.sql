CREATE TABLE public.receipt_issuers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.receipt_issuers TO authenticated;
GRANT ALL ON public.receipt_issuers TO service_role;
ALTER TABLE public.receipt_issuers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can view issuers" ON public.receipt_issuers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'::app_role) OR public.has_role(auth.uid(),'secretary'::app_role) OR public.has_role(auth.uid(),'teacher'::app_role));
CREATE POLICY "Admins and secretaries manage issuers" ON public.receipt_issuers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'::app_role) OR public.has_role(auth.uid(),'secretary'::app_role))
  WITH CHECK (public.has_role(auth.uid(),'admin'::app_role) OR public.has_role(auth.uid(),'secretary'::app_role));
GRANT INSERT, UPDATE, DELETE ON public.receipt_issuers TO authenticated;

INSERT INTO public.receipt_issuers (name) VALUES ('Mohamed Halim'), ('Mohammed Jamal') ON CONFLICT (name) DO NOTHING;

ALTER TABLE public.school_receipts ADD COLUMN IF NOT EXISTS given_by_name text;

CREATE OR REPLACE FUNCTION public.create_receipt(_item_key text, _paid numeric, _receipt_number integer DEFAULT NULL::integer, _student_record_id uuid DEFAULT NULL::uuid, _new_student_name text DEFAULT NULL::text, _new_student_phone text DEFAULT NULL::text, _price numeric DEFAULT NULL::numeric, _payment_method text DEFAULT 'cash'::text, _payment_date timestamp with time zone DEFAULT NULL::timestamp with time zone, _period_month date DEFAULT NULL::date, _note text DEFAULT NULL::text, _settles_receipt_id uuid DEFAULT NULL::uuid, _status text DEFAULT 'issued'::text, _given_by text DEFAULT NULL::text)
 RETURNS TABLE(id uuid, receipt_number integer, public_token uuid, student_record_id uuid)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  v_given text := nullif(trim(coalesce(_given_by,'')), '');
BEGIN
  IF v_actor IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF NOT (public.has_role(v_actor,'admin'::app_role) OR public.has_role(v_actor,'secretary'::app_role)) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF _status NOT IN ('issued','faulty') THEN RAISE EXCEPTION 'Invalid status'; END IF;
  IF _payment_method IS NOT NULL AND _payment_method NOT IN ('cash','instapay','vodafone_cash','bank','other') THEN
    RAISE EXCEPTION 'Invalid payment method';
  END IF;

  IF v_given IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.receipt_issuers ri WHERE ri.name = v_given) THEN
    INSERT INTO public.receipt_issuers (name) VALUES (v_given) ON CONFLICT (name) DO NOTHING;
  END IF;

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

  -- receipt number first: a new member's student number equals it
  v_number := coalesce(_receipt_number, public.next_receipt_number());
  IF v_number < 1 THEN RAISE EXCEPTION 'Invalid receipt number'; END IF;
  IF EXISTS (SELECT 1 FROM public.school_receipts r WHERE r.receipt_number = v_number) THEN
    RAISE EXCEPTION 'Receipt number % is already used', v_number;
  END IF;

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
      v_number, now()
    )
    RETURNING * INTO v_student;
  END IF;

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

  INSERT INTO public.school_receipts (
    receipt_number, student_name, phone_number, fees, paid_fees, remaining_fees,
    reservation_date, user_id, student_record_id, period_month, payment_method, note,
    created_by, item_key, item_label, status, settles_receipt_id, given_by_name
  ) VALUES (
    v_number,
    coalesce(v_student.name, trim(coalesce(_new_student_name, 'Void receipt'))),
    coalesce(v_student.phone_number, nullif(trim(coalesce(_new_student_phone,'')), '')),
    coalesce(v_price, 0), v_paid, greatest(coalesce(v_price,0) - v_paid, 0),
    v_date, v_student.user_id, v_student.id, v_month, coalesce(_payment_method,'cash'),
    nullif(trim(coalesce(_note,'')), ''), v_actor, _item_key, v_label, _status, _settles_receipt_id, v_given
  )
  RETURNING school_receipts.id, school_receipts.public_token INTO v_id, v_token;

  IF _status = 'issued' AND v_paid > 0 THEN
    INSERT INTO public.school_income (amount, date, receipt_number, reason, category)
    VALUES (v_paid, v_date, v_number, v_label || ' — ' || coalesce(v_student.name, ''), 'fees');
  END IF;

  RETURN QUERY SELECT v_id, v_number, v_token, v_student.id;
END;
$function$;

DROP FUNCTION IF EXISTS public.get_receipt_by_token(uuid);
CREATE FUNCTION public.get_receipt_by_token(_token uuid)
 RETURNS TABLE(receipt_number integer, student_name text, phone_number text, item_label text, fees numeric, paid_fees numeric, remaining_fees numeric, status text, payment_method text, note text, period_month date, issued_at timestamp with time zone, given_by_name text)
 LANGUAGE sql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT r.receipt_number, r.student_name, r.phone_number, r.item_label, r.fees, r.paid_fees,
         r.remaining_fees, r.status, r.payment_method, r.note, r.period_month, r.reservation_date, r.given_by_name
  FROM public.school_receipts r
  WHERE r.public_token = _token
  LIMIT 1
$function$;