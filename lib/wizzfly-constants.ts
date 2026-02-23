/** Wizzfly Overseas - Immigration & Visa Consultancy */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://wizzflyoverseas.com";

export const COMPANY = {
  name: "Wizzfly Overseas",
  tagline: "Your Wings to the World",
  phone: "7794920021",
  whatsapp: "917794920021",
  email: "Syed.mujaheedsm77949@gmail.com",
  address: "Hyderabad, Telangana",
  addressFull: "Hyderabad, Telangana, India",
  hours: "Mon-Sat 9:30 AM - 6:30 PM",
  mapCoords: { lat: 17.385, lng: 78.4867 },
};

/** Formspree endpoint for Application/Lead form (from Formspree dashboard) */
export const FORMSPREE_LEAD_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_LEAD_FORM_ID || "xreaoqpq";
export const FORMSPREE_LEAD_ENDPOINT = `https://formspree.io/f/${FORMSPREE_LEAD_FORM_ID}`;

export const FORMSPREE_CONTACT_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID || "xreaoqpq";
export const FORMSPREE_CONTACT_ENDPOINT = `https://formspree.io/f/${FORMSPREE_CONTACT_FORM_ID}`;

/** DS160 reference - bold notice for all users */
export const DS160_REFERENCE = {
  text: "While filling DS160 form please refer this",
  docName: "DS160 FORM by team",
  /** Link to document or contact for assistance */
  contactForCopy: true,
};

/** Nav links */
export const NAV_LINKS = [
  { href: "/#eligibility", label: "Free Eligibility Check" },
  { href: "/#services", label: "Migrate" },
  { href: "/#services", label: "Work" },
  { href: "/#services", label: "Study" },
  { href: "/#countries", label: "Visa" },
  { href: "/contact", label: "Contact Us" },
];

/** Lead form options */
export const LEAD_FORM_I_AM = [
  "Student",
  "Working Professional",
  "Business Owner",
] as const;

export const LEAD_FORM_I_WANT = [
  "Migrate",
  "Work",
  "Study",
  "Visit",
  "Invest",
] as const;

/** About stats */
export const ABOUT_STATS = [
  { value: 10000, suffix: "+", label: "Applicants" },
  { value: 50000, suffix: "+", label: "Counseled" },
  { value: 50, suffix: "+", label: "Experts" },
  { value: 5, suffix: "+", label: "Offices" },
  { value: 200, suffix: "+", label: "Team Members" },
  { value: "24/7", suffix: "", label: "Online Service" },
];

/** Key services */
export const KEY_SERVICES = [
  { icon: "briefcase", title: "Work Overseas", desc: "Find job opportunities and work visas abroad.", href: "/services#work" },
  { icon: "graduation", title: "Study Overseas", desc: "Admissions and student visas for top universities.", href: "/services#study" },
  { icon: "chart", title: "Invest Overseas", desc: "Investment migration and business visas.", href: "/services#invest" },
  { icon: "passport", title: "Visit Overseas", desc: "Visitor and tourist visa assistance.", href: "/services#visit" },
  { icon: "globe", title: "Migrate Overseas", desc: "PR and family migration pathways.", href: "/services#migrate" },
];

/** Popular countries */
export const POPULAR_COUNTRIES = [
  { name: "Canada", flag: "🇨🇦", slug: "canada" },
  { name: "Australia", flag: "🇦🇺", slug: "australia" },
  { name: "UK", flag: "🇬🇧", slug: "uk" },
  { name: "USA", flag: "🇺🇸", slug: "usa" },
  { name: "Germany", flag: "🇩🇪", slug: "germany" },
  { name: "UAE", flag: "🇦🇪", slug: "uae" },
  { name: "Singapore", flag: "🇸🇬", slug: "singapore" },
  { name: "New Zealand", flag: "🇳🇿", slug: "new-zealand" },
  { name: "Ireland", flag: "🇮🇪", slug: "ireland" },
];

/** Country tabs - visa types per country */
export const COUNTRY_TABS = ["Canada", "Australia", "UK", "USA", "Germany", "UAE"] as const;

export const VISA_TYPES_PER_COUNTRY = [
  "Visitor Visa",
  "Student Visa & Admission",
  "Work Visa",
  "Business Visa",
  "PR Visa / Migrate",
];

/** Coaching types */
export const COACHING_TYPES = [
  "IELTS",
  "PTE",
  "TOEFL",
  "CELPIP",
  "OET",
  "German Language",
];

/** Visa type cards */
export const VISA_TYPE_CARDS = [
  { icon: "pr", title: "PR Visa", desc: "Permanent residency and skilled migration." },
  { icon: "visitor", title: "Visitor Visa", desc: "Tourist and family visit visas." },
  { icon: "study", title: "Study Visa", desc: "Student visas and admissions." },
  { icon: "business", title: "Business Visa", desc: "Business visit and work permits." },
  { icon: "investor", title: "Investor Visa", desc: "Investment-based migration." },
  { icon: "dependent", title: "Dependent Visa", desc: "Family and spouse visas." },
];

/** Why choose us */
export const WHY_CHOOSE_US = [
  { title: "No Fake Promises", desc: "Transparent process with clear timelines and expectations.", icon: "shield" },
  { title: "Anti-Fraud Policy", desc: "IATA certified and committed to ethical practices.", icon: "badge" },
  { title: "Unbiased Advice", desc: "No tie-ups with colleges—we recommend what's best for you.", icon: "scale" },
  { title: "End-to-End Support", desc: "From visa application to landing and settlement.", icon: "support" },
];

/** Testimonials */
export const TESTIMONIALS = [
  { name: "Rahul K.", country: "Canada", rating: 5, text: "Wizzfly made my PR process smooth. Professional and responsive team.", avatar: null },
  { name: "Priya S.", country: "Australia", rating: 5, text: "Got my student visa in time. Highly recommend for overseas education.", avatar: null },
  { name: "Vikram M.", country: "UK", rating: 5, text: "End-to-end support from documentation to landing. Thank you!", avatar: null },
];

/** Footer links */
export const FOOTER_ABOUT = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_SERVICES = [
  { href: "/services#work", label: "Work Overseas" },
  { href: "/services#study", label: "Study Overseas" },
  { href: "/services#migrate", label: "Migrate" },
  { href: "/services#visit", label: "Visitor Visa" },
];

export const FOOTER_COUNTRIES = [
  { href: "/#countries", label: "Canada" },
  { href: "/#countries", label: "Australia" },
  { href: "/#countries", label: "UK" },
  { href: "/#countries", label: "USA" },
];

export const FOOTER_SOCIAL = [
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "Twitter/X", href: "#", icon: "twitter" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Facebook", href: "#", icon: "facebook" },
];

export const TESTIMONIALS_YOUTUBE_URL = "https://www.youtube.com";
