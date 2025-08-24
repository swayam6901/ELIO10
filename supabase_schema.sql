-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT NOT NULL,
  query TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  clicks INTEGER DEFAULT 1,
  user_agent TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS analytics_ip_address_idx ON analytics(ip_address);
CREATE INDEX IF NOT EXISTS analytics_query_idx ON analytics(query);
CREATE INDEX IF NOT EXISTS analytics_level_idx ON analytics(level);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON analytics(created_at);

-- Enable Row Level Security
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to access all rows
CREATE POLICY "Service role can do anything" ON analytics
  FOR ALL
  TO service_role
  USING (true);