
-- School Management Tables

-- Students table (from Access DB)
CREATE TABLE public.school_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_number integer,
  student_id_legacy integer,
  name text NOT NULL,
  phone_number text,
  reference_number text,
  email text,
  whatsapp text,
  address text,
  birth_date timestamptz,
  reservation_date timestamptz,
  placement_test_result text,
  access_method text,
  preferred_time text,
  preferred_activity text,
  other_interests text,
  group_id integer,
  paid_fees numeric DEFAULT 0,
  fees numeric DEFAULT 0,
  remaining_fees numeric DEFAULT 0,
  membership text,
  email_subscription boolean DEFAULT false,
  whatsapp_subscription boolean DEFAULT false,
  notes text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Employees table
CREATE TABLE public.school_employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  name text NOT NULL,
  phone_number text,
  phone_number_2 text,
  position text NOT NULL DEFAULT 'staff',
  created_at timestamptz DEFAULT now()
);

-- Groups table
CREATE TABLE public.school_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  teacher_id integer,
  start_date timestamptz,
  days text,
  start_time text,
  end_time text,
  group_time text,
  level text,
  created_at timestamptz DEFAULT now()
);

-- Sessions table
CREATE TABLE public.school_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  group_id integer,
  teacher_id integer,
  time_from integer,
  time_to integer,
  session_date timestamptz,
  level text,
  session_name text,
  hours integer DEFAULT 0,
  teacher_lateness integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Income table
CREATE TABLE public.school_income (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  amount numeric NOT NULL DEFAULT 0,
  date timestamptz,
  receipt_number integer,
  reason text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Outcome/Expenses table
CREATE TABLE public.school_outcome (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  amount numeric NOT NULL DEFAULT 0,
  date timestamptz,
  reason text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE public.school_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  product text NOT NULL,
  price numeric DEFAULT 0,
  price_for_members numeric,
  per text,
  created_at timestamptz DEFAULT now()
);

-- Receipts table
CREATE TABLE public.school_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_number integer,
  receipt_number integer,
  student_id_legacy integer,
  student_name text,
  phone_number text,
  item_id integer,
  paid_fees numeric DEFAULT 0,
  fees numeric DEFAULT 0,
  remaining_fees numeric DEFAULT 0,
  given_by integer,
  reservation_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Newcomers table
CREATE TABLE public.school_newcomers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id integer,
  client_name text NOT NULL,
  client_number text,
  access_method text,
  the_date timestamptz,
  reserved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.school_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_income ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_outcome ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_newcomers ENABLE ROW LEVEL SECURITY;

-- Admin-only access policies for all school management tables
CREATE POLICY "Admins can manage school_students" ON public.school_students FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_employees" ON public.school_employees FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_groups" ON public.school_groups FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_sessions" ON public.school_sessions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_income" ON public.school_income FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_outcome" ON public.school_outcome FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_products" ON public.school_products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_receipts" ON public.school_receipts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school_newcomers" ON public.school_newcomers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
