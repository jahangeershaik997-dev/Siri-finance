"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

interface Step5Props {
  referenceNumber: string;
  fullName: string;
  loanType: string;
  loanAmount: string;
  submittedAt: string;
  onApplyAnother: () => void;
}

export function Step5Success({
  referenceNumber,
  fullName,
  loanType,
  loanAmount,
  submittedAt,
  onApplyAnother,
}: Step5Props) {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hi, my application reference is ${referenceNumber}. I need help with my loan.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-card border border-gray-200 bg-white p-8 text-center shadow-soft"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-green text-5xl text-white">
        &#10003;
      </div>
      <h2 className="font-poppins text-2xl font-bold text-sfs-text-primary">
        Congratulations {fullName}! Your Application is Submitted Successfully!
      </h2>
      <p className="mt-4 font-mono text-lg font-semibold text-primary-blue">
        Reference Number: {referenceNumber}
      </p>
      <div className="mx-auto mt-6 max-w-sm rounded-lg border border-gray-200 bg-sfs-bg-light p-4 text-left text-sm">
        <p>Loan Type: {loanType}</p>
        <p>Amount: {loanAmount || "—"}</p>
        <p>Submitted on: {submittedAt}</p>
      </div>
      <div className="mt-8 text-left">
        <h3 className="font-semibold text-sfs-text-primary">What happens next?</h3>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-sfs-text-secondary">
          <li>Our loan expert will call you within 2 hours (or by tomorrow morning if after 6 PM)</li>
          <li>We&apos;ll review your profile and identify best bank offers</li>
          <li>You&apos;ll receive 2-3 best loan options to choose from</li>
          <li>Select the best offer, complete documentation & get your loan disbursed</li>
        </ol>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white"
        >
          WhatsApp Us for Faster Response
        </a>
        <button
          type="button"
          onClick={onApplyAnother}
          className="rounded-lg border-2 border-primary-red px-6 py-3 font-semibold text-primary-red"
        >
          Apply for Another Loan
        </button>
      </div>
      <p className="mt-6 text-sm text-sfs-text-secondary">
        For any queries, call {COMPANY.contactPerson}: {COMPANY.phone}
      </p>
    </motion.div>
  );
}
