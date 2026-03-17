import { getDbPool } from "@/server/db";
import {
  formatZodError,
  getPgErrorCode,
  jsonError,
  parseRequestBody,
} from "@/server/http";
import { parentInputSchema } from "@/server/schemas";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = getDbPool();
    const result = await db.query(
      `SELECT id, name, phone, email, created_at
       FROM parents
       ORDER BY id ASC`,
    );

    return Response.json({ data: result.rows });
  } catch (error) {
    return jsonError("Không thể tải danh sách phụ huynh.", 500, (error as Error).message);
  }
}

export async function POST(request: Request) {
  const body = await parseRequestBody(request);
  const parsed = parentInputSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Dữ liệu phụ huynh không hợp lệ.", 400, formatZodError(parsed.error));
  }

  try {
    const db = getDbPool();
    const result = await db.query(
      `INSERT INTO parents (name, phone, email)
       VALUES ($1, $2, $3)
       RETURNING id, name, phone, email, created_at`,
      [parsed.data.name, parsed.data.phone, parsed.data.email],
    );

    return Response.json({ data: result.rows[0] }, { status: 201 });
  } catch (error) {
    if (getPgErrorCode(error) === "23505") {
      return jsonError("Email phụ huynh đã tồn tại.", 409);
    }

    return jsonError("Không thể tạo phụ huynh.", 500, (error as Error).message);
  }
}
