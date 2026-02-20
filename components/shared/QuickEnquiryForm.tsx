"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { heroFormSchema, type HeroFormValues } from "@/lib/validations";
import { HERO_LOAN_TYPES, LOAN_AMOUNT_OPTIONS, FORMSPREE_ENDPOINT } from "@/lib/constants";
import { useState } from "react";

export function QuickEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: { city: "Hyderabad" },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: HeroFormValues) => {
    setLoading(true);
    try {
      // Formspree works on Vercel (file-based /api/leads does not)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobileNumber: data.mobileNumber,
          loanType: data.loanType,
          loanAmount: data.loanAmount,
          city: data.city,
          _subject: "Get Free Loan Consultation - Siri Finance",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save lead");
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "hero",
          data: {
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            loanType: data.loanType,
            loanAmount: data.loanAmount,
            city: data.city,
          },
        }),
      }).catch(() => {});
      // Also send summary to WhatsApp (if CallMeBot is set up)
      const whatsappMsg = `*New Loan Enquiry (Website)*\nName: ${data.fullName}\nPhone: ${data.mobileNumber}\nLoan: ${data.loanType}\nAmount: ${data.loanAmount}\nCity: ${data.city}`;
      fetch("/api/send-to-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: whatsappMsg }),
      })
        .then((r) => r.json())
        .then((body) => {
          if (body.skipped || !body.success) console.warn("[WhatsApp]", body.skipped ? "Skipped (set CALLMEBOT_API_KEY in Vercel/env)" : body.error);
        })
        .catch(() => {});
      toast.success("We'll contact you shortly with loan options!");
      reset({ city: "Hyderabad" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-card border border-gray-200 bg-white p-6 shadow-soft-lg"
    >
      <h3 className="font-poppins text-lg font-bold text-sfs-text-primary">
        Get Free Loan Consultation
      </h3>
      <div className="mt-4 space-y-3">
        <div>
          <input
            {...register("fullName")}
            placeholder="Full Name *"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <div className="flex">
            <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-sfs-text-secondary">
              +91
            </span>
            <input
              {...register("mobileNumber")}
              type="tel"
              maxLength={10}
              placeholder="Mobile Number *"
              required
              className="w-full rounded-r-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            />
          </div>
          {errors.mobileNumber && (
            <p className="mt-1 text-xs text-red-600">{errors.mobileNumber.message}</p>
          )}
        </div>
        <div>
          <select
            {...register("loanType")}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          >
            <option value="">Select Loan Type... *</option>
            {HERO_LOAN_TYPES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.loanType && (
            <p className="mt-1 text-xs text-red-600">{errors.loanType.message}</p>
          )}
        </div>
        <div>
          <select
            {...register("loanAmount")}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          >
            <option value="">Loan Amount... *</option>
            {LOAN_AMOUNT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.loanAmount && (
            <p className="mt-1 text-xs text-red-600">{errors.loanAmount.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("city")}
            placeholder="City"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-green py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Get Free Quotes →"}
        </button>
        <p className="text-center text-xs text-sfs-text-secondary">
          🔒 Your information is 100% safe & confidential
        </p>
      </div>
    </form>
  );
}
