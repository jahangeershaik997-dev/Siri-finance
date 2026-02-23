"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COACHING_TYPES } from "@/lib/wizzfly-constants";

export function Coaching() {
  return (
    <section className="scroll-mt-20 bg-wizzfly-bg-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl">
              Language Coaching & Test Preparation
            </h2>
            <p className="text-wizzfly-text-secondary">
              Prepare for your language tests and visa requirements with our expert coaching. We offer comprehensive preparation for all major English and other language tests used for study and migration.
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COACHING_TYPES.map((name) => (
                <li key={name} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                  <span className="text-primary-blue">✓</span>
                  <span className="font-medium text-wizzfly-text-primary">{name}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-primary-orange px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Register for Free Demo
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary-blue to-wizzfly-navy"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/80">IELTS • PTE • TOEFL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
