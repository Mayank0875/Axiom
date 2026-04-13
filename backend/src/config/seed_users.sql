-- =============================================================
-- Axiom LMS — Full dummy user seed for all entities
-- =============================================================
-- Passwords (bcrypt, cost 10):
--   admin123   → admins
--   faculty123 → faculty
--   student123 → students
-- =============================================================

-- ── 0. Ensure university exists ───────────────────────────────
INSERT INTO universities (name, slug, description, website_url, address)
VALUES (
  'Axiom University',
  'axiom-university',
  'A modern university offering technology and management programs.',
  'https://axiom.example.edu',
  '42 Knowledge Park, Bengaluru, Karnataka 560001'
)
ON CONFLICT (slug) DO UPDATE SET
  description  = EXCLUDED.description,
  address      = EXCLUDED.address,
  website_url  = EXCLUDED.website_url;

-- ── 1. ADMINS ─────────────────────────────────────────────────

INSERT INTO users (university_id, full_name, email, phone, password_hash, is_verified, is_active)
SELECT u.id, v.full_name, v.email, v.phone,
       '$2b$10$A/pRLEgEgVTaTgNgu/kYKOyHHv5by6DhSohmrrgLVY6n4u5WpeEDu', -- admin123
       TRUE, TRUE
FROM universities u,
(VALUES
  ('System Admin',    'admin@axiom.edu',        '+91-9000000001'),
  ('Priya Sharma',    'priya.admin@axiom.edu',  '+91-9000000002'),
  ('Rahul Verma',     'rahul.admin@axiom.edu',  '+91-9000000003')
) AS v(full_name, email, phone)
WHERE u.slug = 'axiom-university'
ON CONFLICT (email, university_id) DO NOTHING;

-- Admin roles
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN universities uni ON uni.id = u.university_id
JOIN roles r ON r.name = 'admin'
WHERE uni.slug = 'axiom-university'
  AND u.email IN ('admin@axiom.edu','priya.admin@axiom.edu','rahul.admin@axiom.edu')
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Admin profiles
INSERT INTO admin_profiles (user_id, designation)
SELECT u.id,
  CASE u.email
    WHEN 'admin@axiom.edu'       THEN 'System Administrator'
    WHEN 'priya.admin@axiom.edu' THEN 'Academic Registrar'
    WHEN 'rahul.admin@axiom.edu' THEN 'IT Administrator'
  END
FROM users u
JOIN universities uni ON uni.id = u.university_id
WHERE uni.slug = 'axiom-university'
  AND u.email IN ('admin@axiom.edu','priya.admin@axiom.edu','rahul.admin@axiom.edu')
ON CONFLICT (user_id) DO NOTHING;

-- ── 2. FACULTY ────────────────────────────────────────────────

INSERT INTO users (university_id, full_name, email, phone, password_hash, is_verified, is_active)
SELECT u.id, v.full_name, v.email, v.phone,
       '$2b$10$2U2yx20mJhoapaEHWzFk9eyVbsifW94Sr.0RbRhROoyBJ2Mu2h2RK', -- faculty123
       TRUE, TRUE
FROM universities u,
(VALUES
  ('Faculty Demo',      'faculty@axiom.edu',          '+91-9100000001'),
  ('Dr. Anita Menon',   'anita.menon@axiom.edu',      '+91-9100000002'),
  ('Prof. Suresh Nair', 'suresh.nair@axiom.edu',      '+91-9100000003'),
  ('Dr. Kavita Joshi',  'kavita.joshi@axiom.edu',     '+91-9100000004'),
  ('Mr. Arjun Pillai',  'arjun.pillai@axiom.edu',     '+91-9100000005')
) AS v(full_name, email, phone)
WHERE u.slug = 'axiom-university'
ON CONFLICT (email, university_id) DO NOTHING;

