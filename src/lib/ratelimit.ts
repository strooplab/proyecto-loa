// lib/ratelimit.ts
import { query } from "@/lib/db"; // tu cliente actual (postgres.js, pg, drizzle, prisma, supabase-js...)

type RateLimitConfig = { limit: number; windowMs: number };

interface RateLimitRow {
  count: number;
  oldest: Date | null;
}

const CONFIGS: Record<string, RateLimitConfig> = {
  contact: { limit: 1, windowMs: 5 * 60 * 1000 }, // 1 cada 5 min
  direct: { limit: 1, windowMs: 5 * 60 * 1000 }, // 1 cada 5 min
  checkout: { limit: 5, windowMs: 60 * 60 * 1000 }, // 5 por hora
};

export async function checkRateLimit(type: keyof typeof CONFIGS, identifier: string) {
  const config = CONFIGS[type];
  const key = `${type}:${identifier}`;
  const windowStart = new Date(Date.now() - config.windowMs);

  const rows = await query<RateLimitRow>(
    `SELECT count(*)::int AS count, min(created_at) AS oldest
     FROM rate_limit_hits
     WHERE key = $1 AND created_at > $2`,
    [key, windowStart],
  );

  const { count, oldest } = rows[0];

  if (count >= config.limit) {
    const resetAt = new Date(oldest as Date).getTime() + config.windowMs;
    return { success: false, resetAt };
  }

  await query(`INSERT INTO rate_limit_hits (key) VALUES ($1)`, [key]);

  // Limpieza
  if (Math.random() < 0.01) {
    await query(`DELETE FROM rate_limit_hits WHERE created_at < now() - interval '24 hours'`);
  }

  return { success: true, resetAt: null };
}
