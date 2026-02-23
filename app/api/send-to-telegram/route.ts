import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org";
const MAX_MESSAGE_LENGTH = 4096;

/** Chunk text for Telegram message limit */
function chunkText(text: string, maxLen: number = MAX_MESSAGE_LENGTH): string[] {
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    const slice = remaining.slice(0, maxLen);
    const lastNewline = slice.lastIndexOf("\n");
    const splitAt = lastNewline > maxLen / 2 ? lastNewline + 1 : maxLen;
    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }
  return chunks;
}

/**
 * POST: send form data to Telegram as text.
 * Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (your chat/channel ID).
 * Body: { source?: string, data?: Record<string, unknown> } or { message?: string }.
 */
export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, skipped: true, reason: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set" },
      { status: 200 }
    );
  }

  try {
    const body = await request.json();
    const { source = "form", data, message: rawMessage } = body;

    let text: string;
    if (typeof rawMessage === "string" && rawMessage.length > 0) {
      text = rawMessage;
    } else {
      const entries = Object.entries(data ?? {}).filter(
        ([, v]) => v != null && String(v).trim() !== ""
      );
      const lines = entries.map(([k, v]) => `${k}: ${v}`);
      text = `📋 ${String(source).toUpperCase()} submission\n\n${lines.join("\n") || "(no data)"}`;
    }

    const chunks = chunkText(text);
    const url = `${TELEGRAM_API}/bot${token}/sendMessage`;

    for (let i = 0; i < chunks.length; i++) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: chunks[i],
          disable_web_page_preview: true,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return NextResponse.json(
          { ok: false, error: err, chunk: i + 1 },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
