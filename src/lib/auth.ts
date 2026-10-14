// auth.ts
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { pool } from "@/lib/db";
import { nextCookies } from "better-auth/next-js"; // dev: Revisado, se mantiene

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
    disableSignUp: true, // Refactor: SignUp eliminado, el sistema esta pensado para tener un solo administrador
  },
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30, // Default
    }),
    nextCookies(), // dev: Revisado, se mantiene
  ],
});
