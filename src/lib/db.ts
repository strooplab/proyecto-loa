// @/lib/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ debug: true });
// Configuración de conexión
const databaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || "5432",
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

let pool: Pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    user: databaseConfig.user,
    host: databaseConfig.host,
    database: databaseConfig.database,
    password: databaseConfig.password || "",
    port: parseInt(databaseConfig.port || "5432"),
    ssl: databaseConfig.ssl,
    max: 20, // En producción este será el número máximo de clients
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  // En development se usa una variable global para que el pool no se reinicie en cada hotreload.
  const globalPgPool = globalThis as unknown as {
    __pgPool: Pool | undefined;
  };
  if (!globalPgPool.__pgPool) {
    globalPgPool.__pgPool = new Pool({
      user: databaseConfig.user,
      host: databaseConfig.host,
      database: databaseConfig.database,
      password: databaseConfig.password || "",
      port: parseInt(databaseConfig.port || "5432"),
      ssl: databaseConfig.ssl,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  pool = globalPgPool.__pgPool;
}

export const query = async <T = unknown[]>(text: string, params?: unknown[]): Promise<T[]> => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Cerrar el pool en test developing
export const closePool = async () => {
  await pool.end();
};

export { pool };
