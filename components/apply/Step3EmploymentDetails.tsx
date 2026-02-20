"use client";

import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import type { ApplyFormValues } from "@/lib/validations";
import {
  EMPLOYMENT_TYPES,
  MONTHLY_SALARY_OPTIONS,
  SALARY_BANKS,
  EXPERIENCE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  TURNOVER_OPTIONS,
  PROFESSION_OPTIONS,
  CIBIL_OPTIONS,
} from "@/lib/constants";

interface Step3Props {
  register: UseFormRegister<ApplyFormValues>;
  watch: UseFormWatch<ApplyFormValues>;
  errors: FieldErrors<ApplyFormValues>;
}

export function Step3EmploymentDetails({ register, watch, errors }: Step3Props) {
  const employmentType = watch("employmentType");
  const isSalaried =
    employmentType === "salaried" || employmentType === "government";
  const isSelfEmployedBiz = employmentType === "self-employed-business";
  const isSelfEmployedPro = employmentType === "self-employed-professional";
  const isStudent = employmentType === "student";
  const isRetired = employmentType === "retired";
  const propertyOwned = watch("propertyOwned");

  return (
    <div className="space-y-6">
      <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
        Your employment and income details
      </h2>

      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">
          Employment Type <span className="text-red-600">*</span>
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EMPLOYMENT_TYPES.map((e) => (
            <label
              key={e.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition ${
                employmentType === e.value
                  ? "border-primary-red bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">{e.icon}</span>
              <span className="text-sm font-medium">{e.label}</span>
              <input
                type="radio"
                value={e.value}
                {...register("employmentType")}
                className="sr-only"
              />
            </label>
          ))}
        </div>
        {errors.employmentType && (
          <p className="mt-1 text-sm text-red-600">{errors.employmentType.message}</p>
        )}
      </div>

      {isSalaried && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Company / Organization Name
            </label>
            <input
              {...register("companyName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Designation
            </label>
            <input
              {...register("designation")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Monthly Net Salary
            </label>
            <select
              {...register("monthlyIncome")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            >
              <option value="">Select...</option>
              {MONTHLY_SALARY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Salary Account Bank
            </label>
            <select
              {...register("salaryBank")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            >
              <option value="">Select...</option>
              {SALARY_BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
                Years in Current Job
              </label>
              <select
                {...register("yearsInCurrentJob")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
              >
                <option value="">Select...</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
                Total Work Experience
              </label>
              <select
                {...register("totalWorkExperience")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
              >
                <option value="">Select...</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {isSelfEmployedBiz && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Business Name
            </label>
            <input
              {...register("businessName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Business Type
            </label>
            <select
              {...register("businessType")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Industry
            </label>
            <select
              {...register("industry")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Annual Business Turnover
            </label>
            <select
              {...register("annualTurnover")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {TURNOVER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Business Vintage
            </label>
            <select
              {...register("businessVintage")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-sfs-text-primary">GST Registered?</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="Yes" {...register("gstRegistered")} className="h-4 w-4" />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="No" {...register("gstRegistered")} className="h-4 w-4" />
                No
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="In Process" {...register("gstRegistered")} className="h-4 w-4" />
                In Process
              </label>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-sfs-text-primary">ITR Filed?</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="Yes - Last 2 Years" {...register("itrFiled")} className="h-4 w-4" />
                Yes - Last 2 Years
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="Yes - Last 1 Year" {...register("itrFiled")} className="h-4 w-4" />
                Yes - Last 1 Year
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="No" {...register("itrFiled")} className="h-4 w-4" />
                No
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="Not Applicable" {...register("itrFiled")} className="h-4 w-4" />
                N/A
              </label>
            </div>
          </div>
        </>
      )}

      {isSelfEmployedPro && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Profession
            </label>
            <select
              {...register("profession")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {PROFESSION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Practice Name
            </label>
            <input
              {...register("practiceName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Years of Practice
            </label>
            <select
              {...register("yearsOfPractice")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Annual Income
            </label>
            <select
              {...register("annualIncome")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {TURNOVER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {isStudent && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Course Name
            </label>
            <input
              {...register("courseName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              College/University
            </label>
            <input
              {...register("collegeUniversity")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Co-Applicant Name (Parent/Guardian)
            </label>
            <input
              {...register("coApplicantName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
        </>
      )}

      {isRetired && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Monthly Pension (₹)
            </label>
            <input
              {...register("monthlyPension")}
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
              Pension Bank
            </label>
            <select
              {...register("pensionBank")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            >
              <option value="">Select...</option>
              {SALARY_BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          CIBIL/Credit Score <span className="text-red-600">*</span>
        </label>
        <select
          {...register("cibilScore")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        >
          <option value="">Select...</option>
          {CIBIL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.cibilScore && (
          <p className="mt-1 text-sm text-red-600">{errors.cibilScore.message}</p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">Property Owned?</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="true" {...register("propertyOwned")} className="h-4 w-4" />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="false" {...register("propertyOwned")} className="h-4 w-4" />
            No
          </label>
        </div>
        {propertyOwned === "true" && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm text-sfs-text-secondary">Property Type</label>
              <select
                {...register("propertyType")}
                className="ml-2 rounded border border-gray-300 px-2 py-1 text-sm"
              >
                <option value="">Select...</option>
                <option value="Residential House">Residential House</option>
                <option value="Flat/Apartment">Flat/Apartment</option>
                <option value="Commercial Property">Commercial Property</option>
                <option value="Land/Plot">Land/Plot</option>
                <option value="Multiple Properties">Multiple Properties</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-sfs-text-secondary">Property Location</label>
              <input
                {...register("propertyLocation")}
                className="ml-2 rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
