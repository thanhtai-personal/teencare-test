import { z } from "zod";

export const dayOfWeekSchema = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be in YYYY-MM-DD format");

export const parentInputSchema = z.object({
  name: z.string().trim().min(1),
  phone: z.string().trim().min(3),
  email: z.string().trim().email(),
});

export const studentInputSchema = z.object({
  name: z.string().trim().min(1),
  dob: dateStringSchema,
  gender: z.string().trim().min(1),
  current_grade: z.string().trim().min(1),
  parent_id: z.coerce.number().int().positive(),
});

export const classInputSchema = z.object({
  name: z.string().trim().min(1),
  subject: z.string().trim().min(1),
  day_of_week: dayOfWeekSchema,
  time_slot: z.string().trim().min(1),
  teacher_name: z.string().trim().min(1),
  max_students: z.coerce.number().int().positive(),
});

export const subscriptionInputSchema = z
  .object({
    student_id: z.coerce.number().int().positive(),
    package_name: z.string().trim().min(1),
    total_sessions: z.coerce.number().int().positive(),
    used_sessions: z.coerce.number().int().min(0).default(0),
    end_date: dateStringSchema,
  })
  .refine((value) => value.used_sessions <= value.total_sessions, {
    message: "used_sessions must be <= total_sessions",
    path: ["used_sessions"],
  });

export const classRegisterInputSchema = z.object({
  student_id: z.coerce.number().int().positive(),
});
