"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/wizzfly-constants";

export function ContactCTA() {
  return (
    <section className="scroll-mt-20 bg-primary-blue py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-poppins text-3xl font-bold text-white sm:text-4xl"
        >
          Ready to Start Your Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-white/90"
        >
          Book a free consultation with our experts today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary-orange px-8 py-4 text-lg font-semibold text-white transition hover:bg-orange-600"
          >
            Book a Free Consultation
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-sm text-white/80"
        >
          📍 Office: {COMPANY.address}
        </motion.p>
      </div>
    </section>
  );
}
