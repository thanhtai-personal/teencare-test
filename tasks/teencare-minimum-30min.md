# 30-minute minimum implementation plan (from `requirement.md`)

## Goal
Deliver a runnable MVP that demonstrates:
- Core database schema for Parent/Student/Class/Registration/Subscription
- REST APIs for main flows
- Simple UI to create Parent/Student and register Student into Class
- Dockerized run path (backend + frontend + database)

## Timebox plan (30 minutes)

### 0-3 min: Bootstrap + contracts
- [ ] Confirm stack: `Next.js + Postgres` (single app, API Routes + web UI)
- [ ] Create env template (`.env.example`) with DB connection
- [ ] Create migration folder and seed script placeholders

Acceptance:
- [ ] App starts locally with clear env variables

### 3-8 min: Database schema + seed
- [ ] Create tables:
  - [ ] `parents(id, name, phone, email)`
  - [ ] `students(id, name, dob, gender, current_grade, parent_id)`
  - [ ] `classes(id, name, subject, day_of_week, time_slot, teacher_name, max_students)`
  - [ ] `class_registrations(id, class_id, student_id, created_at)`
  - [ ] `subscriptions(id, student_id, package_name, start_date, end_date, total_sessions, used_sessions)`
- [ ] Add FK + basic indexes (`students.parent_id`, `registrations.class_id/student_id`, `subscriptions.student_id`)
- [ ] Seed minimum data: 2 parents, 3 students, 3 classes, 2 subscriptions

Acceptance:
- [ ] Fresh DB can migrate + seed without manual edits

### 8-18 min: Core APIs (must-have)
- [ ] `POST /api/parents`
- [ ] `GET /api/parents/{id}`
- [ ] `POST /api/students`
- [ ] `GET /api/students/{id}` (include parent)
- [ ] `POST /api/classes`
- [ ] `GET /api/classes?day={weekday}`
- [ ] `POST /api/subscriptions`
- [ ] `GET /api/subscriptions/{id}`
- [ ] `PATCH /api/subscriptions/{id}/use`
- [ ] `POST /api/classes/{class_id}/register` with checks:
  - [ ] class capacity (`max_students`)
  - [ ] schedule overlap (same day + same `time_slot`)
  - [ ] active subscription (`end_date >= today` and `used_sessions < total_sessions`)
- [ ] `DELETE /api/registrations/{id}` with cancellation rule:
  - [ ] cancel >24h: decrement `used_sessions` by 1 (floor 0)
  - [ ] cancel <=24h: no refund session

Acceptance:
- [ ] All endpoints return JSON with proper status codes (`200/201/400/404/409`)

### 18-26 min: Minimum frontend UI
- [ ] Parent form page: create parent
- [ ] Student form page: create student linked to parent
- [ ] Weekly class board (7 columns/day) showing `time_slot`, `teacher_name`
- [ ] Registration action: select student + class and call register API
- [ ] Basic success/error states on UI

Acceptance:
- [ ] User can complete flow: create parent -> create student -> register class

### 26-30 min: Docker + README + smoke
- [ ] `Dockerfile` for web/app
- [ ] `docker-compose.yml` for app + Postgres
- [ ] README update:
  - [ ] setup/run with Docker
  - [ ] schema summary
  - [ ] endpoint list + curl samples
  - [ ] seed sample description
- [ ] Quick smoke checklist in README

Acceptance:
- [ ] `docker compose up` can start app + DB and run MVP flow

---

## Scope cuts if behind time
1. Keep only one active subscription per student (enforce in query logic).
2. For overlap check, treat `time_slot` as exact-match string in MVP.
3. For cancel >24h logic, use class start datetime computed from `day_of_week + time_slot` of nearest upcoming occurrence.
4. Skip auth/roles entirely in this test MVP.

## Definition of done for this 30-min phase
- [ ] UI template is integrated and navigable
- [ ] Parent/Student/Class/Subscription CRUD (minimum required endpoints) works
- [ ] Registration rules are enforced by API
- [ ] Dockerized run path and README are present
