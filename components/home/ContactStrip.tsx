import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}`;

export function ContactStrip() {
  return (
    <section className="bg-primary-red py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-poppins text-2xl font-bold">Need Help? Talk to Our Loan Expert Now!</h2>
        <p className="mt-2 font-medium">{COMPANY.contactPerson} - Loan Consultant</p>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href={`tel:${COMPANY.phone}`} className="hover:underline">
            Phone: {COMPANY.phone}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            WhatsApp
          </a>
          <span>Visit Office</span>
        </p>
        <p className="mt-2 text-sm opacity-90">{COMPANY.addressShort}</p>
      </div>
    </section>
  );
}
