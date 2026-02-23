import { NextRequest, NextResponse } from "next/server";

/** POST: send form data to Slack webhook. Set SLACK_WEBHOOK_URL in Vercel env. */
export async function POST(request: NextRequest) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, skipped: true, reason: "SLACK_WEBHOOK_URL not set" }, { status: 200 });
  }

  try {
    const body = await request.json();
    const { source = "form", data = {} } = body;

    const entries = Object.entries(data).filter(([, v]) => v != null && v !== "");
    const text = entries.map(([k, v]) => `${k}: ${v}`).join("\n");
    const payload = {
      text: `*${source.toUpperCase()} submission*\n\`\`\`\n${text || "(no data)"}\n\`\`\``,
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
