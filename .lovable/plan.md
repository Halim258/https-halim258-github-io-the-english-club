# Payments & Receipts System

A place in the admin dashboard where you record who paid, how much, and for which month — using the people who already signed up on the site — and see at a glance who has paid this month and who has not.

## What you will get

### 1. Record a payment (new "Record payment" button on the Receipts tab)
- Pick a person from a searchable list of everyone who signed up on the site (name, email, phone) — or type a name manually for walk-ins.
- Enter: amount paid, total fee, payment date, month it covers, method (cash / InstaPay / Vodafone Cash / bank / other), and an optional note.
- Saves a receipt with an automatic receipt number, and also records the money as income so your finance totals stay correct.
- The remaining balance is calculated for you (total fee minus paid).

### 2. Monthly collection view
- A month selector (defaults to the current month) with three numbers: collected, expected, still missing.
- Two lists: **Paid this month** (name, amount, date, method) and **Not paid yet** — everyone who is an active student or an approved sign-up with no payment recorded for the selected month.
- Each unpaid person gets a WhatsApp reminder button and a "Record payment" shortcut.
- Late flag: anyone unpaid after the 7th of the month is highlighted.

### 3. Receipts list improvements
- Filter by month and by payment method, in addition to the existing search and paid/balance filters.
- Each receipt shows the linked account (so it is tied to a real user, not just a typed name), the month covered, and the method.
- Existing edit / delete / detail panel keep working, and the old 1,355 imported receipts stay untouched.

### 4. Command Center link
- The dashboard summary gets a "Payments this month" figure with collected vs missing, clicking through to the monthly collection view.

## Technical notes

- Migration on `public.school_receipts`: add `user_id uuid` (references the profile of the paying account, nullable for legacy/walk-in rows), `period_month date` (first day of the month covered), `payment_method text`, `note text`, `created_by uuid`, `created_at` default. Add indexes on `user_id` and `period_month`. Keep existing columns and grants; add an admin/secretary insert policy if one is missing.
- Receipt number: next value from `max(receipt_number) + 1`, computed in a small security-definer RPC `record_payment(...)` that inserts the receipt and a matching `school_income` row atomically and returns the new receipt.
- Person picker reuses the existing `get_recent_signups` RPC plus `school_students`, matched on email so one person is one row.
- New component `src/components/admin/PaymentDialog.tsx` (record/edit form) and `src/components/admin/MonthlyCollection.tsx` (month view), both mounted inside the existing Receipts tab of `AdminDashboard.tsx`; `AdminReceipts.tsx` gains the new filters and columns.
- Expected amount per person comes from `school_students.fees` when set; otherwise a configurable default monthly fee stored in the month view (localStorage) so totals are meaningful from day one.
