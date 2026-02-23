"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COUNTRY_TABS, VISA_TYPES_PER_COUNTRY } from "@/lib/wizzfly-constants";
import { cn } from "@/lib/utils";

export function CountryTabs() {
  const [activeTab, setActiveTab] = useState<(typeof COUNTRY_TABS)[number]>(COUNTRY_TABS[0]);

  return (
    <section id="country-services" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          Visa Services by Country
        </motion.h2>
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4">
            {COUNTRY_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  activeTab === tab
                    ? "bg-primary-blue text-white"
                    : "bg-gray-100 text-wizzfly-text-primary hover:bg-gray-200"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VISA_TYPES_PER_COUNTRY.map((visaType) => (
              <a
                key={visaType}
                href="/contact"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:border-primary-blue hover:shadow-md"
              >
                <span className="font-medium text-wizzfly-text-primary">{visaType}</span>
                <svg className="h-5 w-5 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
