# Task hoàn thiện yêu cầu (theo `full-doc.md` + `requirement.md`)

## Mục tiêu
Đóng toàn bộ khoảng trống còn lại để đáp ứng đầy đủ yêu cầu backend, frontend, dữ liệu mẫu và vận hành.

## P0 - Bắt buộc hoàn thành

### 1. Bổ sung `start_date` cho bảng `subscriptions`
- [ ] Cập nhật `apps/dbscripts/000_schema.sql` thêm cột `start_date DATE NOT NULL`
- [ ] Cập nhật insert ở `apps/dbscripts/001_seed.sql` để có `start_date`
- [ ] Cập nhật validation/input schema và API `POST /api/subscriptions`
- [ ] Cập nhật README phần schema
Điều kiện đạt:
- [ ] Tạo mới subscription bắt buộc có `start_date`, dữ liệu seed chạy không lỗi

### 2. Thêm API `PATCH /api/subscriptions/{id}/use`
- [ ] Tạo route `apps/web/src/app/api/subscriptions/[id]/use/route.ts`
- [ ] Chỉ tăng `used_sessions` khi còn `< total_sessions`
- [ ] Trả `409` nếu đã dùng hết buổi
- [ ] Trả `404` nếu không tồn tại subscription
Điều kiện đạt:
- [ ] API tăng đúng 1 buổi mỗi lần gọi, không vượt `total_sessions`

### 3. Bổ sung check trùng lịch khi đăng ký lớp
- [ ] Cập nhật `POST /api/classes/{class_id}/register`
- [ ] Chặn đăng ký nếu student đã có lớp khác cùng `day_of_week` và `time_slot`
- [ ] Trả lỗi `409` với message rõ ràng
Điều kiện đạt:
- [ ] Không thể đăng ký 2 lớp cùng khung giờ trong cùng ngày cho 1 học sinh

### 4. Thêm API hủy đăng ký `DELETE /api/registrations/{id}`
- [ ] Tạo route `apps/web/src/app/api/registrations/[id]/route.ts`
- [ ] Tính mốc thời gian lớp học gần nhất từ `day_of_week + time_slot`
- [ ] Nếu hủy >24h: giảm `used_sessions` 1 buổi (không âm)
- [ ] Nếu hủy <=24h: xóa đăng ký, không hoàn buổi
- [ ] Xử lý transaction để tránh lệch dữ liệu
Điều kiện đạt:
- [ ] Rule hoàn buổi hoạt động đúng theo mốc 24h

### 5. Bổ sung Docker run path
- [ ] Tạo `apps/web/Dockerfile`
- [ ] Tạo `docker-compose.yml` ở root để chạy `web + postgres`
- [ ] Thêm env mẫu cho compose
Điều kiện đạt:
- [ ] `docker compose up` chạy được app và DB

## P1 - Cần hoàn thiện để nộp bài tốt hơn

### 6. Nâng seed data đạt chuẩn `full-doc.md`
- [ ] Nâng `apps/dbscripts/001_seed.sql` thành ít nhất: 2 parents, 3 students, 2-3 classes
- [ ] Có tối thiểu 1 subscription còn hiệu lực
Điều kiện đạt:
- [ ] Sau seed có đủ số lượng mẫu như checklist

### 7. Bổ sung ví dụ gọi API trong README
- [ ] Thêm mẫu `curl` cho các endpoint chính
- [ ] Thêm hướng dẫn thứ tự chạy demo flow
Điều kiện đạt:
- [ ] Người khác clone repo có thể test API theo README mà không phải đoán payload

### 8. Hoàn tất Việt hóa UI toàn bộ màn hình
- [ ] Dịch toàn bộ text hiển thị/placeholder/button/empty-state sang tiếng Việt
- [ ] Cập nhật `lang="vi"` trong `apps/web/src/app/layout.tsx`
- [ ] Kiểm tra lại các message lỗi/thành công từ UI
Điều kiện đạt:
- [ ] Không còn chuỗi tiếng Anh lộ ra trên UI chính

## Trình tự triển khai đề xuất
- [ ] Bước 1: Task 1 -> 2 -> 3 -> 4 (khóa logic nghiệp vụ)
- [ ] Bước 2: Task 6 (seed chuẩn)
- [ ] Bước 3: Task 5 (Docker)
- [ ] Bước 4: Task 7 -> 8 (docs + polish)
