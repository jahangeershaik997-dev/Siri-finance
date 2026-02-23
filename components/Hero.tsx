"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LeadForm } from "./LeadForm";
import { COMPANY } from "@/lib/wizzfly-constants";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [showStickyForm, setShowStickyForm] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setShowStickyForm(!e.isIntersecting),
      { threshold: 0.1, rootMargin: "-100px 0px 0px 0px" }
    );
    const el = heroRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  return (
    <>
      <section
        id="eligibility"
        ref={heroRef}
        className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#1a56db] via-[#1e3a8a] to-[#0f172a]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center px-4 pt-16 pb-20 lg:flex-row lg:gap-12 lg:px-8 lg:pt-24">
          <div className="flex-1 text-white lg:w-[55%]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-poppins text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
              Best Overseas Immigration Consultants in Hyderabad
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-white/90"
            >
              {COMPANY.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 rounded-lg border border-primary-orange bg-primary-orange/20 px-4 py-2 text-sm font-medium inline-block"
            >
              Get Free Counselling
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 w-full max-w-md lg:mt-0 lg:w-[45%]"
          >
            <LeadForm variant="hero" />
          </motion.div>
        </div>
      </section>

      {/* Sticky lead form on mobile - appears after scrolling past hero */}
      {showStickyForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-30 lg:hidden"
        >
          <div className="mx-auto max-w-sm rounded-xl bg-white p-4 shadow-xl">
            <LeadForm variant="sticky" />
          </div>
        </motion.div>
      )}
    </>
  );
}
