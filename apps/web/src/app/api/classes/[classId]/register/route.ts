import { getDbPool } from "@/server/db";
import {
  formatZodError,
  getPgErrorCode,
  jsonError,
  parsePositiveInt,
  parseRequestBody,
} from "@/server/http";
import { classRegisterInputSchema } from "@/server/schemas";

export const runtime = "nodejs";

interface ClassRegisterContext {
  params: Promise<{ classId: string }>;
}

export async function POST(request: Request, context: ClassRegisterContext) {
  const { classId } = await context.params;
  const parsedClassId = parsePositiveInt(classId);

  if (!parsedClassId) {
    return jsonError("Invalid class id.", 400);
  }

  const body = await parseRequestBody(request);
  const parsedBody = classRegisterInputSchema.safeParse(body);

  if (!parsedBody.success) {
    return jsonError("Invalid register payload.", 400, formatZodError(parsedBody.error));
  }

  const db = getDbPool();
  const client = await db.connect();
  let committed = false;

  try {
    await client.query("BEGIN");

    const classResult = await client.query(
      `SELECT id, max_students
       FROM classes
       WHERE id = $1
       FOR UPDATE`,
      [parsedClassId],
    );

    if (classResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return jsonError("Class not found.", 404);
    }

    const studentId = parsedBody.data.student_id;

    const studentResult = await client.query(
      "SELECT id FROM students WHERE id = $1",
      [studentId],
    );
    if (studentResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return jsonError("Student not found.", 404);
    }

    const duplicateRegistration = await client.query(
      `SELECT id
       FROM class_registrations
       WHERE class_id = $1 AND student_id = $2`,
      [parsedClassId, studentId],
    );

    if (duplicateRegistration.rowCount > 0) {
      await client.query("ROLLBACK");
      return jsonError("Student already registered in this class.", 409);
    }

    const capacityResult = await client.query(
      `SELECT COUNT(*)::INT AS total
       FROM class_registrations
       WHERE class_id = $1`,
      [parsedClassId],
    );

    const registered = capacityResult.rows[0]?.total ?? 0;
    const maxStudents = classResult.rows[0].max_students as number;

    if (registered >= maxStudents) {
      await client.query("ROLLBACK");
      return jsonError("Class is full.", 409);
    }

    const subscriptionResult = await client.query(
      `SELECT id, total_sessions, used_sessions, end_date
       FROM subscriptions
       WHERE student_id = $1
         AND end_date >= CURRENT_DATE
         AND used_sessions < total_sessions
       ORDER BY end_date ASC, id ASC
       LIMIT 1
       FOR UPDATE`,
      [studentId],
    );

    if (subscriptionResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return jsonError(
        "Student does not have an active subscription with remaining sessions.",
        409,
      );
    }

    const subscriptionId = subscriptionResult.rows[0].id as number;

    const registrationResult = await client.query(
      `INSERT INTO class_registrations (class_id, student_id, subscription_id)
       VALUES ($1, $2, $3)
       RETURNING id, class_id, student_id, subscription_id, created_at`,
      [parsedClassId, studentId, subscriptionId],
    );

    const updatedSubscriptionResult = await client.query(
      `UPDATE subscriptions
       SET used_sessions = used_sessions + 1
       WHERE id = $1
       RETURNING id, student_id, package_name, total_sessions, used_sessions, end_date`,
      [subscriptionId],
    );

    await client.query("COMMIT");
    committed = true;

    return Response.json(
      {
        data: {
          registration: registrationResult.rows[0],
          subscription: updatedSubscriptionResult.rows[0],
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (!committed) {
      try {
        await client.query("ROLLBACK");
      } catch {
        // Ignore rollback errors here.
      }
    }

    if (getPgErrorCode(error) === "23505") {
      return jsonError("Student already registered in this class.", 409);
    }

    return jsonError("Failed to register class.", 500, (error as Error).message);
  } finally {
    client.release();
  }
}
