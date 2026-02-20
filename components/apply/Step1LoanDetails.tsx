"use client";

import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import type { ApplyFormValues } from "@/lib/validations";
import {
  APPLY_LOAN_CATEGORIES,
  APPLY_LOAN_TYPES_LOANS,
  APPLY_LOAN_TYPES_CREDIT_CARDS,
  APPLY_LOAN_TYPES_INSURANCE,
  TENURE_OPTIONS,
  LOAN_AMOUNT_OPTIONS,
} from "@/lib/constants";

interface Step1Props {
  register: UseFormRegister<ApplyFormValues>;
  watch: UseFormWatch<ApplyFormValues>;
  setValue: UseFormSetValue<ApplyFormValues>;
  errors: FieldErrors<ApplyFormValues>;
}

export function Step1LoanDetails({ register, watch, setValue, errors }: Step1Props) {
  const category = watch("loanCategory");
  const showLoanAmount = category === "loans";

  return (
    <div className="space-y-6">
      <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
        What type of loan are you looking for?
      </h2>

      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">Loan Category</p>
        <div className="grid grid-cols-3 gap-3">
          {APPLY_LOAN_CATEGORIES.map((c) => (
            <label
              key={c.value}
              className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-4 transition ${
                category === c.value ? "border-primary-red bg-red-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="mt-1 text-sm font-medium">{c.label}</span>
              <input
                type="radio"
                value={c.value}
                {...register("loanCategory")}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Loan Type <span className="text-red-600">*</span>
        </label>
        <select
          {...register("loanType")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        >
          <option value="">Select...</option>
          {category === "loans" &&
            APPLY_LOAN_TYPES_LOANS.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          {category === "credit-cards" &&
            APPLY_LOAN_TYPES_CREDIT_CARDS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          {category === "insurance" &&
            APPLY_LOAN_TYPES_INSURANCE.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
        </select>
        {errors.loanType && (
          <p className="mt-1 text-sm text-red-600">{errors.loanType.message}</p>
        )}
      </div>

      {showLoanAmount && (
        <div>
          <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
            Loan Amount Required <span className="text-red-600">*</span>
          </label>
          <select
            {...register("loanAmount")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          >
            <option value="">Select amount...</option>
            {LOAN_AMOUNT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.loanAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Loan Tenure Preferred
        </label>
        <select
          {...register("loanTenure")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        >
          {TENURE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Purpose / Additional Details
        </label>
        <textarea
          {...register("purpose")}
          rows={3}
          placeholder="Describe your requirement in brief..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">
          Do you have any existing loans?
        </p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="true" {...register("existingLoans")} className="h-4 w-4" />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="false" {...register("existingLoans")} className="h-4 w-4" />
            No
          </label>
        </div>
        {watch("existingLoans") === "true" && (
          <div className="mt-3 flex gap-4">
            <div>
              <label className="text-sm text-sfs-text-secondary">Number of loans</label>
              <select
                {...register("existingLoansCount", { valueAsNumber: true })}
                className="ml-2 rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
                <option value={6}>5+</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-sfs-text-secondary">Total EMI/month (₹)</label>
              <input
                type="number"
                {...register("existingEMI", { valueAsNumber: true })}
                className="ml-2 w-32 rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
