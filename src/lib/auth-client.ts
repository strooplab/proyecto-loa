import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [usernameClient()], // Para habilitar la opción de login con el usuario
});

export const { signIn, signOut, useSession, getSession } = authClient;
