"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { POPULAR_COUNTRIES } from "@/lib/wizzfly-constants";

export function Countries() {
  return (
    <section id="countries" className="scroll-mt-20 bg-wizzfly-bg-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          Popular Destinations
        </motion.h2>
        <div className="mt-10 overflow-x-auto pb-4">
          <div className="flex gap-4 sm:justify-center" style={{ minWidth: "min-content" }}>
            {POPULAR_COUNTRIES.map((country, i) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/#country-services`}
                  className="flex min-w-[140px] flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-blue hover:shadow-md"
                >
                  <span className="text-4xl">{country.flag}</span>
                  <span className="mt-2 font-medium text-wizzfly-text-primary">{country.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
