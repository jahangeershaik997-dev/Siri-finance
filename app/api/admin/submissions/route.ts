import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/db/submissions";

/** List all form submissions (Supabase). Only for logged-in admin. */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await getSubmissions();
  return NextResponse.json(list);
}
