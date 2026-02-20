import Link from "next/link";
import { COMPANY, BANKS_PARTNERS, BEST_RATES } from "@/lib/constants";

const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}`;
const whatsappMessage = encodeURIComponent("Hi, I need help with my loan application.");

export function ApplySidebar() {
  const sideBanks = BANKS_PARTNERS.slice(0, 10);
  return (
    <div className="space-y-6">
      <div className="rounded-card border border-gray-200 bg-white p-5 shadow-soft">
        <h3 className="font-poppins font-bold text-sfs-text-primary">Why Apply Through Us?</h3>
        <ul className="mt-3 space-y-2 text-sm text-sfs-text-secondary">
          <li>✅ Compare offers from 10+ banks & NBFCs</li>
          <li>✅ Get lowest interest rates available</li>
          <li>✅ CIBIL issues? We have solutions</li>
          <li>✅ No income proof? Flexible options</li>
          <li>✅ 100% FREE consultation - zero charges</li>
          <li>✅ Loan sanctioned in 48-72 hours</li>
          <li>✅ Dedicated relationship manager</li>
        </ul>
      </div>

      <div className="rounded-card border border-gray-200 bg-white p-5 shadow-soft">
        <h3 className="font-poppins font-bold text-sfs-text-primary">Our Banking Partners</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-medium text-sfs-text-primary">
          {sideBanks.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>

      <div className="rounded-card border border-gray-200 bg-white p-5 shadow-soft">
        <h3 className="font-poppins font-bold text-sfs-text-primary">Talk to Our Expert</h3>
        <p className="mt-1 font-medium text-primary-blue">{COMPANY.contactPerson}</p>
        <p className="text-sm text-sfs-text-secondary">Founder & Loan Consultant</p>
        <a href={`tel:${COMPANY.phone}`} className="mt-2 block text-sm font-medium text-primary-red">
          📞 {COMPANY.phone}
        </a>
        <a
          href={whatsappUrl + "?text=" + whatsappMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full rounded-lg bg-[#25D366] py-2.5 text-center font-semibold text-white"
        >
          Chat on WhatsApp
        </a>
        <p className="mt-2 text-xs text-sfs-text-secondary">📍 {COMPANY.addressShort}</p>
        <p className="text-xs text-sfs-text-secondary">🕐 {COMPANY.hours}</p>
      </div>

      <div className="rounded-card border border-gray-200 bg-white p-5 shadow-soft">
        <h3 className="font-poppins font-bold text-sfs-text-primary">Current Best Rates*</h3>
        <table className="mt-3 w-full text-sm">
          <tbody>
            {BEST_RATES.map((r) => (
              <tr key={r.type} className="border-b border-gray-100">
                <td className="py-1.5 text-sfs-text-primary">{r.type}</td>
                <td className="py-1.5 text-right font-medium text-primary-green">{r.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-sfs-text-secondary">
          *Rates vary based on bank, profile & CIBIL score
        </p>
      </div>

      <div className="rounded-card border border-gray-200 bg-white p-5 shadow-soft">
        <h3 className="font-poppins font-bold text-sfs-text-primary">Customer Reviews</h3>
        <p className="mt-2 text-sm text-sfs-text-secondary">
          &ldquo;Got my personal loan in 3 days. Great service!&rdquo; — Rajesh K.
        </p>
        <p className="mt-2 text-sm text-sfs-text-secondary">
          &ldquo;Best home loan rate. Mallesh sir is very helpful.&rdquo; — Priya M.
        </p>
        <p className="mt-2 text-sm font-medium text-primary-orange">⭐⭐⭐⭐⭐ 4.8/5</p>
      </div>
    </div>
  );
}
