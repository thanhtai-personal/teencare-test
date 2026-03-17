import { getDbPool } from "@/server/db";
import { jsonError, parsePositiveInt } from "@/server/http";

export const runtime = "nodejs";

interface ParentRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: ParentRouteContext) {
  const { id } = await context.params;
  const parentId = parsePositiveInt(id);

  if (!parentId) {
    return jsonError("Invalid parent id.", 400);
  }

  try {
    const db = getDbPool();
    const result = await db.query(
      `SELECT id, name, phone, email, created_at
       FROM parents
       WHERE id = $1`,
      [parentId],
    );

    if (result.rowCount === 0) {
      return jsonError("Parent not found.", 404);
    }

    return Response.json({ data: result.rows[0] });
  } catch (error) {
    return jsonError("Failed to fetch parent.", 500, (error as Error).message);
  }
}
