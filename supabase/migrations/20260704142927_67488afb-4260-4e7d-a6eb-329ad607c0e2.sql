-- Hide the daily challenge answer key from client roles.
-- The submit_daily_challenge RPC (SECURITY DEFINER) can still read it server-side.
REVOKE SELECT (correct_answer) ON public.daily_challenges FROM anon, authenticated;