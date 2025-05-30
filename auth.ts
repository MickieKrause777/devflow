import Google from "@auth/core/providers/google";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
export const { handlers, signOut, signIn, auth } = NextAuth({
  providers: [GitHub, Google],
});
