"use client";

import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import type { ApplyFormValues } from "@/lib/validations";
import { INDIAN_STATES } from "@/lib/utils";

interface Step2Props {
  register: UseFormRegister<ApplyFormValues>;
  watch: UseFormWatch<ApplyFormValues>;
  errors: FieldErrors<ApplyFormValues>;
}

export function Step2PersonalDetails({ register, watch, errors }: Step2Props) {
  const whatsappSame = watch("whatsappSameAsMobile");

  return (
    <div className="space-y-6">
      <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
        Tell us about yourself
      </h2>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          {...register("fullName")}
          placeholder="Enter your full name as per Aadhaar"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Mobile Number <span className="text-red-600">*</span>
        </label>
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm">
            +91
          </span>
          <input
            {...register("mobileNumber")}
            type="tel"
            maxLength={10}
            className="w-full rounded-r-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          />
        </div>
        <p className="mt-1 text-xs text-sfs-text-secondary">We will contact you on this number</p>
        {errors.mobileNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("whatsappSameAsMobile")}
            className="h-4 w-4 rounded border-gray-300"
          />
          Same as mobile number
        </label>
        {!whatsappSame && (
          <div className="mt-2 flex">
            <span className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm">
              +91
            </span>
            <input
              {...register("whatsappNumber")}
              type="tel"
              maxLength={10}
              placeholder="WhatsApp number"
              className="w-full rounded-r-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
        )}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="your.email@example.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">Date of Birth</label>
        <input
          {...register("dateOfBirth")}
          type="date"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">Gender</p>
        <div className="flex gap-4">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="flex items-center gap-2">
              <input type="radio" value={g} {...register("gender")} className="h-4 w-4" />
              {g}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-sfs-text-primary">Marital Status</p>
        <div className="flex flex-wrap gap-4">
          {["Single", "Married", "Divorced", "Widowed"].map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input type="radio" value={s} {...register("maritalStatus")} className="h-4 w-4" />
              {s}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Residential Address
        </label>
        <textarea
          {...register("residentialAddress")}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
            City <span className="text-red-600">*</span>
          </label>
          <input
            {...register("city")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
            State <span className="text-red-600">*</span>
          </label>
          <select
            {...register("state")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state?.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">PIN Code</label>
        <input
          {...register("pinCode")}
          type="text"
          maxLength={6}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">
          Aadhaar Number
        </label>
        <input
          {...register("aadhaarNumber")}
          type="text"
          maxLength={12}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
        />
        <p className="mt-1 text-xs text-sfs-text-secondary">
          Required for loan processing. Your data is encrypted and safe.
        </p>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-sfs-text-primary">PAN Number</label>
        <input
          {...register("panNumber")}
          type="text"
          maxLength={10}
          placeholder="AAAAA0000A"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 uppercase outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          onInput={(e) => {
            (e.target as HTMLInputElement).value = (
              e.target as HTMLInputElement
            ).value.toUpperCase();
          }}
        />
      </div>
    </div>
  );
}
