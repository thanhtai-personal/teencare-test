import { getDbPool } from "@/server/db";
import { jsonError, parsePositiveInt } from "@/server/http";

export const runtime = "nodejs";

interface StudentRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: StudentRouteContext) {
  const { id } = await context.params;
  const studentId = parsePositiveInt(id);

  if (!studentId) {
    return jsonError("Invalid student id.", 400);
  }

  try {
    const db = getDbPool();
    const result = await db.query(
      `SELECT s.id,
              s.name,
              s.dob,
              s.gender,
              s.current_grade,
              s.created_at,
              p.id AS parent_id,
              p.name AS parent_name,
              p.phone AS parent_phone,
              p.email AS parent_email
       FROM students s
       INNER JOIN parents p ON p.id = s.parent_id
       WHERE s.id = $1`,
      [studentId],
    );

    if (result.rowCount === 0) {
      return jsonError("Student not found.", 404);
    }

    const row = result.rows[0];

    return Response.json({
      data: {
        id: row.id,
        name: row.name,
        dob: row.dob,
        gender: row.gender,
        current_grade: row.current_grade,
        created_at: row.created_at,
        parent: {
          id: row.parent_id,
          name: row.parent_name,
          phone: row.parent_phone,
          email: row.parent_email,
        },
      },
    });
  } catch (error) {
    return jsonError("Failed to fetch student.", 500, (error as Error).message);
  }
}
