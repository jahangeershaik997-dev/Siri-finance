import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/apply", label: "Apply Now" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

const serviceLinks = [
  { href: "/services/personal-loan", label: "Personal Loans" },
  { href: "/services/home-loan", label: "Home Loans" },
  { href: "/services/business-loan", label: "Business Loans" },
  { href: "/services/mortgage-loan", label: "Mortgage Loans" },
  { href: "/services/construction-loan", label: "Construction Loans" },
  { href: "/services/car-loan", label: "Car Loans" },
  { href: "/services/credit-card", label: "Credit Cards" },
];

export function Footer() {
  return (
    <footer className="bg-sfs-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 font-poppins text-sm font-bold">
                <span className="text-[#6eb5ff]">S</span>
                <span className="text-[#ff6b6b]">F</span>
                <span className="text-[#69db7c]">S</span>
              </span>
              <span className="font-poppins font-bold">SIRI FINANCIAL SERVICES</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              Siri Financial Services is your trusted partner for all financial needs. We provide
              personalized loan solutions with the best interest rates from multiple banking
              partners.
            </p>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#25D366]"
            >
              WhatsApp / Phone: {COMPANY.phone}
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-poppins font-bold uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="mb-4 font-poppins font-bold uppercase tracking-wide">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-4 font-poppins font-bold uppercase tracking-wide">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="shrink-0">📍</span>
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white">
                  📞 {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  ✉️ {COMPANY.email}
                </a>
              </li>
              <li>🕐 {COMPANY.hours}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-primary-red py-3 text-center text-sm text-white">
        © 2025 Siri Financial Services. All Rights Reserved. | Managed by {COMPANY.contactPerson}
      </div>
    </footer>
  );
}