-- Faculty roles
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN universities uni ON uni.id = u.university_id
JOIN roles r ON r.name = 'faculty'
WHERE uni.slug = 'axiom-university'
  AND u.email IN (
    'faculty@axiom.edu','anita.menon@axiom.edu','suresh.nair@axiom.edu',
    'kavita.joshi@axiom.edu','arjun.pillai@axiom.edu'
  )
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Faculty profiles
INSERT INTO faculty_profiles (user_id, designation, specialization, department, experience_years)
SELECT u.id, v.designation, v.specialization, v.department, v.exp
FROM users u
JOIN universities uni ON uni.id = u.university_id,
(VALUES
  ('faculty@axiom.edu',       'Senior Lecturer',   'Full Stack Development',      'Computer Science', 5),
  ('anita.menon@axiom.edu',   'Associate Professor','Machine Learning & AI',       'Computer Science', 10),
  ('suresh.nair@axiom.edu',   'Professor',          'Database Systems',            'Information Technology', 15),
  ('kavita.joshi@axiom.edu',  'Assistant Professor','Web Technologies',            'Computer Science', 6),
  ('arjun.pillai@axiom.edu',  'Lecturer',           'Data Structures & Algorithms','Computer Science', 3)
) AS v(email, designation, specialization, department, exp)
WHERE uni.slug = 'axiom-university' AND u.email = v.email
ON CONFLICT (user_id) DO NOTHING;

-- ── 3. STUDENTS ───────────────────────────────────────────────

INSERT INTO users (university_id, full_name, email, phone, password_hash, is_verified, is_active)
SELECT u.id, v.full_name, v.email, v.phone,
       '$2b$10$HNKWu48xy4wyZ.b3/aeGQ.HA/cve5.9ahEuuNPONY2sfzxBBXqBgG', -- student123
       TRUE, TRUE
FROM universities u,
(VALUES
  ('Student Demo',      'student@axiom.edu',          '+91-9200000001'),
  ('Aarav Singh',       'aarav.singh@axiom.edu',      '+91-9200000002'),
  ('Diya Patel',        'diya.patel@axiom.edu',       '+91-9200000003'),
  ('Rohan Mehta',       'rohan.mehta@axiom.edu',      '+91-9200000004'),
  ('Sneha Reddy',       'sneha.reddy@axiom.edu',      '+91-9200000005'),
  ('Karan Gupta',       'karan.gupta@axiom.edu',      '+91-9200000006'),
  ('Pooja Iyer',        'pooja.iyer@axiom.edu',       '+91-9200000007'),
  ('Vikram Rao',        'vikram.rao@axiom.edu',        '+91-9200000008'),
  ('Ananya Nair',       'ananya.nair@axiom.edu',      '+91-9200000009'),
  ('Harsh Jain',        'harsh.jain@axiom.edu',       '+91-9200000010')
) AS v(full_name, email, phone)
WHERE u.slug = 'axiom-university'
ON CONFLICT (email, university_id) DO NOTHING;

-- Student roles
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN universities uni ON uni.id = u.university_id
JOIN roles r ON r.name = 'student'
WHERE uni.slug = 'axiom-university'
  AND u.email IN (
    'student@axiom.edu','aarav.singh@axiom.edu','diya.patel@axiom.edu',
    'rohan.mehta@axiom.edu','sneha.reddy@axiom.edu','karan.gupta@axiom.edu',
    'pooja.iyer@axiom.edu','vikram.rao@axiom.edu','ananya.nair@axiom.edu',
    'harsh.jain@axiom.edu'
  )
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Student profiles
INSERT INTO student_profiles (user_id, roll_number, year, department, cgpa)
SELECT u.id, v.roll, v.yr, v.dept, v.cgpa
FROM users u
JOIN universities uni ON uni.id = u.university_id,
(VALUES
  ('student@axiom.edu',     'CS2024001', 2, 'Computer Science',       8.20),
  ('aarav.singh@axiom.edu', 'CS2024002', 2, 'Computer Science',       8.75),
  ('diya.patel@axiom.edu',  'CS2024003', 2, 'Computer Science',       9.10),
  ('rohan.mehta@axiom.edu', 'IT2024001', 1, 'Information Technology', 7.80),
  ('sneha.reddy@axiom.edu', 'IT2024002', 1, 'Information Technology', 8.50),
  ('karan.gupta@axiom.edu', 'CS2023001', 3, 'Computer Science',       7.60),
  ('pooja.iyer@axiom.edu',  'CS2023002', 3, 'Computer Science',       8.90),
  ('vikram.rao@axiom.edu',  'IT2023001', 3, 'Information Technology', 7.40),
  ('ananya.nair@axiom.edu', 'CS2022001', 4, 'Computer Science',       9.30),
  ('harsh.jain@axiom.edu',  'IT2022001', 4, 'Information Technology', 8.00)
) AS v(email, roll, yr, dept, cgpa)
WHERE uni.slug = 'axiom-university' AND u.email = v.email
ON CONFLICT (user_id) DO NOTHING;

