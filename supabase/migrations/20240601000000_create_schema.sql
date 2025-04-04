-- Create tables for the LocalGuia application

-- Users table to store user profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  photo_url TEXT,
  location TEXT,
  bio TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('tourist', 'guide'))
);

-- Guides table to store guide-specific information
CREATE TABLE IF NOT EXISTS guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  photo_url TEXT,
  location TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  specialties TEXT[] NOT NULL,
  cadastur_number TEXT,
  social_links JSONB,
  rating NUMERIC(3,2),
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences table to store tour experiences offered by guides
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guide_id UUID NOT NULL REFERENCES guides(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  duration TEXT NOT NULL,
  max_people INTEGER NOT NULL,
  difficulty TEXT,
  includes TEXT[],
  images TEXT[],
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table to store tour categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL UNIQUE,
  image_url TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table to store locations/regions
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  region TEXT,
  state TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table to store tour bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  experience_id UUID NOT NULL REFERENCES experiences(id),
  guide_id UUID NOT NULL REFERENCES guides(id),
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  participants INTEGER NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table to store tour reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  guide_id UUID NOT NULL REFERENCES guides(id),
  experience_id UUID NOT NULL REFERENCES experiences(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table to store user favorites
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  guide_id UUID REFERENCES guides(id),
  experience_id UUID REFERENCES experiences(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_favorite_target CHECK (
    (guide_id IS NOT NULL AND experience_id IS NULL) OR
    (guide_id IS NULL AND experience_id IS NOT NULL)
  ),
  UNIQUE(user_id, guide_id, experience_id)
);

-- Enable row-level security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read all users
CREATE POLICY "Users can read all users"
  ON users FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Guides can be read by anyone
CREATE POLICY "Guides can be read by anyone"
  ON guides FOR SELECT
  USING (true);

-- Guides can update their own profile
CREATE POLICY "Guides can update their own profile"
  ON guides FOR UPDATE
  USING (auth.uid() = user_id);

-- Experiences can be read by anyone
CREATE POLICY "Experiences can be read by anyone"
  ON experiences FOR SELECT
  USING (true);

-- Guides can create and update their own experiences
CREATE POLICY "Guides can create their own experiences"
  ON experiences FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM guides WHERE id = guide_id));

CREATE POLICY "Guides can update their own experiences"
  ON experiences FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM guides WHERE id = guide_id));

-- Bookings can be read by the tourist who made them or the guide who received them
CREATE POLICY "Users can read their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM guides WHERE id = guide_id));

-- Users can create bookings
CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM guides WHERE id = guide_id));

-- Reviews can be read by anyone
CREATE POLICY "Reviews can be read by anyone"
  ON reviews FOR SELECT
  USING (true);

-- Users can create reviews for bookings they made
CREATE POLICY "Users can create reviews for their bookings"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can manage their own favorites
CREATE POLICY "Users can read their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE favorites;

-- Insert initial categories
INSERT INTO categories (title, image_url, count) VALUES
('Ecoturismo', 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&q=80', 42),
('Gastronomia', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80', 35),
('Aventura', 'https://images.unsplash.com/photo-1496947850313-7743325fa58c?w=500&q=80', 28),
('Cultural', 'https://images.unsplash.com/photo-1582034986517-30d163aa1da9?w=500&q=80', 31)
ON CONFLICT (title) DO NOTHING;

-- Insert initial locations
INSERT INTO locations (name, region, state, image_url) VALUES
('Serra da Mantiqueira', 'Sudeste', 'SP/MG', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80'),
('Campos do Jordão', 'Serra da Mantiqueira', 'SP', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80'),
('São Bento do Sapucaí', 'Serra da Mantiqueira', 'SP', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80'),
('Ubatuba', 'Litoral Norte', 'SP', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=500&q=80'),
('Ilhabela', 'Litoral Norte', 'SP', 'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=500&q=80'),
('Monte Verde', 'Serra da Mantiqueira', 'MG', 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&q=80'),
('Gonçalves', 'Serra da Mantiqueira', 'MG', 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&q=80')
ON CONFLICT (name) DO NOTHING;