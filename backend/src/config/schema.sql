-- Axiom LMS PostgreSQL schema (refactored from your ERD)
-- This schema keeps University LMS requirements and adds communication + analytics.

CREATE TYPE role_enum AS ENUM ('admin', 'faculty', 'student');
CREATE TYPE visibility_enum AS ENUM ('private', 'public');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped');
CREATE TYPE submission_status AS ENUM ('submitted', 'late', 'graded');
CREATE TYPE quiz_attempt_status AS ENUM ('in_progress', 'submitted', 'evaluated');
CREATE TYPE assignment_type_enum AS ENUM ('file', 'mcq', 'coding');

CREATE TABLE universities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  address TEXT,
  owner_id BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  password_hash TEXT NOT NULL,
  auth_provider VARCHAR(50) DEFAULT 'local',
  provider_id VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(email, university_id)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name role_enum UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES ('admin'), ('faculty'), ('student')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  UNIQUE(user_id, role_id)
);

CREATE TABLE student_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  roll_number VARCHAR(50),
  year INT,
  department VARCHAR(100),
  cgpa NUMERIC(3,2)
);

CREATE TABLE faculty_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  designation VARCHAR(100),
  specialization TEXT,
  department VARCHAR(100),
  experience_years INT
);

CREATE TABLE admin_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  designation VARCHAR(100)
);

CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  course_code VARCHAR(50) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  department VARCHAR(100),
  credits INT,
  semester VARCHAR(50),
  is_published BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  visibility visibility_enum DEFAULT 'private',
  start_date DATE,
  end_date DATE,
  total_students INT DEFAULT 0,
  total_lectures INT DEFAULT 0,
  total_assignments INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(university_id, course_code)
);

CREATE TABLE course_faculty (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  faculty_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(course_id, faculty_id)
);

CREATE TABLE enrollment (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  status enrollment_status DEFAULT 'active',
  UNIQUE(student_id, course_id)
);

CREATE TABLE lectures (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  video_url TEXT,
  resources JSONB DEFAULT '[]'::jsonb,
  section_name VARCHAR(150),
  order_index INT,
  duration_minutes INT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE assignments (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  deadline TIMESTAMP NOT NULL,
  max_marks INT NOT NULL,
  late_submission_allowed BOOLEAN DEFAULT FALSE,
  assignment_type assignment_type_enum NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  assignment_id BIGINT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT,
  text_submission TEXT,
  marks_obtained INT,
  feedback TEXT,
  graded_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  graded_at TIMESTAMP,
  status submission_status NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

CREATE TABLE quizzes (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  time_limit_minutes INT,
  max_attempts INT DEFAULT 1,
  open_at TIMESTAMP,
  close_at TIMESTAMP,
  total_marks INT DEFAULT 0,
  created_by BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quiz_questions (
  id BIGSERIAL PRIMARY KEY,
  quiz_id BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL,
  options JSONB,
  correct_answer JSONB,
  marks INT DEFAULT 1
);

CREATE TABLE quiz_attempts (
  id BIGSERIAL PRIMARY KEY,
  quiz_id BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INT,
  attempt_number INT NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  submitted_at TIMESTAMP,
  status quiz_attempt_status NOT NULL
);

CREATE TABLE announcements (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_by BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

CREATE TABLE course_progress (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  progress_percentage NUMERIC(5,2) DEFAULT 0,
  completed_lectures INT DEFAULT 0,
  completed_assignments INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

CREATE TABLE lecture_progress (
  id BIGSERIAL PRIMARY KEY,
  lecture_id BIGINT NOT NULL REFERENCES lectures(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  watched_percentage NUMERIC(5,2) DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  last_watched_at TIMESTAMP,
  UNIQUE(lecture_id, student_id)
);

CREATE TABLE performance (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  average_assignment_score NUMERIC(5,2) DEFAULT 0,
  average_quiz_score NUMERIC(5,2) DEFAULT 0,
  overall_score NUMERIC(5,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

