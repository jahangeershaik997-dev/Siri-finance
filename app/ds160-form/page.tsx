"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { FORMSPREE_LEAD_ENDPOINT } from "@/lib/wizzfly-constants";

const schema = z.object({
  // Personal
  surname: z.string().min(1, "Required"),
  givenName: z.string().min(1, "Required"),
  fullNameNative: z.string().optional(),
  dateOfBirth: z.string().min(1, "Required"),
  cityOfBirth: z.string().min(1, "Required"),
  countryOfBirth: z.string().min(1, "Required"),
  gender: z.enum(["Male", "Female", "Other"]),
  maritalStatus: z.string().min(1, "Required"),
  nationality: z.string().min(1, "Required"),
  nationalIdNumber: z.string().optional(),
  // Passport
  passportNumber: z.string().min(1, "Required"),
  passportIssueDate: z.string().min(1, "Required"),
  passportExpiryDate: z.string().min(1, "Required"),
  passportIssuingAuthority: z.string().min(1, "Required"),
  // Contact
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1, "Required"),
  // Travel
  purposeOfTrip: z.string().min(1, "Required"),
  intendedLengthOfStay: z.string().min(1, "Required"),
  intendedArrivalDate: z.string().optional(),
  addressInUS: z.string().optional(),
  // Work / Study
  occupation: z.string().min(1, "Required"),
  employerOrSchool: z.string().optional(),
  employerOrSchoolAddress: z.string().optional(),
  // Family
  spouseFullName: z.string().optional(),
  spouseDOB: z.string().optional(),
  spouseNationality: z.string().optional(),
  // Security (yes/no)
  visitedUSBefore: z.enum(["Yes", "No"]),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const defaultValues: Partial<FormData> = {
  gender: "Male",
  country: "India",
  countryOfBirth: "India",
  visitedUSBefore: "No",
};

function downloadFormData(data: FormData) {
  const text = Object.entries(data)
    .map(([k, v]) => (v ? `${k}: ${v}` : ""))
    .filter(Boolean)
    .join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `DS160-form-data-${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DS160FormPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "DS160 Form Submission - Wizzfly",
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
      downloadFormData(data);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-wizzfly-bg-light py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="font-poppins text-2xl font-bold text-green-700">Form submitted successfully</h1>
          <p className="mt-4 text-wizzfly-text-secondary">
            Your DS160 form data has been sent to us. We have also downloaded a copy to your device.
          </p>
          <p className="mt-2 text-sm text-wizzfly-text-secondary">
            Our team will review and contact you if needed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => downloadFormData(form.getValues())}
              className="rounded-lg bg-primary-blue px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Download my data again
            </button>
            <Link href="/resources" className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50">
              Back to Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wizzfly-bg-light py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/resources" className="text-primary-blue hover:underline">← Resources</Link>
          <h1 className="mt-4 font-poppins text-3xl font-bold text-wizzfly-text-primary">
            DS160 Form — Fill all required fields
          </h1>
          <p className="mt-2 text-wizzfly-text-secondary">
            Fill the fields below. You can download your data after submit and we will also receive a copy.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Personal */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Personal information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Surname *</label>
                <input {...form.register("surname")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.surname && <p className="mt-1 text-xs text-red-600">{form.formState.errors.surname.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Given name *</label>
                <input {...form.register("givenName")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.givenName && <p className="mt-1 text-xs text-red-600">{form.formState.errors.givenName.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Full name in native alphabet</label>
                <input {...form.register("fullNameNative")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Date of birth *</label>
                <input {...form.register("dateOfBirth")} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.dateOfBirth && <p className="mt-1 text-xs text-red-600">{form.formState.errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">City of birth *</label>
                <input {...form.register("cityOfBirth")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.cityOfBirth && <p className="mt-1 text-xs text-red-600">{form.formState.errors.cityOfBirth.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Country of birth *</label>
                <input {...form.register("countryOfBirth")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.countryOfBirth && <p className="mt-1 text-xs text-red-600">{form.formState.errors.countryOfBirth.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Gender *</label>
                <select {...form.register("gender")} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Marital status *</label>
                <select {...form.register("maritalStatus")} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                {form.formState.errors.maritalStatus && <p className="mt-1 text-xs text-red-600">{form.formState.errors.maritalStatus.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Nationality *</label>
                <input {...form.register("nationality")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.nationality && <p className="mt-1 text-xs text-red-600">{form.formState.errors.nationality.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">National ID number</label>
                <input {...form.register("nationalIdNumber")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>
          </section>

          {/* Passport */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Passport information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Passport number *</label>
                <input {...form.register("passportNumber")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.passportNumber && <p className="mt-1 text-xs text-red-600">{form.formState.errors.passportNumber.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Issue date *</label>
                <input {...form.register("passportIssueDate")} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.passportIssueDate && <p className="mt-1 text-xs text-red-600">{form.formState.errors.passportIssueDate.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Expiry date *</label>
                <input {...form.register("passportExpiryDate")} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.passportExpiryDate && <p className="mt-1 text-xs text-red-600">{form.formState.errors.passportExpiryDate.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Issuing authority *</label>
                <input {...form.register("passportIssuingAuthority")} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="e.g. Government of India" />
                {form.formState.errors.passportIssuingAuthority && <p className="mt-1 text-xs text-red-600">{form.formState.errors.passportIssuingAuthority.message}</p>}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Contact & address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Email *</label>
                <input {...form.register("email")} type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.email && <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone *</label>
                <input {...form.register("phone")} type="tel" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.phone && <p className="mt-1 text-xs text-red-600">{form.formState.errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Address *</label>
                <input {...form.register("address")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.address && <p className="mt-1 text-xs text-red-600">{form.formState.errors.address.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">City *</label>
                <input {...form.register("city")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.city && <p className="mt-1 text-xs text-red-600">{form.formState.errors.city.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">State / Province</label>
                <input {...form.register("state")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Postal code</label>
                <input {...form.register("postalCode")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Country *</label>
                <input {...form.register("country")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.country && <p className="mt-1 text-xs text-red-600">{form.formState.errors.country.message}</p>}
              </div>
            </div>
          </section>

          {/* Travel */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Travel information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Purpose of trip *</label>
                <select {...form.register("purposeOfTrip")} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="">Select</option>
                  <option value="Business">Business</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Study">Study</option>
                  <option value="Work">Work</option>
                  <option value="Family">Family visit</option>
                  <option value="Other">Other</option>
                </select>
                {form.formState.errors.purposeOfTrip && <p className="mt-1 text-xs text-red-600">{form.formState.errors.purposeOfTrip.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Intended length of stay *</label>
                <input {...form.register("intendedLengthOfStay")} placeholder="e.g. 2 weeks" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.intendedLengthOfStay && <p className="mt-1 text-xs text-red-600">{form.formState.errors.intendedLengthOfStay.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Intended arrival date</label>
                <input {...form.register("intendedArrivalDate")} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Address in the U.S. (if known)</label>
                <input {...form.register("addressInUS")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>
          </section>

          {/* Work / Study */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Work / study
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Occupation *</label>
                <input {...form.register("occupation")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                {form.formState.errors.occupation && <p className="mt-1 text-xs text-red-600">{form.formState.errors.occupation.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Employer or school name</label>
                <input {...form.register("employerOrSchool")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Employer or school address</label>
                <input {...form.register("employerOrSchoolAddress")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>
          </section>

          {/* Family (optional) */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Spouse (if applicable)
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Spouse full name</label>
                <input {...form.register("spouseFullName")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Spouse date of birth</label>
                <input {...form.register("spouseDOB")} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Spouse nationality</label>
                <input {...form.register("spouseNationality")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
              Additional information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Have you been to the U.S. before? *</label>
                <select {...form.register("visitedUSBefore")} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Any additional information</label>
                <textarea {...form.register("additionalInfo")} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              </div>
            </div>
          </section>

          {status === "error" && (
            <p className="text-red-600">Something went wrong. Please try again or contact us.</p>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-green-700 disabled:opacity-70"
            >
              {status === "loading" ? "Submitting..." : "Submit & download my data"}
            </button>
            <Link href="/resources" className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
