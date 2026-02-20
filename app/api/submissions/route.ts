import { NextRequest, NextResponse } from "next/server";
import { createSubmission, type FormType } from "@/lib/db/submissions";

const ALLOWED_TYPES: FormType[] = ["apply", "contact", "hero", "get_info"];

/** Public API: save a form submission to Supabase. Called by site forms. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formType = typeof body.formType === "string" ? body.formType.toLowerCase().trim() : "";
    if (!ALLOWED_TYPES.includes(formType as FormType)) {
      return NextResponse.json(
        { error: "Invalid or missing formType. Use: apply, contact, hero, get_info" },
        { status: 400 }
      );
    }
    const data = body.data && typeof body.data === "object" ? body.data : body;
    const cleanData: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
      if (k === "formType") continue;
      cleanData[k] = v;
    }
    const result = await createSubmission(formType as FormType, cleanData);
    if (!result) return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    return NextResponse.json({ success: true, id: result.id });
  } catch (e) {
    console.error("POST /api/submissions:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
