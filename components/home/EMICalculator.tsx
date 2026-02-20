"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { calculateEMI, formatINRFull } from "@/lib/utils";

const formatSlider = (v: number, type: "amount" | "rate" | "tenure") => {
  if (type === "amount") {
    if (v >= 1e7) return `${(v / 1e7).toFixed(1)} Cr`;
    if (v >= 1e5) return `${(v / 1e5).toFixed(0)} L`;
    return `${(v / 1000).toFixed(0)}K`;
  }
  if (type === "rate") return `${v}%`;
  return `${v} Y`;
};

export function EMICalculator() {
  const [principal, setPrincipal] = useState(2000000);
  const [rate, setRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(5);

  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEMI(principal, rate, tenureYears * 12),
    [principal, rate, tenureYears]
  );

  const principalPct = totalPayment > 0 ? (principal / totalPayment) * 100 : 50;
  const interestPct = 100 - principalPct;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Loan EMI Calculator" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl rounded-card border border-gray-200 bg-sfs-bg-light p-6 shadow-soft"
        >
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-sfs-text-primary">
                Loan Amount: {formatSlider(principal, "amount")}
              </label>
              <input
                type="range"
                min={100000}
                max={50000000}
                step={50000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="mt-1 h-2 w-full accent-primary-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sfs-text-primary">
                Interest Rate: {rate}% p.a.
              </label>
              <input
                type="range"
                min={8}
                max={24}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="mt-1 h-2 w-full accent-primary-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sfs-text-primary">
                Tenure: {tenureYears} years
              </label>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="mt-1 h-2 w-full accent-primary-red"
              />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-sfs-text-secondary">Monthly EMI</p>
              <p className="font-poppins text-xl font-bold text-primary-red">
                {formatINRFull(emi)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-sfs-text-secondary">Total Interest</p>
              <p className="font-poppins text-lg font-bold text-sfs-text-primary">
                {formatINRFull(totalInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-sfs-text-secondary">Total Payment</p>
              <p className="font-poppins text-lg font-bold text-sfs-text-primary">
                {formatINRFull(totalPayment)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-primary-blue"
                style={{ width: `${principalPct}%` }}
              />
            </div>
            <span className="text-xs text-sfs-text-secondary">
              Principal {principalPct.toFixed(0)}% | Interest {interestPct.toFixed(0)}%
            </span>
          </div>
          <Link
            href="/apply"
            className="mt-6 block w-full rounded-lg bg-primary-green py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            Apply for This Loan →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
