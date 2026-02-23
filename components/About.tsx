"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ABOUT_STATS, COMPANY } from "@/lib/wizzfly-constants";

function AnimatedCounter({ value, suffix, label }: { value: number | string; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(typeof value === "number" ? 0 : value);
  const isNumber = typeof value === "number";

  useEffect(() => {
    if (!inView || !isNumber) return;
    const num = value as number;
    const duration = 1500;
    const step = num / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, isNumber]);

  const displayValue = isNumber ? count.toLocaleString() : String(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
    >
      <div className="font-poppins text-2xl font-bold text-primary-blue sm:text-3xl">
        {displayValue}{suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-wizzfly-text-secondary">{label}</div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-wizzfly-bg-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          About {COMPANY.name} in Hyderabad
        </motion.h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-wizzfly-text-secondary"
          >
            <p className="text-lg leading-relaxed">
              {COMPANY.name} is a trusted immigration and visa consultancy based in Hyderabad, offering end-to-end support for studying, working, and migrating abroad. Our team of certified experts helps you with visa applications, document preparation, and settlement support.
            </p>
            <p className="leading-relaxed">
              Whether you are a student aiming for top universities, a professional seeking work visas, or a family planning to migrate, we provide transparent, ethical, and personalized guidance. We are committed to no fake promises and unbiased advice—your success is our priority.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {ABOUT_STATS.map((stat, i) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
