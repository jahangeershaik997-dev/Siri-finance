import { NextRequest, NextResponse } from "next/server";

/**
 * Sends a text message to business WhatsApp number(s) using CallMeBot (free).
 * Each number must register separately: WhatsApp "I allow callmebot to send me messages" to CallMeBot.
 * Env: CALLMEBOT_API_KEY (+ WHATSAPP_PHONE), optional CALLMEBOT_API_KEY_2 (+ WHATSAPP_PHONE_2) for second number.
 */
const PHONE_1 = "917095899552"; // +91 7095899552
const PHONE_2 = "919000314625"; // +91 9000314625

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message : body.text;
    if (!message?.trim()) {
      return NextResponse.json({ success: false, error: "Missing message" }, { status: 400 });
    }

    const phone1 = process.env.WHATSAPP_PHONE || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || PHONE_1;
    const phone2 = process.env.WHATSAPP_PHONE_2 || PHONE_2;
    const key1 = process.env.CALLMEBOT_API_KEY;
    const key2 = process.env.CALLMEBOT_API_KEY_2;

    const targets: { phone: string; apikey: string }[] = [];
    if (key1) targets.push({ phone: phone1, apikey: key1 });
    if (key2) targets.push({ phone: phone2, apikey: key2 });

    if (targets.length === 0) {
      return NextResponse.json({ success: true, skipped: true, reason: "No CALLMEBOT_API_KEY(s) set" });
    }

    const encoded = encodeURIComponent(message.trim());
    const results = await Promise.allSettled(
      targets.map(({ phone, apikey }) =>
        fetch(
          `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encoded}&apikey=${apikey}`,
          { method: "GET" }
        )
      )
    );

    const failed = results.filter((r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok));
    if (failed.length > 0) {
      results.forEach((r, i) => {
        if (r.status === "rejected") console.error("CallMeBot error target", i, r.reason);
        else if (r.status === "fulfilled" && !r.value.ok) console.error("CallMeBot error target", i, r.value.status);
      });
      // Still return 200 if at least one succeeded
      const anyOk = results.some((r) => r.status === "fulfilled" && r.value.ok);
      return NextResponse.json({
        success: anyOk,
        partial: failed.length < results.length,
        error: anyOk ? undefined : "WhatsApp send failed",
      }, { status: anyOk ? 200 : 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("send-to-whatsapp error:", e);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
