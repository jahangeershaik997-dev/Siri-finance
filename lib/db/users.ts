import bcrypt from "bcryptjs";
import { getSupabase, type AdminUser } from "@/lib/supabase/server";
import { SUPER_ADMIN_EMAILS } from "@/lib/constants";

const TABLE = "admin_users";

export function isSuperAdmin(email: string): boolean {
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase().trim() as typeof SUPER_ADMIN_EMAILS[number]);
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .single();
  if (error || !data) return null;
  return data as AdminUser;
}

export async function verifyPassword(user: AdminUser, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password_hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function createUser(
  email: string,
  password: string,
  role: "admin" | "company",
  approved: boolean,
  display_name?: string | null
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  const existing = await getUserByEmail(email);
  if (existing) return { ok: false, error: "Email already registered" };
  const password_hash = await hashPassword(password);
  const { error } = await supabase.from(TABLE).insert({
    email: email.toLowerCase().trim(),
    password_hash,
    role,
    approved: approved ?? false,
    display_name: display_name?.trim() || null,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function setApproved(userId: string, approved: boolean): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).update({ approved }).eq("id", userId);
  return !error;
}

export async function updatePasswordByEmail(email: string, newPassword: string): Promise<boolean> {
  const supabase = getSupabase();
  const password_hash = await hashPassword(newPassword);
  const { error } = await supabase.from(TABLE).update({ password_hash }).eq("email", email.toLowerCase().trim());
  return !error;
}

export async function listUsers(): Promise<Array<{ id: string; email: string; role: string; approved: boolean; display_name: string | null; created_at: string }>> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, email, role, approved, display_name, created_at")
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data || []) as Array<{ id: string; email: string; role: string; approved: boolean; display_name: string | null; created_at: string }>;
}

export async function countUsers(): Promise<number> {
  const supabase = getSupabase();
  const { count, error } = await supabase.from(TABLE).select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}
