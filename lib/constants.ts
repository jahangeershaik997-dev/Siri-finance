export const COMPANY = {
  name: "Siri Financial Services",
  shortName: "SFS",
  phone: "7095899552",
  whatsapp: "917095899552",
  email: "info@sirifinancialservices.com",
  address:
    "Surekha Chambers, 2nd floor, 204A, Lalbanglow Road, Ameerpet, Hyderabad - 500016",
  addressShort: "Surekha Chambers, 2nd floor, 204A, Lalbanglow Road, Ameerpet, Hyd - 500016",
  hours: "Mon-Sat 9:30 AM - 6:30 PM",
  contactPerson: "M. Mallesh",
  mapCoords: { lat: 17.4375, lng: 78.4483 },
};

export const BANKS_PARTNERS = [
  "SBI",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra",
  "Yes Bank",
  "IndusInd Bank",
  "Federal Bank",
  "Bajaj Finserv",
  "Tata Capital",
  "L&T Finance",
  "Muthoot Finance",
  "Manappuram",
  "IDFC First",
  "PNB",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank",
];

export const LOAN_TYPE_SLUGS = [
  "personal-loan",
  "home-loan",
  "home-extension-loan",
  "home-renovation-loan",
  "plot-loan",
  "mortgage-loan",
  "business-loan",
  "msme-loan",
  "working-capital-loan",
  "startup-loan",
  "construction-loan",
  "project-finance",
  "car-loan",
  "two-wheeler-loan",
  "commercial-vehicle-loan",
  "education-loan",
  "gold-loan",
  "loan-against-fd",
  "loan-against-securities",
  "loan-against-insurance",
  "agriculture-loan",
  "doctor-loan",
  "govt-employee-loan",
  "pensioner-loan",
  "balance-transfer-home",
  "balance-transfer-personal",
  "topup-loan",
  "overdraft",
  "credit-card",
  "health-insurance",
  "life-insurance",
  "general-insurance",
  "motor-insurance",
  "private-finance",
  "other",
] as const;

export const HERO_LOAN_TYPES = [
  "Personal Loan",
  "Home Loan / Housing Loan",
  "Home Extension Loan",
  "Home Renovation Loan",
  "Plot Purchase Loan",
  "Mortgage Loan / Loan Against Property (LAP)",
  "Business Loan",
  "MSME Loan",
  "Working Capital Loan",
  "Startup Loan",
  "Construction Loan",
  "Project Finance",
  "Car Loan / Auto Loan",
  "Two Wheeler Loan",
  "Commercial Vehicle Loan",
  "Education Loan",
  "Gold Loan",
  "Loan Against Fixed Deposit",
  "Loan Against Securities",
  "Loan Against Insurance Policy",
  "Agriculture Loan / Crop Loan",
  "Doctor / Professional Loan",
  "Government Employee Loan",
  "Pensioner Loan",
  "Balance Transfer (Home Loan)",
  "Balance Transfer (Personal Loan)",
  "Top-Up Loan",
  "Overdraft Facility",
  "Credit Card",
  "Health Insurance",
  "Life Insurance",
  "General Insurance",
  "Motor Insurance",
  "Other / Not Sure",
];

export const LOAN_AMOUNT_OPTIONS = [
  "Below ₹1 Lakh",
  "₹1-5 Lakhs",
  "₹5-15 Lakhs",
  "₹15-30 Lakhs",
  "₹30-50 Lakhs",
  "₹50L-1 Crore",
  "₹1-3 Crore",
  "₹3-5 Crore",
  "Above ₹5 Crore",
];

export const TENURE_OPTIONS = [
  "6 Months",
  "1 Year",
  "2 Years",
  "3 Years",
  "5 Years",
  "7 Years",
  "10 Years",
  "15 Years",
  "20 Years",
  "25 Years",
  "30 Years",
  "Not Sure / Suggest Best Option",
];

export const APPLY_LOAN_CATEGORIES = [
  { value: "loans", label: "Loans", icon: "🏦" },
  { value: "credit-cards", label: "Credit Cards", icon: "💳" },
  { value: "insurance", label: "Insurance", icon: "🛡️" },
] as const;

