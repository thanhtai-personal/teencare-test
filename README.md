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

## 7. Checklist đánh giá theo `full-doc.md` (cập nhật 2026-03-17)

### 7.1 Database & Models
- [x] `Parents(id, name, phone, email)`
- [x] `Students(id, name, dob, gender, current_grade, parent_id)`
- [x] `Classes(id, name, subject, day_of_week, time_slot, teacher_name, max_students)`
- [x] `ClassRegistrations(class_id, student_id)` (thực tế có thêm `id`, `subscription_id`)
- [ ] `Subscriptions` có đủ `start_date` + `end_date` theo đề (hiện mới có `end_date`)

### 7.2 API Endpoints
- [x] `POST /api/parents`
- [x] `GET /api/parents/{id}`
- [x] `POST /api/students`
- [x] `GET /api/students/{id}` (kèm thông tin parent)
- [x] `POST /api/classes`
- [x] `GET /api/classes?day={weekday}`
- [x] `POST /api/classes/{class_id}/register`
- [x] Check sĩ số `max_students` khi đăng ký lớp
- [x] Check subscription còn hạn + còn buổi khi đăng ký lớp
- [ ] Check trùng lịch cùng `day_of_week` + `time_slot` khi đăng ký lớp
- [ ] `DELETE /api/registrations/{id}` với rule hoàn buổi theo mốc 24h
- [x] `POST /api/subscriptions`
- [x] `GET /api/subscriptions/{id}`
- [ ] `PATCH /api/subscriptions/{id}/use`

### 7.3 Frontend
- [x] Form tạo Parent
- [x] Form tạo Student
- [x] Danh sách lớp theo tuần (7 ngày, hiển thị `time_slot` và giáo viên)
- [x] Cho phép đăng ký học sinh vào lớp từ UI
- [x] Giao diện đơn giản để thao tác API

### 7.4 DevOps & CI/CD
- [ ] Dockerfile cho backend/frontend
- [ ] `docker-compose.yml` chạy app + database
- [ ] Hướng dẫn chạy bằng Docker trong README

### 7.5 Deliverables
- [x] Có source code backend + frontend
- [x] Có mô tả schema trong README
- [x] Có danh sách endpoint chính trong README
- [ ] Có ví dụ truy vấn/curl cụ thể cho endpoint
- [ ] Seed đạt mức `>=2 parents, >=3 students, 2-3 classes` theo `full-doc.md` (hiện: 1 parent, 2 students, 2 classes)
