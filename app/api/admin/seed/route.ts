import { NextResponse } from "next/server";
import { countUsers, createUser } from "@/lib/db/users";

export async function GET() {
  const n = await countUsers();
  if (n > 0) return NextResponse.json({ canSeed: false, error: "Users already exist" });
  const hasEnv = !!(process.env.ADMIN_SEED_EMAIL && process.env.ADMIN_SEED_PASSWORD);
  return NextResponse.json({ canSeed: hasEnv });
}

export async function POST() {
  const n = await countUsers();
  if (n > 0) return NextResponse.json({ error: "Users already exist" }, { status: 400 });
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) return NextResponse.json({ error: "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in env" }, { status: 400 });
  const result = await createUser(email, password, "admin", true);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ success: true });
}
