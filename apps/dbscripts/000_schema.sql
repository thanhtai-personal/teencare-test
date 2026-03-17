-- TeenUp mini LMS schema

CREATE TABLE IF NOT EXISTS parents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  dob DATE NOT NULL,
  gender VARCHAR(30) NOT NULL,
  current_grade VARCHAR(50) NOT NULL,
  parent_id INTEGER NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  subject VARCHAR(120) NOT NULL,
  day_of_week VARCHAR(20) NOT NULL CHECK (
    day_of_week IN (
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    )
  ),
  time_slot VARCHAR(50) NOT NULL,
  teacher_name VARCHAR(150) NOT NULL,
  max_students INTEGER NOT NULL CHECK (max_students > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  package_name VARCHAR(150) NOT NULL,
  total_sessions INTEGER NOT NULL CHECK (total_sessions > 0),
  used_sessions INTEGER NOT NULL DEFAULT 0 CHECK (used_sessions >= 0),
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT subscriptions_used_not_exceed_total CHECK (used_sessions <= total_sessions)
);

CREATE TABLE IF NOT EXISTS class_registrations (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT class_registrations_unique UNIQUE (class_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students(parent_id);
CREATE INDEX IF NOT EXISTS idx_classes_day_of_week ON classes(day_of_week);
CREATE INDEX IF NOT EXISTS idx_subscriptions_student_id ON subscriptions(student_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);
CREATE INDEX IF NOT EXISTS idx_class_registrations_class_id ON class_registrations(class_id);
CREATE INDEX IF NOT EXISTS idx_class_registrations_student_id ON class_registrations(student_id);
