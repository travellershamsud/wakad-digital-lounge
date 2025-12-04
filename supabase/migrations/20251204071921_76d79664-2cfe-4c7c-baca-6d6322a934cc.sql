-- Create storage bucket for QR codes
INSERT INTO storage.buckets (id, name, public)
VALUES ('qr-codes', 'qr-codes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to QR codes
CREATE POLICY "Public can view QR codes"
ON storage.objects FOR SELECT
USING (bucket_id = 'qr-codes');

-- Allow admins to upload QR codes
CREATE POLICY "Admins can upload QR codes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'qr-codes' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Allow admins to update QR codes
CREATE POLICY "Admins can update QR codes"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'qr-codes' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);

-- Allow admins to delete QR codes
CREATE POLICY "Admins can delete QR codes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'qr-codes' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id::text = auth.uid()::text
    AND role = 'admin'
    AND is_active = true
  )
);