export const APPLY_LOAN_TYPES_LOANS: { group: string; options: { value: string; label: string }[] }[] = [
  {
    group: "Personal & Consumer Loans",
    options: [
      { value: "Personal Loan", label: "Personal Loan" },
      { value: "Gold Loan", label: "Gold Loan" },
      { value: "Loan Against Fixed Deposit", label: "Loan Against Fixed Deposit" },
      { value: "Loan Against Securities", label: "Loan Against Securities" },
      { value: "Loan Against Insurance Policy", label: "Loan Against Insurance Policy" },
    ],
  },
  {
    group: "Home & Property Loans",
    options: [
      { value: "Home Loan / Housing Loan", label: "Home Loan / Housing Loan" },
      { value: "Home Extension Loan", label: "Home Extension Loan" },
      { value: "Home Renovation Loan", label: "Home Renovation Loan" },
      { value: "Plot Purchase Loan", label: "Plot Purchase Loan" },
      { value: "Mortgage Loan / Loan Against Property (LAP)", label: "Mortgage Loan / Loan Against Property (LAP)" },
      { value: "Balance Transfer - Home Loan", label: "Balance Transfer - Home Loan" },
      { value: "Top-Up Loan on Home Loan", label: "Top-Up Loan on Home Loan" },
    ],
  },
  {
    group: "Business & Commercial Loans",
    options: [
      { value: "Business Loan (Unsecured)", label: "Business Loan (Unsecured)" },
      { value: "MSME Loan", label: "MSME Loan" },
      { value: "Working Capital Loan", label: "Working Capital Loan" },
      { value: "Startup Loan", label: "Startup Loan" },
      { value: "Overdraft Facility", label: "Overdraft Facility" },
      { value: "Machinery / Equipment Loan", label: "Machinery / Equipment Loan" },
      { value: "Shop / Office Purchase Loan", label: "Shop / Office Purchase Loan" },
    ],
  },
  {
    group: "Construction & Project Loans",
    options: [
      { value: "Construction Loan (Residential)", label: "Construction Loan (Residential)" },
      { value: "Construction Loan (Commercial)", label: "Construction Loan (Commercial)" },
      { value: "Project Finance", label: "Project Finance" },
      { value: "Builder / Developer Loan", label: "Builder / Developer Loan" },
    ],
  },
  {
    group: "Vehicle Loans",
    options: [
      { value: "New Car Loan", label: "New Car Loan" },
      { value: "Used / Second-Hand Car Loan", label: "Used / Second-Hand Car Loan" },
      { value: "Two Wheeler Loan", label: "Two Wheeler Loan" },
      { value: "Commercial Vehicle Loan", label: "Commercial Vehicle Loan" },
      { value: "Construction Equipment Loan", label: "Construction Equipment Loan" },
    ],
  },
  {
    group: "Education & Professional Loans",
    options: [
      { value: "Education Loan (India)", label: "Education Loan (India)" },
      { value: "Education Loan (Abroad)", label: "Education Loan (Abroad)" },
      { value: "Doctor / Professional Loan", label: "Doctor / Professional Loan" },
      { value: "CA / Lawyer Professional Loan", label: "CA / Lawyer Professional Loan" },
    ],
  },
  {
    group: "Special Category Loans",
    options: [
      { value: "Government Employee Loan", label: "Government Employee Loan" },
      { value: "Pensioner Loan", label: "Pensioner Loan" },
      { value: "Agriculture Loan / Crop Loan", label: "Agriculture Loan / Crop Loan" },
      { value: "Balance Transfer - Personal Loan", label: "Balance Transfer - Personal Loan" },
      { value: "Private Finance", label: "Private Finance" },
    ],
  },
];

export const APPLY_LOAN_TYPES_CREDIT_CARDS = [
  "SBI Credit Card",
  "HDFC Credit Card",
  "ICICI Credit Card",
  "Axis Bank Credit Card",
  "Kotak Credit Card",
  "Yes Bank Credit Card",
  "IndusInd Credit Card",
  "RBL Credit Card",
  "AU Small Finance Bank Credit Card",
  "Other / Best Available",
];

export const APPLY_LOAN_TYPES_INSURANCE = [
  "Term Life Insurance",
  "Health Insurance (Individual)",
  "Health Insurance (Family Floater)",
  "Motor Insurance (Car)",
  "Motor Insurance (Two Wheeler)",
  "Travel Insurance",
  "Home Insurance",
  "Business / Shop Insurance",
  "Other Insurance",
];