-- ── 4. COURSES ────────────────────────────────────────────────

INSERT INTO courses (
  university_id, title, course_code, description, department,
  credits, semester, is_published, is_active, visibility,
  start_date, end_date
)
SELECT u.id, v.title, v.code, v.description, v.dept, v.credits, v.sem, TRUE, TRUE, 'public',
       DATE '2026-01-10', DATE '2026-05-30'
FROM universities u,
(VALUES
  ('Data Structures & Algorithms', 'CS301', 'Core DSA concepts with practical problem solving.', 'Computer Science',       4, 'Semester 3'),
  ('Web Development Fundamentals', 'CS201', 'HTML, CSS, JavaScript and modern frameworks.',      'Computer Science',       3, 'Semester 2'),
  ('Database Management Systems',  'IT301', 'Relational databases, SQL, and normalization.',     'Information Technology', 4, 'Semester 3'),
  ('Machine Learning Basics',      'CS401', 'Supervised and unsupervised learning algorithms.',  'Computer Science',       4, 'Semester 4'),
  ('Operating Systems',            'CS302', 'Process management, memory, and file systems.',     'Computer Science',       4, 'Semester 3'),
  ('Software Engineering',         'CS402', 'SDLC, design patterns, and agile methodology.',    'Computer Science',       3, 'Semester 4')
) AS v(title, code, description, dept, credits, sem)
WHERE u.slug = 'axiom-university'
ON CONFLICT (university_id, course_code) DO NOTHING;

-- ── 5. ASSIGN FACULTY TO COURSES ─────────────────────────────

INSERT INTO course_faculty (course_id, faculty_id)
SELECT c.id, u.id
FROM courses c
JOIN universities uni ON uni.id = c.university_id
JOIN users u ON u.university_id = uni.id,
(VALUES
  ('CS301', 'arjun.pillai@axiom.edu'),
  ('CS201', 'kavita.joshi@axiom.edu'),
  ('IT301', 'suresh.nair@axiom.edu'),
  ('CS401', 'anita.menon@axiom.edu'),
  ('CS302', 'faculty@axiom.edu'),
  ('CS402', 'faculty@axiom.edu')
) AS v(code, email)
WHERE uni.slug = 'axiom-university'
  AND c.course_code = v.code
  AND u.email = v.email
ON CONFLICT (course_id, faculty_id) DO NOTHING;

-- ── 6. ENROLL STUDENTS ────────────────────────────────────────

INSERT INTO enrollment (student_id, course_id, status)
SELECT u.id, c.id, 'active'
FROM users u
JOIN universities uni ON uni.id = u.university_id
JOIN courses c ON c.university_id = uni.id,
(VALUES
  ('student@axiom.edu',     'CS301'),
  ('student@axiom.edu',     'CS201'),
  ('student@axiom.edu',     'CS302'),
  ('aarav.singh@axiom.edu', 'CS301'),
  ('aarav.singh@axiom.edu', 'CS201'),
  ('diya.patel@axiom.edu',  'CS301'),
  ('diya.patel@axiom.edu',  'CS401'),
  ('rohan.mehta@axiom.edu', 'IT301'),
  ('rohan.mehta@axiom.edu', 'CS201'),
  ('sneha.reddy@axiom.edu', 'IT301'),
  ('karan.gupta@axiom.edu', 'CS302'),
  ('karan.gupta@axiom.edu', 'CS402'),
  ('pooja.iyer@axiom.edu',  'CS401'),
  ('pooja.iyer@axiom.edu',  'CS402'),
  ('vikram.rao@axiom.edu',  'IT301'),
  ('ananya.nair@axiom.edu', 'CS401'),
  ('ananya.nair@axiom.edu', 'CS402'),
  ('harsh.jain@axiom.edu',  'IT301')
) AS v(email, code)
WHERE uni.slug = 'axiom-university'
  AND u.email = v.email
  AND c.course_code = v.code
