import { NextRequest, NextResponse } from "next/server";
import { generateReferenceNumber } from "@/lib/utils";
import type { LeadData } from "@/lib/types";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readLeads(): LeadData[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function appendLead(lead: LeadData) {
  const leads = readLeads();
  leads.push(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ref = generateReferenceNumber();
    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") ?? "";
    const referrer = request.headers.get("referer") ?? "";

    const lead: LeadData = {
      referenceNumber: ref,
      timestamp,
      source: (body.source as LeadData["source"]) ?? "apply-page",
      status: "new",

      loanCategory: body.loanCategory,
      loanType: body.loanType,
      loanAmount: body.loanAmount,
      loanTenure: body.loanTenure,
      purpose: body.purpose,
      existingLoans: body.existingLoans,
      existingEMI: body.existingEMI,
      existingLoansCount: body.existingLoansCount,

      fullName: body.fullName,
      mobileNumber: body.mobileNumber,
      whatsappNumber: body.whatsappNumber,
      email: body.email,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      maritalStatus: body.maritalStatus,
      residentialAddress: body.residentialAddress,
      city: body.city,
      state: body.state,
      pinCode: body.pinCode,
      aadhaarNumber: body.aadhaarNumber,
      panNumber: body.panNumber,

      employmentType: body.employmentType,
      companyName: body.companyName,
      designation: body.designation,
      monthlyIncome: body.monthlyIncome,
      salaryBank: body.salaryBank,
      yearsInCurrentJob: body.yearsInCurrentJob,
      totalWorkExperience: body.totalWorkExperience,
      businessName: body.businessName,
      businessType: body.businessType,
      industry: body.industry,
      annualTurnover: body.annualTurnover,
      businessVintage: body.businessVintage,
      gstRegistered: body.gstRegistered,
      itrFiled: body.itrFiled,
      profession: body.profession,
      practiceName: body.practiceName,
      yearsOfPractice: body.yearsOfPractice,
      annualIncome: body.annualIncome,
      courseName: body.courseName,
      collegeUniversity: body.collegeUniversity,
      courseDuration: body.courseDuration,
      coApplicantName: body.coApplicantName,
      coApplicantIncome: body.coApplicantIncome,
      monthlyPension: body.monthlyPension,
      pensionBank: body.pensionBank,

      cibilScore: body.cibilScore,
      propertyOwned: body.propertyOwned,
      propertyType: body.propertyType,
      propertyLocation: body.propertyLocation,
      propertyValue: body.propertyValue,

      preferredContactTime: body.preferredContactTime,
      hearAboutUs: body.hearAboutUs,
      referralCode: body.referralCode,

      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      userAgent,
      pageSource: body.pageSource,
      referrer,
    };

    appendLead(lead);
    return NextResponse.json({ success: true, referenceNumber: ref });
  } catch (e) {
    console.error("Leads API error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
