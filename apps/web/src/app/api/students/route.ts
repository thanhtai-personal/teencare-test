import { getDbPool } from "@/server/db";
import {
  formatZodError,
  getPgErrorCode,
  jsonError,
  parseRequestBody,
} from "@/server/http";
import { studentInputSchema } from "@/server/schemas";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = getDbPool();
    const result = await db.query(
      `SELECT s.id,
              s.name,
              s.dob,
              s.gender,
              s.current_grade,
              s.parent_id,
              p.name AS parent_name,
              p.email AS parent_email,
              s.created_at
       FROM students s
       INNER JOIN parents p ON p.id = s.parent_id
       ORDER BY s.id ASC`,
    );

    return Response.json({ data: result.rows });
  } catch (error) {
    return jsonError("Failed to fetch students.", 500, (error as Error).message);
  }
}

export async function POST(request: Request) {
  const body = await parseRequestBody(request);
  const parsed = studentInputSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid student payload.", 400, formatZodError(parsed.error));
  }

  try {
    const db = getDbPool();

    const parent = await db.query("SELECT id FROM parents WHERE id = $1", [parsed.data.parent_id]);
    if (parent.rowCount === 0) {
      return jsonError("Parent not found.", 404);
    }

    const result = await db.query(
      `INSERT INTO students (name, dob, gender, current_grade, parent_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, dob, gender, current_grade, parent_id, created_at`,
      [
        parsed.data.name,
        parsed.data.dob,
        parsed.data.gender,
        parsed.data.current_grade,
        parsed.data.parent_id,
      ],
    );

    return Response.json({ data: result.rows[0] }, { status: 201 });
  } catch (error) {
    if (getPgErrorCode(error) === "23503") {
      return jsonError("Invalid parent_id.", 400);
    }

    return jsonError("Failed to create student.", 500, (error as Error).message);
  }
}
