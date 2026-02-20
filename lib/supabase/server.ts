import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Server-only Supabase client (service role). Use for admin_users table. */
export function getSupabase() {
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key);
}

export type AdminUser = {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "company";
  approved: boolean;
  display_name: string | null;
  created_at: string;
};
