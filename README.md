# Axiom LMS

A production-grade University Learning Management System built with clean architecture, OOP, and design patterns.

> **Axiom** — *noun, Mathematics* — a foundational truth requiring no proof.
> Education should work the same way.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Tailwind CSS + Vite |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |

---

## Architecture

```
HTTP Request → Routes → Middlewares → Controllers → Services → Repositories → PostgreSQL
```

- **Routes** — wire dependencies, apply middleware
- **Controllers** — handle HTTP (read req, call service, send res)
- **Services** — business logic and validation
- **Repositories** — SQL queries only
- **Models** — domain object classes

See `backend/ARCHITECTURE.md` for full class diagram, DB diagram, and design patterns.

---

## Quick Start

### 1. Database setup

```bash
psql -U <your_user> -c "CREATE DATABASE axiom_lms;"
psql axiom_lms < backend/src/config/schema.sql
psql axiom_lms < backend/src/config/schema_phase2.sql
psql axiom_lms < backend/src/config/seed.sql
psql axiom_lms < backend/src/config/seed_users.sql
```

### 2. Backend

```bash
# Create backend/.env
PORT=8080
DATABASE_URL=postgres://<user>@localhost:5432/axiom_lms
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

npm --prefix backend install
npm --prefix backend run dev
```

### 3. Frontend

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`


---

## Design Patterns

- **Singleton** — Database connection pool
- **Repository** — Data access isolation
- **Service Layer** — Business logic separation
- **Dependency Injection** — Constructor injection throughout
- **Chain of Responsibility** — Express middleware pipeline
- **Decorator** — asyncHandler wraps route handlers
- **Facade** — App class hides Express setup
- **Front Controller** — routes/index.ts as API gateway

---

Built by [Mayank Gupta](https://github.com/Mayank0875) — ICPC Regionalist · Codeforces Expert
