import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHmac } from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  return process.env.ADMIN_PASSWORD || process.env.ADMIN_API_KEY || "";
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function POST(request: NextRequest) {
  const secret = getSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "Admin login not configured. Set ADMIN_PASSWORD or ADMIN_API_KEY in env." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const password = body.password?.trim();
  if (password !== secret) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const payload = JSON.stringify({
    t: Date.now(),
    exp: Date.now() + MAX_AGE * 1000,
  });
  const signature = sign(payload, secret);
  const value = Buffer.from(payload, "utf8").toString("base64url") + "." + signature;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
