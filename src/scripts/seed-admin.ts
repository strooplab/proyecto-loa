// @/scripts/seed-admin.ts

import dotenv from "dotenv";
import { Pool } from "pg";
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";

dotenv.config();

const pool = new Pool({
  // Esto no es para producción, es un script para pruebas en un entorno dev
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
const seedAuth = betterAuth({
  database: pool,
  emailAndPassword: { enabled: true }, // registro habilitado solo aquí
  plugins: [username()],
});

const { SEED_EMAIL, SEED_USERNAME, SEED_NAME, SEED_PASSWORD } = process.env;
if (!SEED_EMAIL || !SEED_USERNAME || !SEED_PASSWORD || !SEED_NAME)
  throw new Error("Faltan datos para el signUp");

const { rows } = await pool.query('select count(*)::int as n from "user"');
if (rows[0].n > 0) throw new Error("Ya existe un usuario.");

await seedAuth.api.signUpEmail({
  body: {
    email: SEED_EMAIL,
    password: SEED_PASSWORD,
    name: SEED_NAME,
    username: SEED_USERNAME,
  },
});
await pool.end(); // Cierre del pool
console.log("Admin creado.");
