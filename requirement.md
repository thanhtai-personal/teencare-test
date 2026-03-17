1. Mô tả chung

Xây dựng một ứng dụng web mini cho phép:

Quản lý thông tin Phụ huynh và Học sinh

Quản lý danh sách Lớp học

Đăng ký một Học sinh vào một Lớp học

Quản lý gói học cơ bản của Học sinh

Ứng dụng không cần đầy đủ như một LMS hoàn chỉnh. Mục tiêu là đánh giá:

Tư duy thiết kế dữ liệu

Khả năng xây API cơ bản

Khả năng làm giao diện đơn giản để thao tác

Cấu trúc project rõ ràng, dễ chạy

2. Yêu cầu chi tiết
2.1. Database & Models

Thiết kế tối thiểu các bảng/collection sau:

Parents

id

name

phone

email

Students

id

name

dob

gender

current_grade

parent_id

Classes

id

name

subject

day_of_week

time_slot

teacher_name

max_students

Subscriptions

id

student_id

package_name

total_sessions

used_sessions

end_date

ClassRegistrations

id

class_id

student_id

2.2. API Endpoints

Cài đặt các route RESTful trả về JSON:

Parents

POST /api/parents – tạo phụ huynh

GET /api/parents – danh sách phụ huynh

Students

POST /api/students – tạo học sinh

GET /api/students – danh sách học sinh

GET /api/students/{id} – xem chi tiết học sinh, bao gồm thông tin phụ huynh

Classes

POST /api/classes – tạo lớp học

GET /api/classes – danh sách lớp học

GET /api/classes?day={weekday} – lọc lớp theo ngày

Subscriptions

POST /api/subscriptions – tạo gói học cho học sinh

GET /api/subscriptions/{id} – xem thông tin gói học

Class Registrations

POST /api/classes/{class_id}/register – đăng ký học sinh vào lớp

Khi đăng ký, chỉ cần kiểm tra 2 điều kiện:

Không cho phép đăng ký nếu lớp đã đủ max_students

Không cho phép đăng ký nếu học sinh không có gói học còn hạn hoặc đã dùng hết số buổi

2.3. Frontend

Yêu cầu tối thiểu:

Form tạo Parent

Form tạo Student

Danh sách Classes

Cho phép chọn một Student để đăng ký vào một Class

Giao diện đơn giản, dùng ReactJS hoặc NextJS

Không yêu cầu giao diện đẹp. Ưu tiên dễ thao tác và kết nối đúng API.

2.4. Dev setup

Không bắt buộc CI/CD đầy đủ.

Yêu cầu tối thiểu:

Có file README.md

Hướng dẫn cách chạy project local

Có dữ liệu mẫu seed đơn giản:

ít nhất 1 parent

2 students

2 classes

1 subscription còn hiệu lực

Docker là tùy chọn, không bắt buộc trong phiên bản 1 giờ.

3. Deliverables

Ứng viên nộp:

Source code backend + frontend

README.md ở thư mục root gồm:

cách chạy project

mô tả ngắn database schema

danh sách endpoint chính

dữ liệu mẫu seed