ON CONFLICT (student_id, course_id) DO NOTHING;

-- ── 7. ASSIGNMENTS ────────────────────────────────────────────

INSERT INTO assignments (course_id, title, description, deadline, max_marks, late_submission_allowed, assignment_type)
SELECT c.id, v.title, v.description, v.deadline::TIMESTAMP, v.marks, v.late, v.atype::assignment_type_enum
FROM courses c
JOIN universities uni ON uni.id = c.university_id,
(VALUES
  ('CS301', 'Linked List Implementation',   'Implement singly and doubly linked lists in any language.', '2026-02-15 23:59:00', 20, TRUE,  'file'),
  ('CS301', 'Binary Search Tree',           'Build a BST with insert, delete, and traversal methods.',   '2026-03-10 23:59:00', 25, FALSE, 'file'),
  ('CS201', 'Responsive Portfolio Page',    'Create a responsive personal portfolio using HTML & CSS.',  '2026-02-20 23:59:00', 20, TRUE,  'file'),
  ('CS201', 'JavaScript Todo App',          'Build a todo app with local storage persistence.',          '2026-03-25 23:59:00', 25, FALSE, 'coding'),
  ('IT301', 'ER Diagram Design',            'Design an ER diagram for a hospital management system.',   '2026-02-28 23:59:00', 15, TRUE,  'file'),
  ('CS401', 'Linear Regression from Scratch','Implement linear regression without using ML libraries.', '2026-03-15 23:59:00', 30, FALSE, 'coding'),
  ('CS302', 'Process Scheduling Simulation','Simulate FCFS and Round Robin scheduling algorithms.',     '2026-03-05 23:59:00', 20, TRUE,  'coding'),
  ('CS402', 'Design Pattern Report',        'Document 3 design patterns with real-world examples.',     '2026-04-01 23:59:00', 20, FALSE, 'file')
) AS v(code, title, description, deadline, marks, late, atype)
WHERE uni.slug = 'axiom-university' AND c.course_code = v.code
ON CONFLICT DO NOTHING;

-- ── 8. QUIZZES ────────────────────────────────────────────────

WITH creator AS (
  SELECT u.id FROM users u
  JOIN universities uni ON uni.id = u.university_id
  WHERE uni.slug = 'axiom-university' AND u.email = 'faculty@axiom.edu'
  LIMIT 1
)
INSERT INTO quizzes (course_id, title, description, time_limit_minutes, max_attempts, total_marks, created_by, open_at, close_at)
SELECT c.id, v.title, v.description, v.tlimit, 1, v.marks, creator.id,
       NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days'
FROM courses c
JOIN universities uni ON uni.id = c.university_id,
creator,
(VALUES
  ('CS301', 'DSA Fundamentals Quiz',     'Test your knowledge of arrays, stacks, and queues.',    20, 20),
  ('CS201', 'HTML & CSS Basics Quiz',    'Core concepts of HTML structure and CSS styling.',       15, 15),
  ('IT301', 'SQL Essentials Quiz',       'SELECT, JOIN, GROUP BY and aggregate functions.',        20, 20),
  ('CS401', 'ML Concepts Quiz',          'Supervised vs unsupervised, bias-variance tradeoff.',    25, 25),
  ('CS302', 'OS Concepts Quiz',          'Processes, threads, deadlocks, and memory management.',  20, 20)
) AS v(code, title, description, tlimit, marks)
WHERE uni.slug = 'axiom-university' AND c.course_code = v.code
  AND NOT EXISTS (
    SELECT 1 FROM quizzes q2 WHERE q2.course_id = c.id AND q2.title = v.title
  );

