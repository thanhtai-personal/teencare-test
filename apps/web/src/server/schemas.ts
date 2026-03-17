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
  .regex(/^\d{4}-\d{2}-\d{2}$/, "phải đúng định dạng YYYY-MM-DD");

export const parentInputSchema = z.object({
  name: z.string().trim().min(1, "không được để trống"),
  phone: z.string().trim().min(3, "phải có ít nhất 3 ký tự"),
  email: z.string().trim().email("email không hợp lệ"),
});

export const studentInputSchema = z.object({
  name: z.string().trim().min(1, "không được để trống"),
  dob: dateStringSchema,
  gender: z.string().trim().min(1, "không được để trống"),
  current_grade: z.string().trim().min(1, "không được để trống"),
  parent_id: z.coerce.number().int().positive("phải là số nguyên dương"),
});

export const classInputSchema = z.object({
  name: z.string().trim().min(1, "không được để trống"),
  subject: z.string().trim().min(1, "không được để trống"),
  day_of_week: dayOfWeekSchema,
  time_slot: z.string().trim().min(1, "không được để trống"),
  teacher_name: z.string().trim().min(1, "không được để trống"),
  max_students: z.coerce.number().int().positive("phải là số nguyên dương"),
});

export const subscriptionInputSchema = z
  .object({
    student_id: z.coerce.number().int().positive("phải là số nguyên dương"),
    package_name: z.string().trim().min(1, "không được để trống"),
    total_sessions: z.coerce.number().int().positive("phải là số nguyên dương"),
    used_sessions: z.coerce.number().int().min(0, "không được âm").default(0),
    end_date: dateStringSchema,
  })
  .refine((value) => value.used_sessions <= value.total_sessions, {
    message: "used_sessions phải nhỏ hơn hoặc bằng total_sessions",
    path: ["used_sessions"],
  });

export const classRegisterInputSchema = z.object({
  student_id: z.coerce.number().int().positive("phải là số nguyên dương"),
});
