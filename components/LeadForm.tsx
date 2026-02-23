"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  FORMSPREE_LEAD_ENDPOINT,
  LEAD_FORM_I_AM,
  LEAD_FORM_I_WANT,
  DS160_REFERENCE,
} from "@/lib/wizzfly-constants";
import { cn } from "@/lib/utils";

const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+1", label: "+1 USA/Canada" },
  { value: "+44", label: "+44 UK" },
  { value: "+61", label: "+61 Australia" },
  { value: "+971", label: "+971 UAE" },
  { value: "+49", label: "+49 Germany" },
  { value: "+65", label: "+65 Singapore" },
  { value: "+64", label: "+64 New Zealand" },
];

const schema = z.object({
  iAm: z.string().optional(),
  iWant: z.string().optional(),
  countryCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  whatsapp: z.boolean().optional(),
  terms: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  iAm: "Student",
  iWant: "Study",
  countryCode: "+91",
  phone: "",
  email: "",
  whatsapp: false,
  terms: false,
};

export function LeadForm({ variant = "hero", className }: { variant?: "hero" | "sticky"; className?: string }) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("loading");
    const payload = {
      "I am": data.iAm ?? "",
      "I want to": data.iWant ?? "",
      Phone: data.countryCode && data.phone ? `${data.countryCode} ${data.phone}` : "",
      Email: data.email ?? "",
      "Contact on WhatsApp": data.whatsapp ? "Yes" : "No",
      _subject: `Whizzfly Lead: ${data.iAm ?? ""} - ${data.iWant ?? ""}`,
    };
    try {
      const res = await fetch(FORMSPREE_LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await fetch("/api/send-to-slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "lead", data: payload }),
      }).catch(() => {});
      await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "lead", data: payload }),
      }).catch(() => {});
      if (res.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("rounded-xl bg-white p-6 shadow-lg", variant === "sticky" && "border border-gray-200", className)}
      >
        <div className="text-center text-green-600">
          <p className="font-semibold">Thank you!</p>
          <p className="mt-1 text-sm">We will contact you shortly for your free consultation.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={variant === "hero" ? { opacity: 0, x: 20 } : undefined}
      animate={variant === "hero" ? { opacity: 1, x: 0 } : undefined}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "rounded-xl bg-white p-6 shadow-lg",
        variant === "sticky" && "border border-gray-200",
        className
      )}
    >
      <h3 className="text-lg font-bold text-wizzfly-text-primary">Sign up for free expert consultation</h3>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">I am</label>
          <select
            {...register("iAm")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
          >
            {LEAD_FORM_I_AM.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.iAm && <p className="mt-1 text-xs text-red-600">{errors.iAm.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">I want to</label>
          <select
            {...register("iWant")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
          >
            {LEAD_FORM_I_WANT.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.iWant && <p className="mt-1 text-xs text-red-600">{errors.iWant.message}</p>}
        </div>

        <div className="flex gap-2">
          <div className="w-28 shrink-0">
            <label className="mb-1 block text-sm font-medium text-gray-700">Code</label>
            <select
              {...register("countryCode")}
              className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
            >
              {countryCodes.map((c) => (
                <option key={c.value} value={c.value}>{c.value}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="your@email.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("whatsapp")} className="rounded border-gray-300" />
          <span className="text-sm text-gray-700">Contact me on WhatsApp</span>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox" {...register("terms")} className="mt-1 rounded border-gray-300" />
          <span className="text-sm text-gray-600">I agree to the Terms & Conditions</span>
        </label>
        {errors.terms && <p className="text-xs text-red-600">{errors.terms.message}</p>}

        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="w-full rounded-lg bg-primary-orange py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
        >
          {submitStatus === "loading" ? "Submitting..." : "Submit"}
        </button>
        {submitStatus === "error" && (
          <p className="text-center text-sm text-red-600">Something went wrong. Please try again or call us.</p>
        )}
      </div>

      <p className="mt-4 text-center text-sm font-medium text-primary-orange">Get Free Counselling</p>

      {/* DS160 notice - bold and accessible */}
      <p className="mt-4 text-center text-sm">
        <strong className="font-bold text-wizzfly-text-primary">
          {DS160_REFERENCE.text}{" "}
          <a href="/contact" className="text-primary-blue underline hover:no-underline">
            contact us for the DS160 FORM by team
          </a>
          .
        </strong>
      </p>
    </motion.form>
  );
}
