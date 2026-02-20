import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createUser, listUsers, isSuperAdmin } from "@/lib/db/users";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSuperAdmin(session.user.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSuperAdmin(session.user.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const userRole = body.role === "admin" ? "admin" : "company";
  const approved = Boolean(body.approved);
  const display_name = typeof body.display_name === "string" ? body.display_name.trim() : undefined;
  if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: "Password at least 6 characters" }, { status: 400 });
  const result = await createUser(email, password, userRole, approved, display_name);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ success: true });
}
