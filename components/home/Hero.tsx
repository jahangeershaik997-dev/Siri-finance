import Link from "next/link";
import { motion } from "framer-motion";
import { QuickEnquiryForm } from "@/components/shared/QuickEnquiryForm";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-primary-blue via-primary-blue to-sfs-dark">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/95 to-transparent" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center px-4 pt-12 pb-16 lg:flex-row lg:gap-12 lg:px-8 lg:pt-16">
        <div className="flex-1 text-white lg:w-[60%]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full bg-primary-green px-4 py-1.5 text-sm font-medium"
          >
            Trusted by 500+ Customers in Hyderabad
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-poppins text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
          >
            One Stop Solution for All Your Financial Needs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-white/90"
          >
            Personal Loans • Home Loans • Business Loans • Mortgage Loans & More
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 rounded-lg border border-primary-orange bg-primary-orange/20 px-4 py-2 text-sm font-medium"
          >
            ✓ CIBIL Issues? We Can Help! ✓ No Income Proof? No Problem!
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/apply"
              className="rounded-lg bg-primary-red px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-red-600"
            >
              Get Loan Offers →
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-lg border-2 border-white px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-white hover:text-primary-blue"
            >
              Call Now: {COMPANY.phone}
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 w-full max-w-md lg:mt-0 lg:w-[40%]"
        >
          <QuickEnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}
