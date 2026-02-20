import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key") ?? request.headers.get("authorization")?.replace("Bearer ", "");
  const expectedKey = process.env.ADMIN_API_KEY ?? "sfs-admin-secret-key";
  if (apiKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    return NextResponse.json([]);
  }
  const raw = fs.readFileSync(LEADS_FILE, "utf-8");
  const leads = JSON.parse(raw);
  const csvHeader = [
    "referenceNumber",
    "timestamp",
    "source",
    "fullName",
    "mobileNumber",
    "email",
    "city",
    "loanType",
    "loanAmount",
    "employmentType",
    "status",
  ].join(",");
  const rows = leads.map((l: Record<string, unknown>) =>
    csvHeader.split(",").map((k) => `"${String(l[k] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  const csv = [csvHeader, ...rows].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=leads-export.csv",
    },
  });
}
