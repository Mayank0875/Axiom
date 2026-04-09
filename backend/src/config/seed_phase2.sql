-- Phase-2 seed data for non-core LMS modules

WITH uni AS (
  SELECT id FROM universities WHERE slug = 'axiom-university' LIMIT 1
)
INSERT INTO programs (university_id, title, description, course_count)
SELECT id, 'Full Stack Developer Program', 'A structured full stack learning path.', 6 FROM uni
ON CONFLICT DO NOTHING;

WITH uni AS (
  SELECT id FROM universities WHERE slug = 'axiom-university' LIMIT 1
)
INSERT INTO batches (university_id, title, status, start_date, end_date, course_count, student_count, category)
SELECT id, 'Batch 2026 Spring', 'Upcoming', DATE '2026-05-01', DATE '2026-08-31', 4, 30, 'General' FROM uni
ON CONFLICT DO NOTHING;

WITH uni AS (
  SELECT id FROM universities WHERE slug = 'axiom-university' LIMIT 1
)
INSERT INTO certified_members (university_id, name, category, open_to_work, hiring)
SELECT id, 'Amit Kumar', 'Web Development', TRUE, FALSE FROM uni
ON CONFLICT DO NOTHING;

WITH uni AS (
  SELECT id FROM universities WHERE slug = 'axiom-university' LIMIT 1
)
INSERT INTO job_openings (university_id, title, company, country, type, work_mode)
SELECT id, 'Frontend Developer', 'TechCorp', 'India', 'Full Time', 'Remote' FROM uni
ON CONFLICT DO NOTHING;

WITH uni AS (
  SELECT id FROM universities WHERE slug = 'axiom-university' LIMIT 1
),
first_course AS (
  SELECT id FROM courses ORDER BY id LIMIT 1
)
INSERT INTO programming_exercises (university_id, title, language, difficulty, course_id, updated_on)
SELECT uni.id, 'Two Sum', 'Python', 'Easy', first_course.id, '1 hour'
FROM uni, first_course
ON CONFLICT DO NOTHING;

-- Seed one quiz with questions/explanations if no quizzes exist
WITH first_course AS (
  SELECT id FROM courses ORDER BY id LIMIT 1
),
creator AS (
  SELECT id FROM users WHERE email = 'faculty@axiom.edu' LIMIT 1
),
inserted_quiz AS (
  INSERT INTO quizzes (course_id, title, description, max_attempts, total_marks, created_by)
  SELECT first_course.id, 'SOLID Principles Quiz', 'Basic software design principles', 1, 20, creator.id
  FROM first_course, creator
  WHERE NOT EXISTS (SELECT 1 FROM quizzes)
  RETURNING id
)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks)
SELECT
  inserted_quiz.id,
  q.question_text,
  'mcq',
  q.options::jsonb,
  q.correct_answer::jsonb,
  q.marks
FROM inserted_quiz,
LATERAL (
  VALUES
    (
      'Which principle says one class should have one reason to change?',
      '[{"key":"A","text":"SRP"},{"key":"B","text":"OCP"},{"key":"C","text":"LSP"},{"key":"D","text":"DIP"}]',
      '{"key":"A","explanation":"SRP states one class should have one responsibility."}',
      10
    ),
    (
      'Which principle promotes depending on abstractions?',
      '[{"key":"A","text":"ISP"},{"key":"B","text":"DIP"},{"key":"C","text":"OCP"},{"key":"D","text":"LSP"}]',
      '{"key":"B","explanation":"DIP says high-level modules should depend on abstractions."}',
      10
    )
) AS q(question_text, options, correct_answer, marks);

