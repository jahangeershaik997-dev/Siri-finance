import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    approved?: boolean;
    display_name?: string | null;
    isSuperAdmin?: boolean;
  }
  interface Session {
    user: User & {
      id?: string;
      role?: string;
      approved?: boolean;
      display_name?: string | null;
      isSuperAdmin?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    approved?: boolean;
    display_name?: string | null;
    isSuperAdmin?: boolean;
  }
}
