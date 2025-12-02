-- 1. Fix: Remove overly permissive reservations policy (exposes customer PII)
DROP POLICY IF EXISTS "Users can view their own reservations" ON reservations;

-- 2. Fix: Remove password column from user_roles (passwords should only be in Supabase Auth)
ALTER TABLE user_roles DROP COLUMN IF EXISTS password;

-- 3. Fix: Enable RLS on unprotected tables
ALTER TABLE beverages ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items_price_backup ENABLE ROW LEVEL SECURITY;

-- 4. Add public read policies for menu data (needed for app functionality)
CREATE POLICY "Anyone can view beverages" ON beverages FOR SELECT USING (true);
CREATE POLICY "Anyone can view menu items" ON menu_items FOR SELECT USING (true);

-- 5. Add admin-only write policies for menu tables
CREATE POLICY "Admins can manage beverages" ON beverages
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id::text = auth.uid()::text
    AND role = 'admin' AND is_active = true
  )
);

CREATE POLICY "Admins can manage menu items" ON menu_items
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id::text = auth.uid()::text
    AND role = 'admin' AND is_active = true
  )
);

CREATE POLICY "Admins can manage price backup" ON menu_items_price_backup
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id::text = auth.uid()::text
    AND role = 'admin' AND is_active = true
  )
);

-- 6. Fix the security definer view by recreating as regular view with explicit security invoker
DROP VIEW IF EXISTS menu_items_with_ratings;
CREATE VIEW menu_items_with_ratings WITH (security_invoker = true) AS
SELECT 
    mi.id,
    mi.name,
    mi.description,
    mi.price,
    mi.category,
    mi.image_url,
    mi.available,
    COALESCE(round(avg(r.rating), 1), 0::numeric) AS avg_rating,
    count(r.id) AS review_count,
    count(CASE WHEN r.rating >= 4 THEN 1 ELSE NULL END) AS positive_reviews,
    CASE WHEN count(r.id) >= 5 AND avg(r.rating) >= 4.5 THEN true ELSE false END AS is_most_recommended
FROM menu_items mi
LEFT JOIN reviews r ON mi.id = r.menu_item_id AND r.is_approved = true
GROUP BY mi.id;