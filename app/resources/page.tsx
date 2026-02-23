"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RESOURCE_FILES } from "@/lib/wizzfly-constants";
import { cn } from "@/lib/utils";

const countries = Array.from(new Set(RESOURCE_FILES.map((f) => f.country)));

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<string>(countries[0] ?? "USA");

  const filesForCountry = RESOURCE_FILES.filter((f) => f.country === activeTab);
  const flagForCountry = RESOURCE_FILES.find((f) => f.country === activeTab)?.flag ?? "📄";

  return (
    <div className="min-h-screen bg-wizzfly-bg-light py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          Forms &amp; Documents
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-wizzfly-text-secondary"
        >
          Download forms and guides by country. Country flag is shown next to each file name.
        </motion.p>

        {/* Big green DS160 button - fill all required fields */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6"
        >
          <a
            href="#file-list"
            className="inline-block rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-700 focus:outline focus:ring-4 focus:ring-green-400"
          >
            DS160 Form — Fill All Required Fields
          </a>
          <p className="mt-2 text-sm text-wizzfly-text-secondary">
            Download the DS160 FORM by team and fill every required field in the document.
          </p>
        </motion.div>

        {/* Tabs by country */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => {
              const flag = RESOURCE_FILES.find((f) => f.country === country)?.flag ?? "📄";
              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => setActiveTab(country)}
                  className={cn(
                    "flex items-center gap-2 rounded-t-lg px-4 py-3 text-sm font-medium transition",
                    activeTab === country
                      ? "bg-primary-blue text-white"
                      : "bg-gray-100 text-wizzfly-text-primary hover:bg-gray-200"
                  )}
                >
                  <span>{flag}</span>
                  <span>{country}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* File list: flag + file name */}
        <motion.div
          id="file-list"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <span className="text-2xl">{flagForCountry}</span>
            <span className="ml-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              {activeTab}
            </span>
          </div>
          <ul className="divide-y divide-gray-200">
            {filesForCountry.map((file, i) => (
              <li key={file.slug}>
                <a
                  href={file.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-4 transition hover:bg-gray-50"
                >
                  <span className="text-2xl" aria-hidden>
                    {file.flag}
                  </span>
                  <span className="flex-1 font-medium text-wizzfly-text-primary">
                    {file.fileName}
                  </span>
                  <span className="text-sm text-wizzfly-text-secondary">
                    Download
                  </span>
                  <svg className="h-5 w-5 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="mt-6 text-sm text-wizzfly-text-secondary">
          <strong>While filling DS160 form please refer this</strong> — contact us for the DS160 FORM by team if a file does not open.{" "}
          <Link href="/contact" className="text-primary-blue hover:underline">
            Contact Us
          </Link>
        </p>

        <Link
          href="/"
          className="mt-8 inline-block text-primary-blue hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
