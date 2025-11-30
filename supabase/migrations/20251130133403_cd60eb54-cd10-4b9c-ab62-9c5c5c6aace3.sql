-- Create site_content table for managing website content
CREATE TABLE IF NOT EXISTS public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL UNIQUE,
  title text,
  subtitle text,
  content text,
  image_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read content (for public display)
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can insert content
CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Only admins can update content
CREATE POLICY "Admins can update site content"
ON public.site_content
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Only admins can delete content
CREATE POLICY "Admins can delete site content"
ON public.site_content
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Create trigger for updating updated_at
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for the website
INSERT INTO public.site_content (section_key, title, subtitle, content, image_url, metadata) VALUES
('hero', 'Experience the Ultimate Nightlife', 'Live Music • Delicious Food • Vibrant Atmosphere', 'Join us for an unforgettable evening of great food, drinks, and entertainment', null, '{"cta_text": "Reserve Your Table", "cta_link": "#reservations"}'),
('about', 'About LIVE', null, 'LIVE is Pune''s premier destination for an extraordinary dining and entertainment experience. We blend exceptional cuisine, craft cocktails, and live performances to create unforgettable nights. Our venue combines elegant ambiance with a vibrant energy, making every visit special.', null, '{"features": ["Live Music Every Weekend", "Award-Winning Chefs", "Signature Cocktails", "Private Event Spaces"]}'),
('contact_info', 'Get in Touch', 'Visit us or reach out', null, null, '{"address": "Wakad-Hinjewadi Road, Pune, Maharashtra 411057, India", "phone": "+91 1234567890", "email": "info@liverestaurant.com", "hours": "Mon-Sun: 6:00 PM - 2:00 AM"}')
ON CONFLICT (section_key) DO NOTHING;