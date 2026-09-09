ALTER TABLE public.school_receipts
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS period_month date,
  ADD COLUMN IF NOT EXISTS payment_method text,
  ADD COLUMN IF NOT EXISTS note text,
  ADD COLUMN IF NOT EXISTS created_by uuid;

CREATE INDEX IF NOT EXISTS school_receipts_user_id_idx ON public.school_receipts(user_id);
CREATE INDEX IF NOT EXISTS school_receipts_period_month_idx ON public.school_receipts(period_month);

DROP POLICY IF EXISTS "Staff can manage school_receipts" ON public.school_receipts;
CREATE POLICY "Staff can manage school_receipts" ON public.school_receipts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'secretary'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'secretary'::app_role));

DROP POLICY IF EXISTS "Staff can manage school_income" ON public.school_income;
CREATE POLICY "Staff can manage school_income" ON public.school_income
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'secretary'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'secretary'::app_role));

CREATE OR REPLACE FUNCTION public.record_payment(
  _user_id uuid,
  _student_name text,
  _phone_number text,
  _fees numeric,
  _paid_fees numeric,
  _payment_date timestamptz,
  _period_month date,
  _payment_method text,
  _note text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_number integer;
  v_id uuid;
  v_fees numeric := coalesce(_fees, 0);
  v_paid numeric := coalesce(_paid_fees, 0);
  v_date timestamptz := coalesce(_payment_date, now());
  v_month date := coalesce(_period_month, date_trunc('month', coalesce(_payment_date, now()))::date);
BEGIN
  IF v_actor IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF NOT (public.has_role(v_actor, 'admin'::app_role) OR public.has_role(v_actor, 'secretary'::app_role)) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF _student_name IS NULL OR length(trim(_student_name)) = 0 OR length(_student_name) > 120 THEN
    RAISE EXCEPTION 'Student name is required';
  END IF;
  IF v_paid <= 0 OR v_paid > 1000000 THEN
    RAISE EXCEPTION 'Invalid paid amount';
  END IF;
  IF v_fees < 0 OR v_fees > 1000000 THEN
    RAISE EXCEPTION 'Invalid fees amount';
  END IF;
  IF v_fees = 0 THEN
    v_fees := v_paid;
  END IF;
  IF _payment_method IS NOT NULL AND _payment_method NOT IN ('cash','instapay','vodafone_cash','bank','other') THEN
    RAISE EXCEPTION 'Invalid payment method';
  END IF;

  SELECT coalesce(max(receipt_number), 0) + 1 INTO v_number FROM public.school_receipts;

  INSERT INTO public.school_receipts (
    receipt_number, student_name, phone_number, fees, paid_fees, remaining_fees,
    reservation_date, user_id, period_month, payment_method, note, created_by
  ) VALUES (
    v_number, trim(_student_name), nullif(trim(coalesce(_phone_number, '')), ''),
    v_fees, v_paid, v_fees - v_paid, v_date, _user_id, v_month,
    coalesce(_payment_method, 'cash'), nullif(trim(coalesce(_note, '')), ''), v_actor
  )
  RETURNING id INTO v_id;

  INSERT INTO public.school_income (amount, date, receipt_number, reason, category)
  VALUES (v_paid, v_date, v_number, 'Payment from ' || trim(_student_name), 'fees');

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.record_payment(uuid, text, text, numeric, numeric, timestamptz, date, text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.record_payment(uuid, text, text, numeric, numeric, timestamptz, date, text, text) TO authenticated;