export const MONTHLY_SALARY_OPTIONS = [
  "Below ₹15,000",
  "₹15,000 - ₹25,000",
  "₹25,000 - ₹35,000",
  "₹35,000 - ₹50,000",
  "₹50,000 - ₹75,000",
  "₹75,000 - ₹1,00,000",
  "₹1,00,000 - ₹1,50,000",
  "₹1,50,000 - ₹2,50,000",
  "₹2,50,000 - ₹5,00,000",
  "Above ₹5,00,000",
];

export const SALARY_BANKS = [
  "SBI",
  "HDFC",
  "ICICI",
  "Axis",
  "Kotak",
  "Yes Bank",
  "IndusInd",
  "PNB",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank",
  "IDFC First",
  "Federal Bank",
  "Other",
];

export const EXPERIENCE_OPTIONS = [
  "Less than 6 months",
  "6 months - 1 year",
  "1-2 years",
  "2-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

export const BUSINESS_TYPE_OPTIONS = [
  "Proprietorship",
  "Partnership",
  "LLP",
  "Pvt Ltd",
  "Public Ltd",
  "Other",
];

export const INDUSTRY_OPTIONS = [
  "Retail",
  "Manufacturing",
  "Trading",
  "Services",
  "IT",
  "Real Estate",
  "Construction",
  "Transport",
  "Healthcare",
  "Education",
  "Food & Restaurant",
  "Agriculture",
  "Other",
];

export const TURNOVER_OPTIONS = [
  "Below ₹5 Lakhs",
  "₹5 - ₹10 Lakhs",
  "₹10 - ₹25 Lakhs",
  "₹25 - ₹50 Lakhs",
  "₹50 Lakhs - ₹1 Crore",
  "₹1 - ₹5 Crore",
  "₹5 - ₹10 Crore",
  "₹10 - ₹25 Crore",
  "Above ₹25 Crore",
];

export const EMPLOYMENT_TYPES = [
  { value: "salaried", label: "Salaried (Private Company)", icon: "💼" },
  { value: "government", label: "Government Employee", icon: "🏛️" },
  { value: "self-employed-business", label: "Self-Employed Business", icon: "🏢" },
  { value: "self-employed-professional", label: "Self-Employed Professional (Doctor, CA, Lawyer)", icon: "👨‍⚕️" },
  { value: "agriculture", label: "Agriculture / Farmer", icon: "🌾" },
  { value: "student", label: "Student", icon: "🎓" },
  { value: "retired", label: "Retired / Pensioner", icon: "👴" },
  { value: "homemaker", label: "Homemaker", icon: "🏠" },
  { value: "other", label: "Other", icon: "❓" },
];

export const CIBIL_OPTIONS = [
  "800+ (Excellent)",
  "750-800 (Very Good)",
  "700-750 (Good)",
  "650-700 (Fair)",
  "600-650 (Below Average)",
  "Below 600 (Poor)",
  "No Credit History / New to Credit",
  "Don't Know My Score",
  "CIBIL Issues / Defaults / Written Off",
  "Not Applicable",
];

export const PREFERRED_CONTACT_TIME = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 3 PM)",
  "Evening (3 PM - 6 PM)",
  "Anytime During Business Hours",
  "After 6 PM",
];

export const HEAR_ABOUT_US = [
  "Google Search",
  "WhatsApp",
  "Facebook / Instagram",
  "Friend / Family Referral",
  "Office Walk-in",
  "Pamphlet / Flyer",
  "Other",
];

export const LOAN_AMOUNT_RANGES: Record<string, { min: number; max: number }> = {
  "Personal Loan": { min: 50000, max: 5000000 },
  "Home Loan / Housing Loan": { min: 500000, max: 10000000 },
  "Business Loan (Unsecured)": { min: 100000, max: 50000000 },
  "MSME Loan": { min: 100000, max: 50000000 },
  "New Car Loan": { min: 100000, max: 10000000 },
  "Used / Second-Hand Car Loan": { min: 100000, max: 5000000 },
  "Two Wheeler Loan": { min: 20000, max: 500000 },
  "Education Loan (India)": { min: 100000, max: 20000000 },
  "Education Loan (Abroad)": { min: 500000, max: 50000000 },
  "Gold Loan": { min: 10000, max: 10000000 },
  "Mortgage Loan / Loan Against Property (LAP)": { min: 500000, max: 50000000 },
  "Construction Loan (Residential)": { min: 500000, max: 50000000 },
  "Construction Loan (Commercial)": { min: 1000000, max: 50000000 },
  "Project Finance": { min: 10000000, max: 100000000 },
  default: { min: 50000, max: 5000000 },
};

