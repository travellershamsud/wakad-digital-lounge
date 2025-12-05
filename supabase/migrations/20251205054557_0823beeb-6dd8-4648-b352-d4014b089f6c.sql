-- Create loyalty passes table
CREATE TABLE public.loyalty_passes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  pass_code text NOT NULL UNIQUE,
  discount_percentage integer NOT NULL DEFAULT 5,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loyalty_passes ENABLE ROW LEVEL SECURITY;

-- Anyone can view their own pass by email/code
CREATE POLICY "Anyone can view their pass by code"
ON public.loyalty_passes
FOR SELECT
USING (true);

-- Anyone can sign up for loyalty program
CREATE POLICY "Anyone can sign up"
ON public.loyalty_passes
FOR INSERT
WITH CHECK (true);

-- Admins can manage all passes
CREATE POLICY "Admins can update passes"
ON public.loyalty_passes
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete passes"
ON public.loyalty_passes
FOR DELETE
USING (public.is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_loyalty_passes_updated_at
BEFORE UPDATE ON public.loyalty_passes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();