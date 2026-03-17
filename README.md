# TeenUp Mini LMS (Next.js + PostgreSQL)

## 1. Overview
Mini web app theo `requirement.md` gồm:
- Quản lý Parent, Student
- Quản lý Class
- Quản lý Subscription
- Đăng ký Student vào Class với rule kiểm tra:
  - Class chưa full `max_students`
  - Student có subscription còn hạn và còn buổi (`used_sessions < total_sessions`)

Backend + frontend chạy trong `apps/web` (Next.js App Router).
SQL scripts nằm tại `apps/dbscripts`.

## 2. Database schema (tóm tắt)
- `parents(id, name, phone, email)`
- `students(id, name, dob, gender, current_grade, parent_id)`
- `classes(id, name, subject, day_of_week, time_slot, teacher_name, max_students)`
- `subscriptions(id, student_id, package_name, total_sessions, used_sessions, end_date)`
- `class_registrations(id, class_id, student_id, subscription_id)`

## 3. Setup local
### 3.1. Chuẩn bị PostgreSQL
Tạo database rồi chạy scripts:

```bash
psql "$DATABASE_URL" -f apps/dbscripts/000_schema.sql
psql "$DATABASE_URL" -f apps/dbscripts/001_seed.sql
```

Ví dụ `DATABASE_URL`:

```bash
postgresql://postgres:postgres@localhost:5432/teenup_lms
```

### 3.2. Chạy app
```bash
cd apps/web
npm install
npm run dev
```

Mặc định web chạy tại `http://localhost:3000`.

## 4. API endpoints chính
- `POST /api/parents`
- `GET /api/parents`
- `GET /api/parents/{id}`
- `POST /api/students`
- `GET /api/students`
- `GET /api/students/{id}`
- `POST /api/classes`
- `GET /api/classes`
- `GET /api/classes?day={weekday}`
- `POST /api/subscriptions`
- `GET /api/subscriptions/{id}`
- `POST /api/classes/{class_id}/register`

## 5. Seed data
Seed tối thiểu đã có sẵn trong `apps/dbscripts/001_seed.sql`:
- 1 parent
- 2 students
- 2 classes
- 1 active subscription
- 1 registration mẫu

## 6. UI usage
Trang chính `/` đã có:
- Form tạo Parent
- Form tạo Student
- Form tạo Class
- Form tạo Subscription
- Form register Student vào Class
- Bảng classes theo ngày trong tuần
