export type LeadSource = "hero-form" | "apply-page" | "service-page";

export type LeadStatus =
  | "new"
  | "contacted"
  | "processing"
  | "approved"
  | "rejected"
  | "closed";

export interface LeadData {
  referenceNumber: string;
  timestamp: string;
  source: LeadSource;

  loanCategory?: string;
  loanType?: string;
  loanAmount?: string;
  loanTenure?: string;
  purpose?: string;
  existingLoans?: boolean;
  existingEMI?: number;
  existingLoansCount?: number;

  fullName?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  residentialAddress?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  aadhaarNumber?: string;
  panNumber?: string;

  employmentType?: string;
  companyName?: string;
  designation?: string;
  monthlyIncome?: string;
  salaryBank?: string;
  yearsInCurrentJob?: string;
  totalWorkExperience?: string;
  businessName?: string;
  businessType?: string;
  industry?: string;
  annualTurnover?: string;
  businessVintage?: string;
  gstRegistered?: string;
  itrFiled?: string;
  profession?: string;
  practiceName?: string;
  yearsOfPractice?: string;
  annualIncome?: string;
  courseName?: string;
  collegeUniversity?: string;
  courseDuration?: string;
  coApplicantName?: string;
  coApplicantIncome?: string;
  monthlyPension?: string;
  pensionBank?: string;

  cibilScore?: string;
  propertyOwned?: boolean;
  propertyType?: string;
  propertyLocation?: string;
  propertyValue?: string;

  preferredContactTime?: string;
  hearAboutUs?: string;
  referralCode?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  userAgent?: string;
  pageSource?: string;
  referrer?: string;

  status: LeadStatus;
  notes?: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  interestRate?: string;
  category: "loans" | "credit-cards" | "insurance" | "other";
  features?: string[];
  eligibility?: { criteria: string; salaried: string; selfEmployed: string }[];
  documents?: string[];
  faqs?: { q: string; a: string }[];
  relatedSlugs?: string[];
}
