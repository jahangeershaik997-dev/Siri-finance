"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KEY_SERVICES, VISA_TYPE_CARDS, COMPANY } from "@/lib/wizzfly-constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, JSX.Element> = {
  briefcase: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  graduation: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  chart: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  passport: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  globe: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 20.488A18.488 18.488 0 0112 12c0-4.488 2.5-8.488 6-11.488M12 20.488V12m0 0a18.488 18.488 0 016-7.488M12 12v8.488" />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <div className="bg-wizzfly-bg-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-wizzfly-text-secondary"
        >
          End-to-end immigration and visa consultancy from {COMPANY.name} in Hyderabad.
        </motion.p>

        <section id="work" className="mt-12 scroll-mt-20">
          <h2 className="font-poppins text-2xl font-bold text-wizzfly-text-primary">Key Services</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-blue/10 text-primary-blue">
                  {iconMap[s.icon] || iconMap.globe}
                </div>
                <h3 className="mt-4 font-poppins text-lg font-bold text-wizzfly-text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-wizzfly-text-secondary">{s.desc}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-orange hover:underline">
                  Enquire
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-poppins text-2xl font-bold text-wizzfly-text-primary">Visa Types</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VISA_TYPE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-poppins text-lg font-bold text-wizzfly-text-primary">{card.title}</h3>
                <p className="mt-2 text-sm text-wizzfly-text-secondary">{card.desc}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-orange hover:underline">
                  Learn More
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl bg-primary-blue p-8 text-center text-white"
        >
          <p className="text-lg font-medium">Ready to start your journey?</p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-lg bg-primary-orange px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Book Free Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
