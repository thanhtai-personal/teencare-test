import { getDbPool } from "@/server/db";
import { jsonError, parsePositiveInt } from "@/server/http";

export const runtime = "nodejs";

interface SubscriptionRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: SubscriptionRouteContext) {
  const { id } = await context.params;
  const subscriptionId = parsePositiveInt(id);

  if (!subscriptionId) {
    return jsonError("Invalid subscription id.", 400);
  }

  try {
    const db = getDbPool();
    const result = await db.query(
      `SELECT sub.id,
              sub.student_id,
              s.name AS student_name,
              sub.package_name,
              sub.total_sessions,
              sub.used_sessions,
              (sub.total_sessions - sub.used_sessions) AS remaining_sessions,
              sub.end_date,
              sub.created_at
       FROM subscriptions sub
       INNER JOIN students s ON s.id = sub.student_id
       WHERE sub.id = $1`,
      [subscriptionId],
    );

    if (result.rowCount === 0) {
      return jsonError("Subscription not found.", 404);
    }

    return Response.json({ data: result.rows[0] });
  } catch (error) {
    return jsonError("Failed to fetch subscription.", 500, (error as Error).message);
  }
}
