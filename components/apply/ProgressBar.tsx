"use client";

import { cn } from "@/lib/utils";

const steps = [
  { num: 1, label: "Loan Details" },
  { num: 2, label: "Personal Info" },
  { num: 3, label: "Employment & Income" },
  { num: 4, label: "Submit" },
];

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={s.num} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold",
                  currentStep > s.num && "border-primary-green bg-primary-green text-white",
                  currentStep === s.num && "border-primary-red bg-primary-red text-white",
                  currentStep < s.num && "border-gray-300 bg-white text-gray-400"
                )}
              >
                {currentStep > s.num ? "\u2713" : s.num}
              </div>
              <span className="mt-1 hidden text-xs font-medium text-sfs-text-secondary sm:block">
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-1 flex-1 rounded sm:mx-2",
                  currentStep > s.num ? "bg-primary-green" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
