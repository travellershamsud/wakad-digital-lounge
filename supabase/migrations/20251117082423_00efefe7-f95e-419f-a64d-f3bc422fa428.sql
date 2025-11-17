-- Add RLS policies for admins to manage reservations
CREATE POLICY "Admins can view all reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()::text
    AND user_roles.role = 'admin'
    AND user_roles.is_active = true
  )
);

CREATE POLICY "Admins can update reservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()::text
    AND user_roles.role = 'admin'
    AND user_roles.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()::text
    AND user_roles.role = 'admin'
    AND user_roles.is_active = true
  )
);

CREATE POLICY "Admins can delete reservations"
ON public.reservations
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()::text
    AND user_roles.role = 'admin'
    AND user_roles.is_active = true
  )
);