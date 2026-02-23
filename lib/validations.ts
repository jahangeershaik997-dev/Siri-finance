import { z } from "zod";

const indianMobileRegex = /^[6-9]\d{9}$/;
const aadhaarRegex = /^\d{12}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const pincodeRegex = /^\d{6}$/;

export const heroFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z.string().regex(indianMobileRegex, "Enter valid 10-digit mobile number"),
  loanType: z.string().min(1, "Select loan type"),
  loanAmount: z.string().min(1, "Select loan amount"),
  city: z.string().min(1, "City is required").default("Hyderabad"),
});

export const contactFormSchema = z.object({
  referenceConsultant: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
});

const step1BaseSchema = z.object({
  loanCategory: z.enum(["loans", "credit-cards", "insurance"]),
  loanType: z.string().min(1, "Select loan type"),
  loanAmount: z.string().optional(),
  loanTenure: z.string().optional(),
  purpose: z.string().optional(),
  existingLoans: z.union([z.boolean(), z.literal("true"), z.literal("false")]).optional(),
  existingLoansCount: z.number().optional(),
  existingEMI: z.number().optional(),
});

export const step1Schema = step1BaseSchema.refine(
  (data) => {
    if (data.loanCategory === "loans" && !data.loanAmount) return false;
    return true;
  },
  { message: "Loan amount is required for loans", path: ["loanAmount"] }
);

export const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  mobileNumber: z.string().regex(indianMobileRegex, "Valid 10-digit mobile required"),
  whatsappSameAsMobile: z.boolean().optional(),
  whatsappNumber: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  residentialAddress: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().regex(pincodeRegex).optional().or(z.literal("")),
  aadhaarNumber: z.string().regex(aadhaarRegex).optional().or(z.literal("")),
  panNumber: z.string().regex(panRegex).optional().or(z.literal("")),
});

export const step3Schema = z.object({
  employmentType: z.string().min(1, "Select employment type"),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  monthlyIncome: z.string().optional(),
  salaryBank: z.string().optional(),
  yearsInCurrentJob: z.string().optional(),
  totalWorkExperience: z.string().optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  industry: z.string().optional(),
  annualTurnover: z.string().optional(),
  businessVintage: z.string().optional(),
  gstRegistered: z.string().optional(),
  itrFiled: z.string().optional(),
  profession: z.string().optional(),
  practiceName: z.string().optional(),
  yearsOfPractice: z.string().optional(),
  annualIncome: z.string().optional(),
  courseName: z.string().optional(),
  collegeUniversity: z.string().optional(),
  courseDuration: z.string().optional(),
  coApplicantName: z.string().optional(),
  coApplicantIncome: z.string().optional(),
  monthlyPension: z.string().optional(),
  pensionBank: z.string().optional(),
  cibilScore: z.string().min(1, "Select CIBIL/credit score range"),
  propertyOwned: z.union([z.boolean(), z.literal("true"), z.literal("false")]).optional(),
  propertyType: z.string().optional(),
  propertyLocation: z.string().optional(),
  propertyValue: z.string().optional(),
});

export const step4Schema = z.object({
  preferredContactTime: z.string().optional(),
  hearAboutUs: z.string().optional(),
  referralCode: z.string().optional(),
  consentContact: z.union([z.boolean(), z.string()]).refine((v) => v === true || v === "true" || v === "on", "You must agree to be contacted"),
  consentTerms: z.union([z.boolean(), z.string()]).refine((v) => v === true || v === "true" || v === "on", "You must agree to Terms & Privacy Policy"),
  consentSoftCheck: z.union([z.boolean(), z.literal("true")]).optional(),
});

export const applyFormSchema = step1BaseSchema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .refine(
    (data) => {
      if (data.loanCategory === "loans" && !data.loanAmount) return false;
      return true;
    },
    { message: "Loan amount is required for loans", path: ["loanAmount"] }
  );

export type HeroFormValues = z.infer<typeof heroFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
export type Step3Values = z.infer<typeof step3Schema>;
export type Step4Values = z.infer<typeof step4Schema>;
export type ApplyFormValues = z.infer<typeof applyFormSchema>;
