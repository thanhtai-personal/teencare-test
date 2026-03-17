import { getDbPool } from "@/server/db";
import {
  formatZodError,
  getPgErrorCode,
  jsonError,
  parseRequestBody,
} from "@/server/http";
import { subscriptionInputSchema } from "@/server/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await parseRequestBody(request);
  const parsed = subscriptionInputSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Dữ liệu gói học không hợp lệ.", 400, formatZodError(parsed.error));
  }

  try {
    const db = getDbPool();

    const student = await db.query("SELECT id FROM students WHERE id = $1", [parsed.data.student_id]);
    if (student.rowCount === 0) {
      return jsonError("Không tìm thấy học sinh.", 404);
    }

    const result = await db.query(
      `INSERT INTO subscriptions (student_id, package_name, total_sessions, used_sessions, end_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, student_id, package_name, total_sessions, used_sessions, end_date, created_at`,
      [
        parsed.data.student_id,
        parsed.data.package_name,
        parsed.data.total_sessions,
        parsed.data.used_sessions,
        parsed.data.end_date,
      ],
    );

    return Response.json({ data: result.rows[0] }, { status: 201 });
  } catch (error) {
    if (getPgErrorCode(error) === "23503") {
      return jsonError("student_id không hợp lệ.", 400);
    }

    return jsonError("Không thể tạo gói học.", 500, (error as Error).message);
  }
}
