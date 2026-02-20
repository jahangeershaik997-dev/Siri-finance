import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

const SKIP_KEYS = new Set(["_subject", "_next", "_gotcha", "_captcha"]);

function toLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/Utm|Cibil|Fd|Lap|Nbfc|Api|Id|Url/gi, (m) => m.toUpperCase())
    .trim();
}

function toValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const apiKey = request.headers.get("x-api-key") || request.nextUrl.searchParams.get("key");
    const envKey = process.env.ADMIN_API_KEY;
    const allowedBySession = !!session?.user?.email;
    const allowedByKey = !envKey || apiKey === envKey;
    if (!allowedBySession && !allowedByKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const submission = body.submission ?? body;
    if (!submission || typeof submission !== "object") {
      return NextResponse.json(
        { error: "Body must include submission: { field1: value1, ... }" },
        { status: 400 }
      );
    }

    const entries = Object.entries(submission)
      .filter(([k]) => !SKIP_KEYS.has(k))
      .map(([k, v]) => ({ label: toLabel(k), value: toValue(v) }))
      .filter((e) => e.value !== "—" || e.label.toLowerCase().includes("email") || e.label.toLowerCase().includes("phone"));

    const tableRows = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "Field", bold: true })] })],
          }),
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true })] })],
          }),
        ],
      }),
      ...entries.map(
        (e) =>
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: e.label })] })],
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: e.value })] })],
              }),
            ],
          })
      ),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Form Submission – Siri Financial Services", bold: true })],
              heading: HeadingLevel.TITLE,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [new TextRun({ text: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) })],
              spacing: { after: 400 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
              },
              rows: tableRows,
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const filename = `SFS-Submission-${Date.now()}.docx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (e) {
    console.error("export-word error:", e);
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 });
  }
}
