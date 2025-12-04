-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Create a simple policy that allows users to view their own role (no recursion)
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
USING ((auth.uid())::text = user_id::text);

-- Create policy for admins using the SECURITY DEFINER function (avoids recursion)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin(auth.uid()));