-- Quiz questions for DSA quiz
WITH q AS (
  SELECT qz.id FROM quizzes qz
  JOIN courses c ON c.id = qz.course_id
  JOIN universities uni ON uni.id = c.university_id
  WHERE uni.slug = 'axiom-university' AND c.course_code = 'CS301'
    AND qz.title = 'DSA Fundamentals Quiz' LIMIT 1
)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks)
SELECT q.id, v.qtext, 'mcq', v.opts::jsonb, v.ans::jsonb, 5
FROM q,
(VALUES
  (
    'Which data structure uses LIFO order?',
    '[{"key":"A","text":"Queue"},{"key":"B","text":"Stack"},{"key":"C","text":"Heap"},{"key":"D","text":"Tree"}]',
    '{"key":"B","explanation":"Stack follows Last In First Out (LIFO) principle."}'
  ),
  (
    'What is the time complexity of binary search?',
    '[{"key":"A","text":"O(n)"},{"key":"B","text":"O(n²)"},{"key":"C","text":"O(log n)"},{"key":"D","text":"O(1)"}]',
    '{"key":"C","explanation":"Binary search halves the search space each step, giving O(log n)."}'
  ),
  (
    'Which traversal visits root first?',
    '[{"key":"A","text":"Inorder"},{"key":"B","text":"Postorder"},{"key":"C","text":"Preorder"},{"key":"D","text":"Level order"}]',
    '{"key":"C","explanation":"Preorder visits root, then left subtree, then right subtree."}'
  ),
  (
    'Array access by index is:',
    '[{"key":"A","text":"O(n)"},{"key":"B","text":"O(log n)"},{"key":"C","text":"O(n²)"},{"key":"D","text":"O(1)"}]',
    '{"key":"D","explanation":"Arrays provide direct index-based access in constant time."}'
  )
) AS v(qtext, opts, ans)
WHERE NOT EXISTS (SELECT 1 FROM quiz_questions qq WHERE qq.quiz_id = q.id);

-- Quiz questions for SQL quiz
WITH q AS (
  SELECT qz.id FROM quizzes qz
  JOIN courses c ON c.id = qz.course_id
  JOIN universities uni ON uni.id = c.university_id
  WHERE uni.slug = 'axiom-university' AND c.course_code = 'IT301'
    AND qz.title = 'SQL Essentials Quiz' LIMIT 1
)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks)
SELECT q.id, v.qtext, 'mcq', v.opts::jsonb, v.ans::jsonb, 5
FROM q,
(VALUES
  (
    'Which SQL clause filters grouped results?',
    '[{"key":"A","text":"WHERE"},{"key":"B","text":"HAVING"},{"key":"C","text":"GROUP BY"},{"key":"D","text":"ORDER BY"}]',
    '{"key":"B","explanation":"HAVING filters after GROUP BY, while WHERE filters before grouping."}'
  ),
  (
    'Which JOIN returns all rows from both tables?',
    '[{"key":"A","text":"INNER JOIN"},{"key":"B","text":"LEFT JOIN"},{"key":"C","text":"RIGHT JOIN"},{"key":"D","text":"FULL OUTER JOIN"}]',
    '{"key":"D","explanation":"FULL OUTER JOIN returns all rows from both tables, with NULLs where no match."}'
  ),
  (
    'PRIMARY KEY constraint ensures:',
    '[{"key":"A","text":"Uniqueness only"},{"key":"B","text":"Not null only"},{"key":"C","text":"Uniqueness and not null"},{"key":"D","text":"Foreign reference"}]',
    '{"key":"C","explanation":"PRIMARY KEY enforces both uniqueness and NOT NULL on a column."}'
  ),
  (
    'Which function counts non-null values?',
    '[{"key":"A","text":"SUM()"},{"key":"B","text":"COUNT(*)"},{"key":"C","text":"COUNT(column)"},{"key":"D","text":"AVG()"}]',
    '{"key":"C","explanation":"COUNT(column) counts only non-null values in that column."}'
  )
) AS v(qtext, opts, ans)
WHERE NOT EXISTS (SELECT 1 FROM quiz_questions qq WHERE qq.quiz_id = q.id);

