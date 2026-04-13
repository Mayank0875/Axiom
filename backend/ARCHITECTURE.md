# Axiom LMS — Backend Architecture

## Class Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MODELS (Domain Objects)                             │
├──────────────┬──────────────┬──────────────┬──────────────┬─────────────────┤
│    User      │   Course     │   Lecture    │  Assignment  │      Quiz       │
│──────────────│──────────────│──────────────│──────────────│─────────────────│
│ id           │ id           │ id           │ id           │ id              │
│ universityId │ universityId │ courseId     │ courseId     │ courseId        │
│ fullName     │ title        │ title        │ title        │ title           │
│ email        │ courseCode   │ description  │ description  │ description     │
│ passwordHash │ description  │ videoUrl     │ deadline     │ maxAttempts     │
├──────────────┴──────────────┴──────────────│ maxMarks     │ totalMarks      │
│  Submission  │ Notification │              │ assignType   │                 │
│──────────────│──────────────│              ├──────────────┴─────────────────┤
│ id           │ id           │              │  UserRole = "admin"            │
│ assignmentId │ universityId │              │           | "faculty"          │
│ studentId    │ userId       │              │           | "student"          │
│ textSubmit   │ title        │              └────────────────────────────────┘
│ fileUrl      │ message      │
│ status       │              │
└──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    LAYERED ARCHITECTURE (Request Flow)                      │
│                                                                             │
│  HTTP Request                                                               │
│      │                                                                      │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ROUTES  (Dependency Injection + Middleware Chain)                  │   │
│  │  Wires: Controller ← Service ← Repository                          │   │
│  │  Applies: authenticate → requireRole → asyncHandler(controller.fn) │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│      │                                                                      │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  MIDDLEWARES                                                        │   │
│  │  authenticate  → verifies JWT, sets req.user                       │   │
│  │  requireRole   → checks req.user.roles against allowed list        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│      │                                                                      │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  CONTROLLERS  (HTTP Adapter)                                        │   │
│  │  AuthController      UserController     CourseController            │   │
│  │  LectureController   AssignmentController  QuizController           │   │
│  │  NotificationController  CatalogController                         │   │
│  │                                                                     │   │
│  │  Responsibility: read req → call service → send res.json()         │   │
│  │  No business logic here.                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│      │                                                                      │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SERVICES  (Business Logic)                                         │   │
│  │  AuthService      UserService      CourseService                   │   │
│  │  LectureService   AssignmentService  QuizService                   │   │
│  │  NotificationService  CatalogService                               │   │
│  │                                                                     │   │
│  │  Responsibility: validate input, enforce rules, orchestrate repos  │   │
│  │  Throws HttpError for business rule violations.                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│      │                                                                      │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  REPOSITORIES  (Data Access — Repository Pattern)                  │   │
│  │  AuthRepository      UserRepository     CourseRepository           │   │
│  │  LectureRepository   AssignmentRepository  QuizRepository          │   │
│  │  NotificationRepository  CatalogRepository                        │   │
│  │                                                                     │   │
│  │  Responsibility: SQL queries only. No business logic.              │   │
│  │  All use parameterized queries ($1, $2) — no SQL injection.        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│      │                                                                      │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DATABASE  (Singleton Pattern)                                      │   │
│  │  Database.getInstance() → single pg Pool shared by all repos       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Database Diagram (ERD)

