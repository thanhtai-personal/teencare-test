import { getDbPool } from "@/server/db";
import {
  formatZodError,
  jsonError,
  parseRequestBody,
} from "@/server/http";
import { classInputSchema, dayOfWeekSchema } from "@/server/schemas";

export const runtime = "nodejs";

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  if (day) {
    const dayParse = dayOfWeekSchema.safeParse(day);
    if (!dayParse.success) {
      return jsonError("Invalid day query.", 400, ["day must be Monday-Sunday"]);
    }
  }

  try {
    const db = getDbPool();
    const result = await db.query(
      `SELECT c.id,
              c.name,
              c.subject,
              c.day_of_week,
              c.time_slot,
              c.teacher_name,
              c.max_students,
              c.created_at,
              COUNT(r.id)::INT AS registered_students
       FROM classes c
       LEFT JOIN class_registrations r ON r.class_id = c.id
       WHERE ($1::TEXT IS NULL OR c.day_of_week = $1)
       GROUP BY c.id
       ORDER BY array_position($2::TEXT[], c.day_of_week), c.time_slot, c.id`,
      [day, dayOrder],
    );

    return Response.json({ data: result.rows });
  } catch (error) {
    return jsonError("Failed to fetch classes.", 500, (error as Error).message);
  }
}

export async function POST(request: Request) {
  const body = await parseRequestBody(request);
  const parsed = classInputSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid class payload.", 400, formatZodError(parsed.error));
  }

  try {
    const db = getDbPool();
    const result = await db.query(
      `INSERT INTO classes (name, subject, day_of_week, time_slot, teacher_name, max_students)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, subject, day_of_week, time_slot, teacher_name, max_students, created_at`,
      [
        parsed.data.name,
        parsed.data.subject,
        parsed.data.day_of_week,
        parsed.data.time_slot,
        parsed.data.teacher_name,
        parsed.data.max_students,
      ],
    );

    return Response.json({ data: result.rows[0] }, { status: 201 });
  } catch (error) {
    return jsonError("Failed to create class.", 500, (error as Error).message);
  }
}
