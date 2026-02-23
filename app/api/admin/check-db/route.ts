import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";
import { getUserByEmail } from "@/lib/db/users";

/**
 * GET /api/admin/check-db – Check if Supabase is configured and admin_users table works.
 * Use this to debug "server error" on login.
 */
export async function GET() {
  const missing: string[] = [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length > 0) {
    return NextResponse.json({
      ok: false,
      error: "Missing env vars",
      missing,
      fix: "Add these in .env.local (local) or Vercel → Project → Settings → Environment Variables, then redeploy.",
    }, { status: 200 });
  }

  try {
    const supabase = getSupabase();
    const { count, error } = await supabase.from("admin_users").select("*", { count: "exact", head: true });
    if (error) {
      return NextResponse.json({
        ok: false,
        error: "Supabase table error",
        details: error.message,
        fix: "In Supabase Dashboard → SQL Editor, run the script in supabase/admin_users.sql to create the admin_users table.",
      }, { status: 200 });
    }

    const testEmail = "jahangeershaik997@gmail.com";
    const user = await getUserByEmail(testEmail);
    return NextResponse.json({
      ok: true,
      message: "Supabase is configured and admin_users table exists.",
      admin_users_count: count ?? 0,
      [testEmail]: user
        ? { exists: true, role: user.role, approved: user.approved, can_login: user.approved || user.role === "admin" }
        : "User NOT found – go to /admin/setup and click Create first admin (with ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD set in Vercel).",
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: "Exception",
      details: e instanceof Error ? e.message : String(e),
    }, { status: 200 });
  }
}