-- ── 9. NOTIFICATIONS ─────────────────────────────────────────

INSERT INTO notifications (university_id, user_id, title, message)
SELECT uni.id, u.id, v.title, v.msg
FROM universities uni
JOIN users u ON u.university_id = uni.id,
(VALUES
  ('student@axiom.edu',     'Assignment Due Soon',        'Your Linked List Implementation assignment is due in 3 days. Make sure to submit on time.'),
  ('student@axiom.edu',     'New Quiz Available',         'A new quiz "DSA Fundamentals Quiz" has been published for CS301. It closes in 30 days.'),
  ('aarav.singh@axiom.edu', 'Course Enrollment Confirmed','You have been successfully enrolled in CS301 - Data Structures & Algorithms.'),
  ('diya.patel@axiom.edu',  'Grade Posted',               'Your grade for the Web Development Fundamentals midterm has been posted. Check your results.'),
  ('faculty@axiom.edu',     'New Submission',             'A student has submitted the Linked List Implementation assignment. Please review and grade.'),
  ('anita.menon@axiom.edu', 'Quiz Results Ready',         'Students have completed the ML Concepts Quiz. Results are available in the faculty panel.'),
  ('admin@axiom.edu',       'System Maintenance',         'Scheduled maintenance on Sunday 2 AM – 4 AM IST. The platform will be temporarily unavailable.'),
  ('rohan.mehta@axiom.edu', 'Welcome to Axiom LMS',       'Welcome Rohan! Your account is active. Explore your enrolled courses and get started.')
) AS v(email, title, msg)
WHERE uni.slug = 'axiom-university' AND u.email = v.email
ON CONFLICT DO NOTHING;

-- ── 10. LECTURES ─────────────────────────────────────────────

INSERT INTO lectures (course_id, title, description, section_name, order_index, duration_minutes, is_published)
SELECT c.id, v.title, v.description, v.section_name, v.ord, v.dur, TRUE
FROM courses c
JOIN universities uni ON uni.id = c.university_id,
(VALUES
  ('CS301', 'Introduction to Arrays',         'Memory layout, indexing, and basic operations.',         'Arrays & Strings',  1, 45),
  ('CS301', 'Stacks and Queues',              'Implementation using arrays and linked lists.',          'Linear Structures',  2, 50),
  ('CS301', 'Binary Trees Basics',            'Nodes, edges, height, and traversal algorithms.',        'Trees',              3, 55),
  ('CS201', 'HTML Document Structure',        'DOCTYPE, head, body, semantic elements.',                'HTML Basics',        1, 40),
  ('CS201', 'CSS Box Model',                  'Margin, padding, border, and layout fundamentals.',      'CSS Fundamentals',   2, 45),
  ('CS201', 'JavaScript Variables & Types',   'var, let, const, primitive and reference types.',        'JavaScript',         3, 50),
  ('IT301', 'Introduction to Databases',      'DBMS concepts, RDBMS, and data models.',                 'Foundations',        1, 40),
  ('IT301', 'SQL SELECT Queries',             'Basic SELECT, WHERE, ORDER BY, and LIMIT.',              'SQL Basics',         2, 50),
  ('CS401', 'What is Machine Learning?',      'Types of ML, applications, and the ML pipeline.',        'Introduction',       1, 45),
  ('CS401', 'Linear Regression',             'Cost function, gradient descent, and evaluation.',        'Supervised Learning',2, 60)
) AS v(code, title, description, section_name, ord, dur)
WHERE uni.slug = 'axiom-university' AND c.course_code = v.code
ON CONFLICT DO NOTHING;
