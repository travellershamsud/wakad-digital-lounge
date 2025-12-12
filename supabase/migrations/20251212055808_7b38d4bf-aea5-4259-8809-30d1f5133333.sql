-- Create a secure function to look up loyalty passes by email or pass_code
-- This function only returns the pass if the provided identifier matches
CREATE OR REPLACE FUNCTION public.lookup_loyalty_pass(identifier text)
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  phone text,
  pass_code text,
  discount_percentage integer,
  is_active boolean,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    lp.id,
    lp.name,
    lp.email,
    lp.phone,
    lp.pass_code,
    lp.discount_percentage,
    lp.is_active,
    lp.created_at
  FROM loyalty_passes lp
  WHERE lp.email = identifier OR lp.pass_code = identifier
  LIMIT 1;
END;
$$;

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view their pass by code" ON loyalty_passes;

-- Create a new policy that only allows admins to SELECT all passes
-- Public users must use the lookup_loyalty_pass function
CREATE POLICY "Admins can view all passes"
ON loyalty_passes
FOR SELECT
USING (is_admin(auth.uid()));