```
universities
  id PK
  name
  slug UNIQUE
  website_url
  address
  owner_id
  created_at
       │
       │ 1:N
       ▼
users                          roles
  id PK                          id PK
  university_id FK ──────────    name (admin|faculty|student)
  full_name                  │
  email                      │   user_roles
  phone                      │     id PK
  password_hash              │     user_id FK ──► users.id
  is_active                  │     role_id FK ──► roles.id
  is_verified                │     UNIQUE(user_id, role_id)
  created_at                 │
       │                     │
       │ 1:1 (optional)      │
       ├──► student_profiles  │
       │      user_id FK      │
       │      roll_number      │
       │      year             │
       │      department       │
       │      cgpa             │
       │                      │
       ├──► faculty_profiles   │
       │      user_id FK       │
       │      designation      │
       │      specialization   │
       │      department       │
       │      experience_years │
       │                      │
       └──► admin_profiles     │
              user_id FK       │
              designation      │

courses
  id PK
  university_id FK ──► universities.id
  title
  course_code
  description
  department
  credits
  semester
  is_published
  is_active
  visibility (private|public)
  start_date / end_date
       │
       ├──► course_faculty
       │      course_id FK ──► courses.id
       │      faculty_id FK ──► users.id
       │      UNIQUE(course_id, faculty_id)
       │
       ├──► enrollment
       │      student_id FK ──► users.id
       │      course_id FK ──► courses.id
       │      status (active|completed|dropped)
       │      UNIQUE(student_id, course_id)
       │
       ├──► lectures
       │      id PK
       │      course_id FK
       │      title / description / video_url
       │      section_name / order_index
       │      duration_minutes / is_published
       │
       ├──► assignments
       │      id PK
       │      course_id FK
       │      title / description / deadline
       │      max_marks / assignment_type
       │           │
       │           └──► submissions
       │                  assignment_id FK
       │                  student_id FK ──► users.id
       │                  text_submission / file_url
       │                  marks_obtained / feedback
       │                  status (submitted|late|graded)
       │                  UNIQUE(assignment_id, student_id)
       │
       └──► quizzes
              id PK
              course_id FK
              title / description
              time_limit_minutes
              max_attempts / total_marks
              created_by FK ──► users.id
                   │
                   ├──► quiz_questions
                   │      quiz_id FK
                   │      question_text
                   │      options JSONB
                   │      correct_answer JSONB
                   │      marks
                   │
                   └──► quiz_attempts
                          quiz_id FK
                          student_id FK ──► users.id
                          score / attempt_number
                          status (in_progress|submitted|evaluated)
                               │
                               └──► quiz_attempt_answers
                                      quiz_attempt_id FK
                                      question_id FK
                                      selected_option
                                      is_correct
                                      UNIQUE(attempt_id, question_id)

notifications
  id PK
  university_id FK ──► universities.id
  user_id FK ──► users.id
  title / message
  created_at / read_at

programs
  id PK
  university_id FK
  title / description / course_count

batches
  id PK
  university_id FK
  title / status / start_date / end_date
  course_count / student_count / category

programming_exercises
  id PK
  university_id FK
  title / language / difficulty
  course_id FK (optional)

job_openings
  id PK
  university_id FK
  title / company / country / type / work_mode

certified_members
  id PK
  university_id FK
  name / category / open_to_work / hiring
```

---

## Design Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| **Singleton** | `Database` class | One shared pg Pool — no duplicate connections |
| **Repository** | `*Repository` classes | All SQL isolated here — services never write SQL |
| **Service Layer** | `*Service` classes | Business rules in one place — not scattered in controllers |
| **Dependency Injection** | Constructor injection in all classes | Testable, loosely coupled — swap implementations easily |
| **Chain of Responsibility** | Express middleware chain | `authenticate → requireRole → handler` — each step can short-circuit |
| **Decorator** | `asyncHandler` | Wraps handlers to catch async errors without changing their signature |
| **Facade** | `App` class | Hides Express setup complexity behind a clean interface |
| **Observer** (simplified) | Notification side-effects in services | Assignment/Quiz creation triggers student notifications fire-and-forget |
| **Front Controller** | `routes/index.ts` | Single entry point for all API routes |
| **Strategy** | `requireRole(...roles)` | Factory returns a middleware configured for specific roles |

---

## SOLID Principles Applied

| Principle | How |
|-----------|-----|
| **S** — Single Responsibility | Model = shape, Repository = SQL, Service = rules, Controller = HTTP |
| **O** — Open/Closed | Add a new module (e.g. Announcement) without changing existing layers |
| **L** — Liskov | No forced inheritance misuse — classes are simple and predictable |
| **I** — Interface Segregation | Small focused classes instead of one giant service |
| **D** — Dependency Inversion | Services/controllers depend on injected repos, not hardcoded internals |
