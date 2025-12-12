-- Create specials table for Happy Hour and other promotions
CREATE TABLE public.specials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  time TEXT NOT NULL,
  days TEXT NOT NULL,
  offers TEXT[] NOT NULL DEFAULT '{}',
  color TEXT NOT NULL DEFAULT 'from-primary to-cyan-400',
  badge TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Beer',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.specials ENABLE ROW LEVEL SECURITY;

-- Anyone can view active specials
CREATE POLICY "Anyone can view active specials"
ON public.specials
FOR SELECT
USING (is_active = true);

-- Admins can manage all specials
CREATE POLICY "Admins can manage specials"
ON public.specials
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()::text
  AND user_roles.role = 'admin'
  AND user_roles.is_active = true
));

-- Insert default specials
INSERT INTO public.specials (title, time, days, offers, color, badge, icon_name, display_order) VALUES
('Happy Hour', '5 PM - 8 PM', 'Mon - Thu', ARRAY['10% off on all food and drinks'], 'from-primary to-cyan-400', 'Most Popular', 'Beer', 1),
('Wine Down Wednesday', '7 PM - 11 PM', 'Wednesday', ARRAY['Free 1st Cocktail/Mocktail for Ladies'], 'from-secondary to-pink-400', 'Ladies Special', 'Wine', 2),
('Weekend Specials', '6 PM - 1 AM', 'Fri - Sat', ARRAY['DJ nights with premium drink packages', 'Group booking discounts', 'Late night menu available'], 'from-purple-500 to-primary', 'Party Time', 'Music', 3);

-- Create trigger for updated_at
CREATE TRIGGER update_specials_updated_at
BEFORE UPDATE ON public.specials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();