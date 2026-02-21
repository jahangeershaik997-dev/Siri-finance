import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, verifyPassword, isSuperAdmin } from "@/lib/db/users";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await getUserByEmail(credentials.email);
        if (!user) return null;
        const valid = await verifyPassword(user, credentials.password);
        if (!valid) return null;
        // Only allow if approved OR role is admin (admins always have access)
        if (!user.approved && user.role !== "admin") return null;
        const superAdmin = isSuperAdmin(user.email);
        return {
          id: user.id,
          email: user.email,
          name: (user as { display_name?: string | null }).display_name || user.email,
          role: user.role,
          approved: user.approved,
          display_name: (user as { display_name?: string | null }).display_name ?? null,
          isSuperAdmin: superAdmin,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.approved = (user as { approved?: boolean }).approved;
        token.display_name = (user as { display_name?: string | null }).display_name;
        token.isSuperAdmin = (user as { isSuperAdmin?: boolean }).isSuperAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { approved?: boolean }).approved = token.approved as boolean;
        (session.user as { display_name?: string | null }).display_name = token.display_name as string | null;
        (session.user as { isSuperAdmin?: boolean }).isSuperAdmin = token.isSuperAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};
