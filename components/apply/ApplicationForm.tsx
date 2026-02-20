"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { applyFormSchema, type ApplyFormValues } from "@/lib/validations";
import { getUTMParams, generateReferenceNumber } from "@/lib/utils";
import { FORMSPREE_APPLY_ENDPOINT } from "@/lib/constants";
import { ProgressBar } from "./ProgressBar";
import { Step1LoanDetails } from "./Step1LoanDetails";
import { Step2PersonalDetails } from "./Step2PersonalDetails";
import { Step3EmploymentDetails } from "./Step3EmploymentDetails";
import { Step4ReviewSubmit } from "./Step4ReviewSubmit";
import { Step5Success } from "./Step5Success";

const STORAGE_KEY = "sfs_apply_form";
const defaultValues: Partial<ApplyFormValues> = {
  loanCategory: "loans",
  loanType: "",
  city: "Hyderabad",
  state: "Telangana",
  whatsappSameAsMobile: true,
  existingLoans: undefined,
  propertyOwned: undefined,
};

interface ApplicationFormProps {
  initialLoanType?: string;
  initialCategory?: "loans" | "credit-cards" | "insurance";
}

export function ApplicationForm({
  initialLoanType = "",
  initialCategory = "loans",
}: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<{
    ref: string;
    name: string;
    loanType: string;
    loanAmount: string;
    submittedAt: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      ...defaultValues,
      loanCategory: initialCategory,
      loanType: initialLoanType,
    },
  });

  const { register, watch, setValue, formState: { errors }, handleSubmit, trigger } = form;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.entries(parsed).forEach(([k, v]) => {
          if (v !== undefined && v !== null) form.setValue(k as keyof ApplyFormValues, v as never);
        });
      }
    } catch {
      // ignore
    }
  }, [form.setValue]);

  const saveToStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    const values = form.getValues();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [form]);

  useEffect(() => {
    const sub = form.watch(() => saveToStorage());
    return () => sub.unsubscribe();
  }, [form, saveToStorage]);

  const validateStep = async (s: number) => {
    if (s === 1) return await trigger(["loanCategory", "loanType", "loanAmount"]);
    if (s === 2) return await trigger(["fullName", "mobileNumber", "city", "state"]);
    if (s === 3) return await trigger(["employmentType", "cibilScore"]);
    if (s === 4) return await trigger(["consentContact", "consentTerms"]);
    return true;
  };

  const onNext = async () => {
    const ok = await validateStep(step);
    if (!ok) {
      toast.error("Please fill required fields correctly.");
      return;
    }
    saveToStorage();
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const onBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onFormSubmit = async (data: ApplyFormValues) => {
    setIsSubmitting(true);
    const ref = generateReferenceNumber();
    try {
      const utm = typeof window !== "undefined" ? getUTMParams() : {};
      const whatsappNumber = data.whatsappSameAsMobile ? data.mobileNumber : data.whatsappNumber;
      const formspreePayload: Record<string, string | number | boolean | undefined> = {
        _subject: `SFS Apply: ${data.fullName} - ${data.loanType}`,
        referenceNumber: ref,
        source: "apply-page",
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        whatsappNumber,
        email: data.email,
        loanCategory: data.loanCategory,
        loanType: data.loanType,
        loanAmount: data.loanAmount,
        city: data.city,
        state: data.state,
        employmentType: data.employmentType,
        companyName: data.companyName,
        monthlySalary: data.monthlyIncome,
        cibilScore: data.cibilScore,
        consentContact: data.consentContact === true || data.consentContact === "true" || data.consentContact === "on",
        consentTerms: data.consentTerms === true || data.consentTerms === "true" || data.consentTerms === "on",
        existingLoans: data.existingLoans === "true" || data.existingLoans === true,
        propertyOwned: data.propertyOwned === "true" || data.propertyOwned === true,
        ...utm,
      };
      const res = await fetch(FORMSPREE_APPLY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formspreePayload),
      });
      let json: { error?: string; errors?: { message: string }[] };
      try {
        json = await res.json();
      } catch {
        throw new Error("Network error. Please check your connection and try again.");
      }
      if (!res.ok) {
        const msg = json?.error || (Array.isArray(json?.errors) ? json.errors.map((e: { message: string }) => e.message).join(". ") : null) || "Failed to submit. Please try again.";
        throw new Error(msg);
      }
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "apply", data: formspreePayload }),
      }).catch(() => {});
      const whatsappMsg = `*New Application (SFS)*\nRef: ${ref}\nName: ${data.fullName}\nPhone: ${data.mobileNumber}\nLoan: ${data.loanType}\nAmount: ${data.loanAmount}\nCity: ${data.city}`;
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
      setSubmitted({
        ref,
        name: data.fullName || "Applicant",
        loanType: data.loanType || "",
        loanAmount: data.loanAmount || "",
        submittedAt: new Date().toLocaleString("en-IN"),
      });
      sessionStorage.removeItem(STORAGE_KEY);
      toast.success("Application submitted successfully!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Step5Success
        referenceNumber={submitted.ref}
        fullName={submitted.name}
        loanType={submitted.loanType}
        loanAmount={submitted.loanAmount}
        submittedAt={submitted.submittedAt}
        onApplyAnother={() => {
          setSubmitted(null);
          setStep(1);
          form.reset({ ...defaultValues, loanCategory: "loans", loanType: "" });
        }}
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
      <ProgressBar currentStep={step} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Step1LoanDetails
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="rounded-lg bg-primary-red px-8 py-3 font-semibold text-white"
              >
                Next: Personal Details →
              </button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Step2PersonalDetails register={register} watch={watch} errors={errors} />
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={onBack} className="text-primary-red hover:underline">
                ← Back
              </button>
              <button
                type="button"
                onClick={onNext}
                className="rounded-lg bg-primary-red px-8 py-3 font-semibold text-white"
              >
                Next: Employment Details →
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Step3EmploymentDetails register={register} watch={watch} errors={errors} />
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={onBack} className="text-primary-red hover:underline">
                ← Back
              </button>
              <button
                type="button"
                onClick={onNext}
                className="rounded-lg bg-primary-red px-8 py-3 font-semibold text-white"
              >
                Next: Review & Submit →
              </button>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Step4ReviewSubmit
              register={register}
              watch={watch}
              errors={errors}
              onEditStep={setStep}
              isSubmitting={isSubmitting}
            />
            <div className="mt-6 flex justify-start">
              <button type="button" onClick={onBack} className="text-primary-red hover:underline">
                ← Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
