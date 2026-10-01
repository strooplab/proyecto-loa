// lib/ratelimit.ts
import { query, getClient } from "@/lib/db"; // tu cliente actual (postgres.js, pg, drizzle, prisma, supabase-js...)

type RateLimitConfig = { limit: number; windowMs: number };

interface RateLimitRow {
  count: number;
  oldest: Date | null;
}

const CONFIGS = {
  contact: { limit: 2, windowMs: 5 * 60 * 1000 }, // 2 cada 5 min
  direct: { limit: 2, windowMs: 5 * 60 * 1000 }, // 2 cada 5 min
  checkout: { limit: 5, windowMs: 60 * 60 * 1000 }, // 5 por hora
} as const satisfies Record<string, RateLimitConfig>; // Fix: Tratamiento correcto de posibles undefined values

export type RateLimitType = keyof typeof CONFIGS;

export async function checkRateLimit(type: RateLimitType, identifier: string) {
  const config = CONFIGS[type];
  const key = `${type}:${identifier}`;
  const windowStart = new Date(Date.now() - config.windowMs);

  const client = await getClient();
  // Fix: Consulta el cliente y espera a que se realice la primera request para permitir la siguiente
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [key]);

    const { rows } = await client.query<RateLimitRow>(
      `SELECT count(*)::int AS count, min(created_at) AS oldest
     FROM rate_limit_hits
     WHERE key = $1 AND created_at > $2`,
      [key, windowStart],
    );

    const { count, oldest } = rows[0];

    if (count >= config.limit) {
      await client.query("COMMIT");
      const resetAt = new Date(oldest as Date).getTime() + config.windowMs;
      return { success: false, resetAt };
    }

    await client.query(`INSERT INTO rate_limit_hits (key) VALUES ($1)`, [key]);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }

  // Limpieza
  if (Math.random() < 0.01) {
    await query(`DELETE FROM rate_limit_hits WHERE created_at < now() - interval '24 hours'`);
  }

  return { success: true, resetAt: null };
}
