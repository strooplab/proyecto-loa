import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // lOCAL
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
