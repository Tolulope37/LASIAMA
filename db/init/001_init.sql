
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tenants (single-tenant for now, but keep the table for future)
CREATE TABLE IF NOT EXISTS tenants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO tenants (name) VALUES ('LASIAMA') ON CONFLICT DO NOTHING;

-- Users & roles
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  tenant_id INT REFERENCES tenants(id) DEFAULT 1,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  password_hash TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  tenant_id INT REFERENCES tenants(id) DEFAULT 1,
  name TEXT NOT NULL,
  permissions JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Assets
CREATE TABLE IF NOT EXISTS assets (
  id SERIAL PRIMARY KEY,
  tenant_id INT REFERENCES tenants(id) DEFAULT 1,
  code TEXT,
  name TEXT NOT NULL,
  type TEXT,
  subtype TEXT,
  use_purpose TEXT,
  status TEXT DEFAULT 'active',
  lga TEXT,
  ward TEXT,
  address TEXT,
  area_sqm NUMERIC,
  year_built INT,
  condition TEXT,
  owner_entity TEXT,
  risk_level TEXT,
  notes TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  point GEOMETRY(Point, 4326),
  boundary GEOMETRY(Polygon, 4326),
  created_by INT REFERENCES users(id),
  updated_by INT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Populate geometry point from lat/lng when available
CREATE OR REPLACE FUNCTION set_point_geom() RETURNS trigger AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.point := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_assets_set_point ON assets;
CREATE TRIGGER trg_assets_set_point BEFORE INSERT OR UPDATE ON assets
FOR EACH ROW EXECUTE FUNCTION set_point_geom();

CREATE INDEX IF NOT EXISTS idx_assets_point_gix ON assets USING GIST (point);
CREATE INDEX IF NOT EXISTS idx_assets_boundary_gix ON assets USING GIST (boundary);

-- Media
CREATE TABLE IF NOT EXISTS asset_media (
  id SERIAL PRIMARY KEY,
  asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
  kind TEXT,
  url TEXT,
  filename TEXT,
  size BIGINT,
  mime TEXT,
  uploaded_by INT REFERENCES users(id),
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Legal docs
CREATE TABLE IF NOT EXISTS asset_legal (
  id SERIAL PRIMARY KEY,
  asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
  doc_type TEXT,
  ref_no TEXT,
  issue_date DATE,
  expiry_date DATE,
  status TEXT,
  url TEXT
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  tenant_id INT REFERENCES tenants(id) DEFAULT 1,
  asset_id INT REFERENCES assets(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT,
  category TEXT,
  assigned_to INT REFERENCES users(id),
  due_date DATE,
  status TEXT DEFAULT 'open',
  created_by INT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Inspections
CREATE TABLE IF NOT EXISTS inspections (
  id SERIAL PRIMARY KEY,
  asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
  inspector_id INT REFERENCES users(id),
  scheduled_for DATE,
  completed_at TIMESTAMPTZ,
  outcome TEXT,
  notes TEXT
);

-- Audit
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  tenant_id INT REFERENCES tenants(id) DEFAULT 1,
  actor_id INT REFERENCES users(id),
  entity TEXT,
  entity_id INT,
  action TEXT,
  old_values JSONB,
  new_values JSONB,
  ip INET,
  created_at TIMESTAMPTZ DEFAULT now()
);
