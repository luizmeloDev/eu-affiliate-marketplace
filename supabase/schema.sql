-- EU Affiliate Marketplace - Supabase Schema

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'EUR',
  category VARCHAR(100) DEFAULT 'Geral',
  image_url TEXT,
  original_url TEXT NOT NULL,
  affiliate_url TEXT,
  store VARCHAR(50) DEFAULT 'generic',
  store_domain VARCHAR(100),
  product_id VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_store ON products(store);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Allow insert with service role" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update with service role" ON products
  FOR UPDATE USING (true);

CREATE TABLE IF NOT EXISTS clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_product ON clicks(product_id);
CREATE INDEX IF NOT EXISTS idx_clicks_created ON clicks(created_at DESC);

CREATE OR REPLACE VIEW product_stats AS
SELECT 
  p.id,
  p.title,
  p.store,
  p.category,
  p.price,
  p.currency,
  p.clicks,
  COUNT(c.id) as total_clicks_detailed,
  MAX(c.created_at) as last_click
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
WHERE p.status = 'active'
GROUP BY p.id, p.title, p.store, p.category, p.price, p.currency, p.clicks
ORDER BY p.clicks DESC;
