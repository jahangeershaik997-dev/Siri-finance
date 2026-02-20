"use client";

import Link from "next/link";
import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import type { ApplyFormValues } from "@/lib/validations";
import { DOCUMENT_CHECKLIST, PREFERRED_CONTACT_TIME, HEAR_ABOUT_US } from "@/lib/constants";

interface Step4Props {
  register: UseFormRegister<ApplyFormValues>;
  watch: UseFormWatch<ApplyFormValues>;
  errors: FieldErrors<ApplyFormValues>;
  onEditStep: (step: number) => void;
  isSubmitting: boolean;
}

export function Step4ReviewSubmit({
  register,
  watch,
  errors,
  onEditStep,
  isSubmitting,
}: Step4Props) {
  const values = watch();

  return (
    <div className="space-y-6">
      <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
        Review your application and submit
      </h2>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-sfs-bg-light p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sfs-text-primary">1. Loan Requirements</h3>
          <button type="button" onClick={() => onEditStep(1)} className="text-sm text-primary-red hover:underline">
            Edit
          </button>
        </div>
        <p className="text-sm text-sfs-text-secondary">
          Type: {values.loanType || "-"} | Amount: {values.loanAmount || "-"} | Tenure: {values.loanTenure || "-"}
        </p>
        {values.purpose && <p className="text-sm text-sfs-text-secondary">Purpose: {values.purpose}</p>}
      </div>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-sfs-bg-light p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sfs-text-primary">2. Personal Details</h3>
          <button type="button" onClick={() => onEditStep(2)} className="text-sm text-primary-red hover:underline">
            Edit
          </button>
        </div>
        <p className="text-sm text-sfs-text-secondary">
          {values.fullName} | {values.mobileNumber} | {values.email || "-"} | {values.city}, {values.state}
        </p>
      </div>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-sfs-bg-light p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sfs-text-primary">3. Employment and Income</h3>
          <button type="button" onClick={() => onEditStep(3)} className="text-sm text-primary-red hover:underline">
            Edit
          </button>
        </div>
        <p className="text-sm text-sfs-text-secondary">
          {values.employmentType || "-"} | CIBIL: {values.cibilScore || "-"}
        </p>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">Document Checklist (optional)</p>
        <p className="mb-2 text-xs text-sfs-text-secondary">
          Don&apos;t worry if you don&apos;t have all documents. Our team will guide you.
        </p>
        <ul className="grid gap-1 text-sm text-sfs-text-secondary sm:grid-cols-2">
          {DOCUMENT_CHECKLIST.map((doc) => (
            <li key={doc} className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded" readOnly disabled />
              {doc}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">Preferred Contact Time</label>
        <select {...register("preferredContactTime")} className="w-full rounded-lg border border-gray-300 px-3 py-2.5">
          <option value="">Select...</option>
          {PREFERRED_CONTACT_TIME.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">How did you hear about us?</label>
        <select {...register("hearAboutUs")} className="w-full rounded-lg border border-gray-300 px-3 py-2.5">
          <option value="">Select...</option>
          {HEAR_ABOUT_US.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">Referral Code (optional)</label>
        <input {...register("referralCode")} placeholder="Enter referral code if any" className="w-full rounded-lg border border-gray-300 px-3 py-2.5" />
      </div>
      <div className="space-y-3 rounded-lg border border-gray-200 bg-amber-50 p-4">
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("consentContact")} className="mt-1 h-4 w-4 rounded border-gray-300" />
          <span className="text-sm">
            I hereby authorize Siri Financial Services to contact me via phone, WhatsApp, SMS, or email regarding my loan enquiry. I confirm that the information provided is accurate. *
          </span>
        </label>
        {errors.consentContact && <p className="text-sm text-red-600">{errors.consentContact.message}</p>}
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("consentTerms")} className="mt-1 h-4 w-4 rounded border-gray-300" />
          <span className="text-sm">
            I agree to the <Link href="/terms" className="text-primary-blue underline">Terms</Link> and <Link href="/privacy-policy" className="text-primary-blue underline">Privacy Policy</Link> *
          </span>
        </label>
        {errors.consentTerms && <p className="text-sm text-red-600">{errors.consentTerms.message}</p>}
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("consentSoftCheck")} className="mt-1 h-4 w-4 rounded border-gray-300" />
          <span className="text-sm">I consent to soft credit check if required</span>
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-green py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Application and Get Offers"}
      </button>
    </div>
  );
}
