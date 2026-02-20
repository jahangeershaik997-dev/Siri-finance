"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BANKS_PARTNERS, BANK_BRAND_COLORS } from "@/lib/constants";

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
          className="flex gap-6"
          animate={{ x: [0, -1400] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
          }}
        >
          {[...BANKS_PARTNERS, ...BANKS_PARTNERS].map((bank, i) => {
            const colors = BANK_BRAND_COLORS[bank] ?? { bg: "#1a1a1a", text: "#ffffff" };
            return (
              <span
                key={`${bank}-${i}`}
                className="shrink-0 whitespace-nowrap rounded-lg px-5 py-2.5 font-semibold shadow-md"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                }}
              >
                {bank}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
