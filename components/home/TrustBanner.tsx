"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BANKS_PARTNERS } from "@/lib/constants";

export function TrustBanner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className="border-y border-gray-200 bg-sfs-bg-light py-6">
      <p className="mb-4 text-center text-sm font-semibold text-sfs-text-secondary">
        We Work With India&apos;s Leading Banks & NBFCs
      </p>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: [0, -1200] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
          }}
        >
          {[...BANKS_PARTNERS, ...BANKS_PARTNERS].map((bank, i) => (
            <span
              key={`${bank}-${i}`}
              className="shrink-0 whitespace-nowrap rounded-lg bg-white px-6 py-2 font-semibold text-sfs-text-primary shadow-sm"
            >
              {bank}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
