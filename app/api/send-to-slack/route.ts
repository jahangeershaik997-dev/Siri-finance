import { NextRequest, NextResponse } from "next/server";

/** Normalize reference consultant to env key (e.g. "General / Office" -> "GENERAL_OFFICE") */
function refToEnvKey(ref: string): string {
  return ref.trim().replace(/\s+/g, "_").replace(/\//g, "_").toUpperCase();
}

/** POST: send form data to Slack. Uses consultant-specific webhook when set (e.g. SLACK_WEBHOOK_URL_MOHAN). */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source = "form", data = {} } = body;

    const ref =
      (data["Reference Consultant"] ?? data["Reference Consultant (Whose client is this?)"]) as string | undefined;
    const refKey = ref ? refToEnvKey(ref) : null;
    const consultantWebhook =
      refKey && process.env[`SLACK_WEBHOOK_URL_${refKey}` as keyof typeof process.env];
    const webhookUrl = (typeof consultantWebhook === "string" ? consultantWebhook : null) || process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ ok: false, skipped: true, reason: "SLACK_WEBHOOK_URL not set" }, { status: 200 });
    }

    const entries = Object.entries(data).filter(([, v]) => v != null && v !== "");
    const text = entries.map(([k, v]) => `${k}: ${v}`).join("\n");
    const payload = {
      text: `*${source.toUpperCase()} submission*${ref ? ` (${ref})` : ""}\n\`\`\`\n${text || "(no data)"}\n\`\`\``,
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
