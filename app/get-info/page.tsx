"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { heroFormSchema, type HeroFormValues } from "@/lib/validations";
import { HERO_LOAN_TYPES, LOAN_AMOUNT_OPTIONS } from "@/lib/constants";

export default function GetInfoPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: { city: "Hyderabad" },
  });
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = async (data: HeroFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "get_info",
          data: {
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            loanType: data.loanType,
            loanAmount: data.loanAmount,
            city: data.city,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit");
      toast.success("We've received your details. Our team will contact you shortly.");
      reset({ city: "Hyderabad" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-sfs-text-secondary">
        <Link href="/" className="hover:text-primary-red">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-sfs-text-primary">Get info</span>
      </nav>
      <h1 className="font-poppins text-2xl font-bold text-sfs-text-primary">
        Get loan info
      </h1>
      <p className="mt-2 text-sfs-text-secondary">
        Share this page link with customers so they can submit their details. Submissions are saved and visible in Admin → Submissions.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-soft"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full name *</label>
            <input
              {...register("fullName")}
              placeholder="Full name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-red"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mobile number *</label>
            <div className="flex">
              <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm">+91</span>
              <input
                {...register("mobileNumber")}
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile"
                className="w-full rounded-r-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-red"
              />
            </div>
            {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Loan type *</label>
            <select
              {...register("loanType")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-red"
            >
              <option value="">Select...</option>
              {HERO_LOAN_TYPES.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.loanType && <p className="mt-1 text-sm text-red-600">{errors.loanType.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Loan amount *</label>
            <select
              {...register("loanAmount")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-red"
            >
              <option value="">Select...</option>
              {LOAN_AMOUNT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.loanAmount && <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">City *</label>
            <input
              {...register("city")}
              placeholder="City"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-red"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-red py-3 font-semibold text-white hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Submitting…" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
