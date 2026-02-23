"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TESTIMONIALS, TESTIMONIALS_YOUTUBE_URL } from "@/lib/wizzfly-constants";

export function Testimonials() {
  return (
    <section className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          What Our Clients Say
        </motion.h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-blue/10 text-lg font-bold text-primary-blue">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-wizzfly-text-primary">{t.name}</p>
                  <p className="text-sm text-wizzfly-text-secondary">{t.country}</p>
                </div>
              </div>
              <div className="mt-3 flex text-yellow-500">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="mt-3 text-sm text-wizzfly-text-secondary">&ldquo;{t.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href={TESTIMONIALS_YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-blue px-6 py-3 font-semibold text-primary-blue transition hover:bg-primary-blue hover:text-white"
          >
            View All Testimonials
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