export function getLoanAmountRange(loanType: string): { min: number; max: number } {
  return LOAN_AMOUNT_RANGES[loanType] ?? LOAN_AMOUNT_RANGES.default;
}

export const PROFESSION_OPTIONS = [
  "Doctor",
  "Chartered Accountant",
  "Lawyer/Advocate",
  "Architect",
  "Engineer",
  "Consultant",
  "Other",
];

export const DOCUMENT_CHECKLIST = [
  "Aadhaar Card",
  "PAN Card",
  "Last 6 Months Bank Statements",
  "Latest 3 Months Salary Slips",
  "Form 16 / ITR",
  "Address Proof (Utility Bill)",
  "Property Documents (for secured loans)",
  "Business Registration Certificate",
  "GST Certificate",
  "Passport Size Photos",
];

export const BEST_RATES = [
  { type: "Home Loan", rate: "8.35% p.a." },
  { type: "Personal Loan", rate: "10.49% p.a." },
  { type: "Business Loan", rate: "14% p.a." },
  { type: "Car Loan", rate: "8.5% p.a." },
  { type: "Gold Loan", rate: "7% p.a." },
  { type: "LAP/Mortgage", rate: "9.5% p.a." },
];

/** Map URL slug (?loanType=) to default category + loan type for Apply page */
export const SLUG_TO_LOAN_PRESET: Record<
  string,
  { category: "loans" | "credit-cards" | "insurance"; loanType: string }
> = {
  "personal-loan": { category: "loans", loanType: "Personal Loan" },
  "home-loan": { category: "loans", loanType: "Home Loan / Housing Loan" },
  "home-extension-loan": { category: "loans", loanType: "Home Extension Loan" },
  "home-renovation-loan": { category: "loans", loanType: "Home Renovation Loan" },
  "plot-loan": { category: "loans", loanType: "Plot Purchase Loan" },
  "mortgage-loan": { category: "loans", loanType: "Mortgage Loan / Loan Against Property (LAP)" },
  "business-loan": { category: "loans", loanType: "Business Loan (Unsecured)" },
  "msme-loan": { category: "loans", loanType: "MSME Loan" },
  "working-capital-loan": { category: "loans", loanType: "Working Capital Loan" },
  "startup-loan": { category: "loans", loanType: "Startup Loan" },
  "construction-loan": { category: "loans", loanType: "Construction Loan (Residential)" },
  "project-finance": { category: "loans", loanType: "Project Finance" },
  "car-loan": { category: "loans", loanType: "New Car Loan" },
  "two-wheeler-loan": { category: "loans", loanType: "Two Wheeler Loan" },
  "commercial-vehicle-loan": { category: "loans", loanType: "Commercial Vehicle Loan" },
  "education-loan": { category: "loans", loanType: "Education Loan (India)" },
  "gold-loan": { category: "loans", loanType: "Gold Loan" },
  "loan-against-fd": { category: "loans", loanType: "Loan Against Fixed Deposit" },
  "loan-against-securities": { category: "loans", loanType: "Loan Against Securities" },
  "loan-against-insurance": { category: "loans", loanType: "Loan Against Insurance Policy" },
  "agriculture-loan": { category: "loans", loanType: "Agriculture Loan / Crop Loan" },
  "doctor-loan": { category: "loans", loanType: "Doctor / Professional Loan" },
  "govt-employee-loan": { category: "loans", loanType: "Government Employee Loan" },
  "pensioner-loan": { category: "loans", loanType: "Pensioner Loan" },
  "balance-transfer-home": { category: "loans", loanType: "Balance Transfer - Home Loan" },
  "balance-transfer-personal": { category: "loans", loanType: "Balance Transfer - Personal Loan" },
  "topup-loan": { category: "loans", loanType: "Top-Up Loan on Home Loan" },
  "overdraft": { category: "loans", loanType: "Overdraft Facility" },
  "credit-card": { category: "credit-cards", loanType: "Other / Best Available" },
  "health-insurance": { category: "insurance", loanType: "Health Insurance (Individual)" },
  "life-insurance": { category: "insurance", loanType: "Term Life Insurance" },
  "general-insurance": { category: "insurance", loanType: "Home Insurance" },
  "motor-insurance": { category: "insurance", loanType: "Motor Insurance (Car)" },
  "private-finance": { category: "loans", loanType: "Private Finance" },
  other: { category: "loans", loanType: "Personal Loan" },
};
