import { NextResponse } from "next/server";
import { getUserByEmail, updatePasswordByEmail, isSuperAdmin } from "@/lib/db/users";

const SUPER_ADMIN_PASSWORD = "123456789";

/** Resets a super admin's password to 123456789. Use if login fails after seed. */
export async function POST(request: Request) {
  const key = request.headers.get("x-seed-key") ?? (await request.json().catch(() => ({}))).seedKey;
  const envKey = process.env.SEED_SUPER_ADMINS_KEY;
  if (envKey && key !== envKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !isSuperAdmin(email)) return NextResponse.json({ error: "Invalid or not a super admin email" }, { status: 400 });

  const user = await getUserByEmail(email);
  if (!user) return NextResponse.json({ error: "User not found. Run seed first." }, { status: 404 });

  const ok = await updatePasswordByEmail(email, SUPER_ADMIN_PASSWORD);
  if (!ok) return NextResponse.json({ error: "Update failed" }, { status: 500 });
  return NextResponse.json({ success: true, message: `Password for ${email} reset to 123456789. Try logging in again.` });
}
