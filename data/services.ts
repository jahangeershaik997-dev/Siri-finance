import type { ServiceItem } from "@/lib/types";

export const servicesList: ServiceItem[] = [
  {
    slug: "personal-loan",
    title: "Personal Loans",
    shortTitle: "Personal Loans",
    description:
      "Get instant personal loans from ₹50,000 to ₹40,00,000 with minimal documentation. Salaried & self-employed both eligible. Quick approval and disbursal from top banks and NBFCs.",
    icon: "💰",
    interestRate: "From 10.49% p.a.",
    category: "loans",
    features: [
      "Loan amount from ₹50,000 to ₹40 lakhs",
      "Tenure 1 to 5 years",
      "Minimal documentation",
      "Quick disbursal within 48-72 hours",
      "Salaried and self-employed eligible",
      "No collateral required",
    ],
    eligibility: [
      { criteria: "Age", salaried: "21-58 years", selfEmployed: "25-65 years" },
      { criteria: "Income", salaried: "₹15,000+/month", selfEmployed: "₹2L+ annual" },
      { criteria: "Experience", salaried: "1+ year", selfEmployed: "3+ years" },
      { criteria: "CIBIL", salaried: "650+ preferred", selfEmployed: "650+ preferred" },
    ],
    documents: [
      "Aadhaar & PAN",
      "Last 6 months bank statements",
      "3 months salary slips",
      "Employment certificate",
    ],
    faqs: [
      {
        q: "What is the maximum personal loan amount?",
        a: "Depending on your income and CIBIL, you can get up to ₹40 lakhs from our partner banks.",
      },
      {
        q: "Can I get a personal loan with low CIBIL?",
        a: "Yes, we have tie-ups with NBFCs that consider applications with CIBIL issues. Contact us for options.",
      },
      {
        q: "How long does approval take?",
        a: "Typically 48-72 hours for document verification and sanction. Disbursal is quick once approved.",
      },
    ],
    relatedSlugs: ["gold-loan", "loan-against-fd", "balance-transfer-personal"],
  },
  {
    slug: "home-loan",
    title: "Home Loans / Housing Loans",
    shortTitle: "Home Loans",
    description:
      "Make your dream home a reality. Home purchase, construction, extension & renovation loans available at competitive rates from leading banks.",
    icon: "🏠",
    interestRate: "From 8.35% p.a.",
    category: "loans",
    features: [
      "Purchase, construction, extension, renovation",
      "Up to 90% of property value",
      "Tenure up to 30 years",
      "Balance transfer facility",
      "Top-up on existing home loans",
    ],
    eligibility: [
      { criteria: "Age", salaried: "21-58 years", selfEmployed: "25-65 years" },
      { criteria: "Income", salaried: "₹25,000+/month", selfEmployed: "₹3L+ annual" },
      { criteria: "Experience", salaried: "2+ years", selfEmployed: "3+ years" },
      { criteria: "CIBIL", salaried: "650+ preferred", selfEmployed: "650+ preferred" },
    ],
    documents: [
      "Aadhaar, PAN",
      "Property documents",
      "Income proof (ITR/salary slips)",
      "Bank statements",
    ],
    faqs: [
      {
        q: "What is the maximum loan-to-value (LTV)?",
        a: "Up to 90% for loans up to ₹30 lakh, 80% for higher amounts, subject to bank norms.",
      },
      {
        q: "Can I transfer my existing home loan?",
        a: "Yes, we offer balance transfer with possible lower interest and better terms.",
      },
    ],
    relatedSlugs: ["home-extension-loan", "home-renovation-loan", "plot-loan", "mortgage-loan"],
  },
  {
    slug: "mortgage-loan",
    title: "Mortgage Loans / Loan Against Property (LAP)",
    shortTitle: "Mortgage / LAP",
    description:
      "Unlock the value of your property. Get funds for business expansion, education, medical needs or any purpose. Competitive rates and long tenures.",
    icon: "🏢",
    interestRate: "From 9.5% p.a.",
    category: "loans",
    features: [
      "Loan against residential/commercial property",
      "Multi-purpose use",
      "Tenure up to 15-20 years",
      "Higher loan amounts",
    ],
    eligibility: [
      { criteria: "Age", salaried: "21-58 years", selfEmployed: "25-65 years" },
      { criteria: "Income", salaried: "₹25,000+/month", selfEmployed: "₹3L+ annual" },
      { criteria: "Property", salaried: "Clear title", selfEmployed: "Clear title" },
      { criteria: "CIBIL", salaried: "650+ preferred", selfEmployed: "650+ preferred" },
    ],
    documents: [
      "Property papers",
      "Aadhaar, PAN",
      "Income proof",
      "Bank statements",
    ],
    faqs: [
      {
        q: "What can I use LAP for?",
        a: "Business, education, medical, debt consolidation, or any legal purpose.",
      },
    ],
    relatedSlugs: ["home-loan", "construction-loan", "business-loan"],
  },
  {
    slug: "business-loan",
    title: "Business Loans & MSME Loans",
    shortTitle: "Business Loans",
    description:
      "Fuel your business growth with loans from ₹1 Lakh to ₹50 Crore. Working capital, term loans, machinery loans available for MSMEs and established businesses.",
    icon: "💼",
    interestRate: "From 14% p.a.",
    category: "loans",
    features: [
      "Unsecured and secured options",
      "Working capital & term loans",
      "Quick processing",
      "Flexible repayment",
    ],
    eligibility: [
      { criteria: "Age", salaried: "N/A", selfEmployed: "25-65 years" },
      { criteria: "Business vintage", salaried: "N/A", selfEmployed: "2+ years preferred" },
      { criteria: "Turnover", salaried: "N/A", selfEmployed: "Varies by lender" },
      { criteria: "CIBIL", salaried: "N/A", selfEmployed: "650+ preferred" },
    ],
    documents: [
      "Business registration",
      "GST (if applicable)",
      "ITR last 2 years",
      "Bank statements",
    ],
    faqs: [
      {
        q: "I don't have ITR. Can I still get a business loan?",
        a: "We have partners who consider business loans with alternative income proof. Contact us for options.",
      },
    ],
    relatedSlugs: ["msme-loan", "working-capital-loan", "construction-loan", "project-finance"],
  },
  {
    slug: "construction-loan",
    title: "Construction Loans",
    shortTitle: "Construction Loans",
    description:
      "Finance your residential or commercial construction projects. Stage-wise disbursement available as per construction progress.",
    icon: "🏗️",
    category: "loans",
    features: [
      "Residential & commercial",
      "Stage-wise disbursement",
      "Flexible tenure",
    ],
    eligibility: [
      { criteria: "Age", salaried: "21-58 years", selfEmployed: "25-65 years" },
      { criteria: "Income", salaried: "As per bank", selfEmployed: "As per bank" },
      { criteria: "Land", salaried: "Clear title", selfEmployed: "Clear title" },
      { criteria: "CIBIL", salaried: "650+ preferred", selfEmployed: "650+ preferred" },
    ],
    documents: [
      "Land documents",
      "Approved plan",
      "Income proof",
      "Bank statements",
    ],
    faqs: [],
    relatedSlugs: ["home-loan", "project-finance", "mortgage-loan"],
  },
  {
    slug: "project-finance",
    title: "Project Finance",
    shortTitle: "Project Finance",
    description:
      "Large-scale project funding for real estate developers, infrastructure projects & industrial setups. Customized solutions for your project.",
    icon: "📊",
    category: "loans",
    features: [
      "Large ticket sizes",
      "Real estate & infrastructure",
      "Structured repayment",
    ],
    eligibility: [
      { criteria: "Entity", salaried: "N/A", selfEmployed: "Company/LLP/Partnership" },
      { criteria: "Experience", salaried: "N/A", selfEmployed: "Track record required" },
      { criteria: "Project", salaried: "N/A", selfEmployed: "Viable DPR" },
      { criteria: "CIBIL", salaried: "N/A", selfEmployed: "As per lender" },
    ],
    documents: [
      "Project report",
      "Company documents",
      "Financial statements",
      "Collateral details",
    ],
    faqs: [],
    relatedSlugs: ["construction-loan", "business-loan", "mortgage-loan"],
  },
  {
    slug: "car-loan",
    title: "Car Loans & Vehicle Loans",
    shortTitle: "Car & Vehicle Loans",
    description:
      "New car, used car, two-wheeler & commercial vehicle loans with up to 100% on-road funding. Quick approval and competitive rates.",
    icon: "🚗",
    interestRate: "From 8.5% p.a.",
    category: "loans",
    features: [
      "New & used car loans",
      "Two-wheeler loans",
      "Commercial vehicle finance",
      "Up to 100% on-road funding",
    ],
    eligibility: [
      { criteria: "Age", salaried: "21-58 years", selfEmployed: "25-65 years" },
      { criteria: "Income", salaried: "₹15,000+/month", selfEmployed: "₹2L+ annual" },
      { criteria: "Experience", salaried: "1+ year", selfEmployed: "2+ years" },
      { criteria: "CIBIL", salaried: "650+ preferred", selfEmployed: "650+ preferred" },
    ],
    documents: [
      "Aadhaar, PAN",
      "Income proof",
      "Bank statements",
      "Quotation from dealer",
    ],
    faqs: [],
    relatedSlugs: ["two-wheeler-loan", "commercial-vehicle-loan", "personal-loan"],
  },
  {
    slug: "education-loan",
    title: "Education Loans",
    shortTitle: "Education Loans",
    description:
      "Study in India or abroad. Education loans for graduation, post-graduation, professional courses & skill development. Moratorium period available.",
    icon: "🎓",
    category: "loans",
    features: [
      "India & abroad",
      "Course fee + living expenses",
      "Moratorium during course",
      "Tax benefits under 80E",
    ],
    eligibility: [
      { criteria: "Age", salaried: "N/A", selfEmployed: "Student 18+ or co-borrower" },
      { criteria: "Course", salaried: "N/A", selfEmployed: "Recognized institution" },
      { criteria: "Co-borrower", salaried: "N/A", selfEmployed: "Parent/guardian income" },
      { criteria: "CIBIL", salaried: "N/A", selfEmployed: "Co-borrower 650+" },
    ],
    documents: [
      "Admission letter",
      "Fee structure",
      "Co-borrower KYC & income",
      "Academic records",
    ],
    faqs: [],
    relatedSlugs: ["personal-loan", "doctor-loan"],
  },
  {
    slug: "gold-loan",
    title: "Gold Loans",
    shortTitle: "Gold Loans",
    description:
      "Instant cash against your gold jewellery. Quick processing, minimal documentation, attractive interest rates. Get same-day disbursal.",
    icon: "✨",
    interestRate: "From 7% p.a.",
    category: "loans",
    features: [
      "Same-day disbursal",
      "Minimal documentation",
      "Gold kept in safe custody",
      "Flexible tenure",
    ],
    eligibility: [
      { criteria: "Age", salaried: "18+ years", selfEmployed: "18+ years" },
      { criteria: "Gold", salaried: "18-24 karat", selfEmployed: "18-24 karat" },
      { criteria: "CIBIL", salaried: "Not mandatory", selfEmployed: "Not mandatory" },
      { criteria: "Income", salaried: "Not mandatory", selfEmployed: "Not mandatory" },
    ],
    documents: [
      "Aadhaar",
      "Gold (for valuation)",
    ],
    faqs: [],
    relatedSlugs: ["personal-loan", "loan-against-fd"],
  },
  {
    slug: "credit-card",
    title: "All Banks Credit Cards",
    shortTitle: "Credit Cards",
    description:
      "Apply for credit cards from HDFC, SBI, ICICI, Axis, Kotak & more. Lifetime free options available. Compare and get the best card for your needs.",
    icon: "💳",
    category: "credit-cards",
    features: [
      "All major banks",
      "Lifetime free options",
      "Rewards & cashback",
      "Quick approval",
    ],
    eligibility: [
      { criteria: "Age", salaried: "21-60 years", selfEmployed: "21-60 years" },
      { criteria: "Income", salaried: "₹2L+ annual", selfEmployed: "₹2L+ annual" },
      { criteria: "CIBIL", salaried: "700+ preferred", selfEmployed: "700+ preferred" },
      { criteria: "Residence", salaried: "Indian resident", selfEmployed: "Indian resident" },
    ],
    documents: [
      "Aadhaar, PAN",
      "Income proof",
      "Bank statement",
    ],
    faqs: [],
    relatedSlugs: ["personal-loan"],
  },
  {
    slug: "insurance",
    title: "All Types of Insurance",
    shortTitle: "Insurance",
    description:
      "Life insurance, health insurance, motor insurance, travel insurance & general insurance from top companies. Get the right coverage at best price.",
    icon: "🛡️",
    category: "insurance",
    features: [
      "Life, health, motor, travel",
      "Top insurers",
      "Comparison & advice",
      "Claims support",
    ],
    eligibility: [
      { criteria: "Age", salaried: "As per product", selfEmployed: "As per product" },
      { criteria: "Residence", salaried: "Indian resident", selfEmployed: "Indian resident" },
      { criteria: "Other", salaried: "Product specific", selfEmployed: "Product specific" },
      { criteria: "CIBIL", salaried: "N/A", selfEmployed: "N/A" },
    ],
    documents: [
      "Aadhaar, PAN",
      "Age proof",
      "Vehicle RC (for motor)",
    ],
    faqs: [],
    relatedSlugs: ["credit-card", "personal-loan"],
  },
  {
    slug: "private-finance",
    title: "Private Finance",
    shortTitle: "Private Finance",
    description:
      "Quick private financing solutions for urgent needs. Flexible repayment options available. Contact us for confidential discussion.",
    icon: "🤝",
    category: "other",
    features: [
      "Quick processing",
      "Flexible terms",
      "Confidential",
    ],
    eligibility: [
      { criteria: "Eligibility", salaried: "Case to case", selfEmployed: "Case to case" },
      { criteria: "Documentation", salaried: "Minimal", selfEmployed: "Minimal" },
      { criteria: "CIBIL", salaried: "Flexible", selfEmployed: "Flexible" },
      { criteria: "Purpose", salaried: "As per lender", selfEmployed: "As per lender" },
    ],
    documents: [
      "KYC",
      "Income/asset proof as required",
    ],
    faqs: [],
    relatedSlugs: ["personal-loan", "gold-loan"],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesList.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceItem[] {
  return servicesList.filter((s) => slugs.includes(s.slug));
}

export function getServicesByCategory(
  category: ServiceItem["category"] | "all"
): ServiceItem[] {
  if (category === "all") return servicesList;
  return servicesList.filter((s) => s.category === category);
}
