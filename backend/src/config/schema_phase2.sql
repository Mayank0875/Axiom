-- Phase-2 schema for LMS modules still using mock data

CREATE TABLE IF NOT EXISTS programs (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  course_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS batches (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  status VARCHAR(40) NOT NULL,
  start_date DATE,
  end_date DATE,
  course_count INT DEFAULT 0,
  student_count INT DEFAULT 0,
  category VARCHAR(120),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certified_members (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(120),
  open_to_work BOOLEAN DEFAULT FALSE,
  hiring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_openings (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  company VARCHAR(150) NOT NULL,
  country VARCHAR(80),
  type VARCHAR(80),
  work_mode VARCHAR(80),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS programming_exercises (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  language VARCHAR(40) NOT NULL,
  difficulty VARCHAR(40) NOT NULL,
  course_id BIGINT REFERENCES courses(id) ON DELETE SET NULL,
  updated_on VARCHAR(80) DEFAULT 'recently',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_attempt_answers (
  id BIGSERIAL PRIMARY KEY,
  quiz_attempt_id BIGINT NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id BIGINT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option VARCHAR(20),
  is_correct BOOLEAN DEFAULT FALSE,
  UNIQUE(quiz_attempt_id, question_id)
);

