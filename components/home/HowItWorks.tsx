import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/SectionTitle";

const steps = [
  { step: 1, icon: "📝", title: "Submit Enquiry", desc: "Fill our online form or call/WhatsApp us with your loan requirement" },
  { step: 2, icon: "📋", title: "Share Documents", desc: "Submit basic KYC and income documents as per loan type" },
  { step: 3, icon: "🏦", title: "We Process", desc: "We submit your application to multiple banks for best offers" },
  { step: 4, icon: "✅", title: "Loan Disbursed", desc: "Choose the best offer, sign documents & get your loan amount credited" },
];

export function HowItWorks() {
  return (
    <section className="bg-sfs-bg-light py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="How to Get Your Loan in 4 Simple Steps" />
        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-1 flex-col items-center rounded-card bg-white p-6 text-center shadow-soft lg:max-w-[240px]"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-[60%] top-1/2 hidden h-0.5 w-[80%] bg-primary-green/30 lg:block" />
              )}
              <span className="text-4xl">{s.icon}</span>
              <span className="mt-2 text-sm font-semibold text-primary-green">Step {s.step}</span>
              <h3 className="mt-1 font-poppins font-bold text-sfs-text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-sfs-text-secondary">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/apply"
            className="inline-flex rounded-lg bg-primary-red px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-red-600"
          >
            Start Your Application Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
