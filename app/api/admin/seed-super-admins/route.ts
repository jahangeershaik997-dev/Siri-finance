import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db/users";
import { SUPER_ADMIN_EMAILS, SUPER_ADMIN_DISPLAY_NAMES } from "@/lib/constants";

const SUPER_ADMIN_PASSWORD = "123456789";

/** Creates jahangeershaik997@gmail.com and malleshmuthyala5@gmail.com as admins with password 123456789. Call once after DB setup. */
export async function POST(request: Request) {
  const key = request.headers.get("x-seed-key") ?? (await request.json().catch(() => ({}))).seedKey;
  const envKey = process.env.SEED_SUPER_ADMINS_KEY;
  if (envKey && key !== envKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const created: string[] = [];
  for (const email of SUPER_ADMIN_EMAILS) {
    const existing = await getUserByEmail(email);
    if (existing) continue;
    const displayName = SUPER_ADMIN_DISPLAY_NAMES[email] ?? email.split("@")[0];
    const result = await createUser(email, SUPER_ADMIN_PASSWORD, "admin", true, displayName);
    if (result.ok) created.push(email);
    else return NextResponse.json({ error: result.error, created }, { status: 400 });
  }
  return NextResponse.json({ success: true, created, message: created.length ? "Super admins created. Login with these emails and password 123456789." : "Both super admins already exist." });
}
