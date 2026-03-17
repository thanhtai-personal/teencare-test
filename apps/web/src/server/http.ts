import { z } from "zod";

export function jsonError(message: string, status: number, details?: unknown): Response {
  return Response.json(
    {
      error: message,
      details,
    },
    { status },
  );
}

export async function parseRequestBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export function parsePositiveInt(value: string): number | null {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function formatZodError(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "body";
    return `${path}: ${issue.message}`;
  });
}

export function getPgErrorCode(error: unknown): string | undefined {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }

  return undefined;
}
