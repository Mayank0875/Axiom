-- Dummy seed data for local development
-- Password for seeded users: secret123

INSERT INTO universities (name, slug, description, website_url)
VALUES (
  'Axiom University',
  'axiom-university',
  'Primary development university tenant',
  'https://axiom.example.edu'
)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website_url = EXCLUDED.website_url;

INSERT INTO users (university_id, full_name, email, password_hash, is_verified)
SELECT
  u.id,
  'System Admin',
  'admin@axiom.edu',
  '$2b$10$wnwlKMnzjte3C4u1h/Iw..aX3gllQICLJSS90fIbZLQlHrxMpakPO',
  TRUE
FROM universities u
WHERE u.slug = 'axiom-university'
ON CONFLICT (email, university_id) DO NOTHING;

INSERT INTO users (university_id, full_name, email, password_hash, is_verified)
SELECT
  u.id,
  'Faculty Demo',
  'faculty@axiom.edu',
  '$2b$10$wnwlKMnzjte3C4u1h/Iw..aX3gllQICLJSS90fIbZLQlHrxMpakPO',
  TRUE
FROM universities u
WHERE u.slug = 'axiom-university'
ON CONFLICT (email, university_id) DO NOTHING;

INSERT INTO users (university_id, full_name, email, password_hash, is_verified)
SELECT
  u.id,
  'Student Demo',
  'student@axiom.edu',
  '$2b$10$wnwlKMnzjte3C4u1h/Iw..aX3gllQICLJSS90fIbZLQlHrxMpakPO',
  TRUE
FROM universities u
WHERE u.slug = 'axiom-university'
ON CONFLICT (email, university_id) DO NOTHING;

-- Assign admin role
INSERT INTO user_roles (user_id, role_id)
SELECT usr.id, r.id
FROM users usr
JOIN universities u ON u.id = usr.university_id
JOIN roles r ON r.name = 'admin'
WHERE usr.email = 'admin@axiom.edu' AND u.slug = 'axiom-university'
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Assign faculty role
INSERT INTO user_roles (user_id, role_id)
SELECT usr.id, r.id
FROM users usr
JOIN universities u ON u.id = usr.university_id
JOIN roles r ON r.name = 'faculty'
WHERE usr.email = 'faculty@axiom.edu' AND u.slug = 'axiom-university'
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Assign student role
INSERT INTO user_roles (user_id, role_id)
SELECT usr.id, r.id
FROM users usr
JOIN universities u ON u.id = usr.university_id
JOIN roles r ON r.name = 'student'
WHERE usr.email = 'student@axiom.edu' AND u.slug = 'axiom-university'
ON CONFLICT (user_id, role_id) DO NOTHING;

