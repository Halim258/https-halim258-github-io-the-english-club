DROP POLICY IF EXISTS "Anyone can insert results" ON public.placement_test_results;
REVOKE INSERT ON public.placement_test_results FROM anon;