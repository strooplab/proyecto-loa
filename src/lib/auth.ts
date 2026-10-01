// auth.ts
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { pool } from "@/lib/db"; // TEMPORAL: DB PG fuera de producción

export const auth = betterAuth({
  database: pool,
  // Por ahora es mejor crear las tablas de la DB con SQL directo - El .sql está en ./better-auth_migrations
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // 1 dia
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30, // Default de varias webapps que he visto
    }),
  ],
});
