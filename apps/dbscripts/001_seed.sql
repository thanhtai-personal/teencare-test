-- Seed data (minimum requirement)

INSERT INTO parents (id, name, phone, email)
VALUES
  (1, 'Nguyen Van A', '0901000001', 'parent1@example.com')
ON CONFLICT (id) DO UPDATE
SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email;

INSERT INTO students (id, name, dob, gender, current_grade, parent_id)
VALUES
  (1, 'Tran Minh Anh', '2012-05-17', 'female', 'Grade 7', 1),
  (2, 'Tran Hoang Nam', '2011-09-02', 'male', 'Grade 8', 1)
ON CONFLICT (id) DO UPDATE
SET
  name = EXCLUDED.name,
  dob = EXCLUDED.dob,
  gender = EXCLUDED.gender,
  current_grade = EXCLUDED.current_grade,
  parent_id = EXCLUDED.parent_id;

INSERT INTO classes (id, name, subject, day_of_week, time_slot, teacher_name, max_students)
VALUES
  (1, 'Math Fundamentals', 'Mathematics', 'Monday', '18:00-19:30', 'Ms. Linh', 20),
  (2, 'English Conversation', 'English', 'Wednesday', '19:00-20:30', 'Mr. David', 15)
ON CONFLICT (id) DO UPDATE
SET
  name = EXCLUDED.name,
  subject = EXCLUDED.subject,
  day_of_week = EXCLUDED.day_of_week,
  time_slot = EXCLUDED.time_slot,
  teacher_name = EXCLUDED.teacher_name,
  max_students = EXCLUDED.max_students;

INSERT INTO subscriptions (id, student_id, package_name, total_sessions, used_sessions, end_date)
VALUES
  (1, 1, 'Starter 12 Sessions', 12, 1, CURRENT_DATE + INTERVAL '60 days')
ON CONFLICT (id) DO UPDATE
SET
  student_id = EXCLUDED.student_id,
  package_name = EXCLUDED.package_name,
  total_sessions = EXCLUDED.total_sessions,
  used_sessions = EXCLUDED.used_sessions,
  end_date = EXCLUDED.end_date;

INSERT INTO class_registrations (id, class_id, student_id, subscription_id)
VALUES
  (1, 1, 1, 1)
ON CONFLICT (id) DO UPDATE
SET
  class_id = EXCLUDED.class_id,
  student_id = EXCLUDED.student_id,
  subscription_id = EXCLUDED.subscription_id;

SELECT setval('parents_id_seq', COALESCE((SELECT MAX(id) FROM parents), 1), TRUE);
SELECT setval('students_id_seq', COALESCE((SELECT MAX(id) FROM students), 1), TRUE);
SELECT setval('classes_id_seq', COALESCE((SELECT MAX(id) FROM classes), 1), TRUE);
SELECT setval('subscriptions_id_seq', COALESCE((SELECT MAX(id) FROM subscriptions), 1), TRUE);
SELECT setval('class_registrations_id_seq', COALESCE((SELECT MAX(id) FROM class_registrations), 1), TRUE);
