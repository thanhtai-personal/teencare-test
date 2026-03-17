import { Pool } from "pg";

declare global {
  var __lmsPool: Pool | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
  });
}

export function getDbPool(): Pool {
  if (!global.__lmsPool) {
    global.__lmsPool = createPool();
  }

  return global.__lmsPool;
}
