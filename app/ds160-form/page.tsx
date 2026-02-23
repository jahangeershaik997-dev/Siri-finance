"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  DS160_SECTIONS,
  DS160_FIELDS,
  DS160_FIELDS_BY_SECTION,
} from "@/lib/ds160-fields";
import { getFormspreeLeadEndpoint, REFERENCE_CONSULTANT_OPTIONS } from "@/lib/wizzfly-constants";

/** Build schema: every DS160 field optional string */
const ds160SchemaShape = Object.fromEntries(
  Object.keys(DS160_FIELDS).map((k) => [k, z.string().optional()])
) as Record<string, z.ZodOptional<z.ZodString>>;
const schema = z.object(ds160SchemaShape);

type FormData = z.infer<typeof schema>;

const defaultValues: Partial<FormData> = Object.fromEntries(
  Object.keys(DS160_FIELDS).map((k) => [k, ""])
);

function downloadFormData(data: FormData) {
  const lines = Object.entries(data)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => `${DS160_FIELDS[k] ?? k}: ${v}`);
  const text = lines.join("\n");
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
      // Build Formspree payload with human-readable labels; put Reference Consultant first so it shows at top
      const formspreePayload: Record<string, string> = {
        _subject: "DS160 Form Submission - Wizzfly",
      };
      if (data.referenceConsultant != null && String(data.referenceConsultant).trim() !== "") {
        formspreePayload["Reference Consultant (Whose client is this?)"] = String(data.referenceConsultant).trim();
      }
      Object.entries(data).forEach(([key, value]) => {
        if (key === "referenceConsultant") return;
        const v = value == null ? "" : String(value).trim();
        if (v === "") return;
        const label = DS160_FIELDS[key] ?? key;
        formspreePayload[label] = v;
      });

      const ref = data.referenceConsultant ? String(data.referenceConsultant).trim() : undefined;
      const endpoint = getFormspreeLeadEndpoint(ref);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formspreePayload),
      });
      if (!res.ok) throw new Error("Formspree failed");

      await fetch("/api/send-to-slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "ds160", data: formspreePayload }),
      });

      await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "ds160", data: formspreePayload }),
      });

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
          <h1 className="font-poppins text-2xl font-bold text-green-700">
            Form submitted successfully
          </h1>
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
            <Link
              href="/resources"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
            >
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
          <Link href="/resources" className="text-primary-blue hover:underline">
            ← Resources
          </Link>
          <h1 className="mt-4 font-poppins text-3xl font-bold text-wizzfly-text-primary">
            DS160 Form — All fields optional
          </h1>
          <p className="mt-2 text-wizzfly-text-secondary">
            Fill only the fields that apply. Data is sent to us and to Slack; you can download a copy after submit.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {DS160_SECTIONS.map((section) => {
            const fieldKeys = DS160_FIELDS_BY_SECTION[section.id];
            if (!fieldKeys?.length) return null;
            return (
              <section key={section.id}>
                <h2 className="mb-4 border-b border-gray-200 pb-2 font-poppins text-lg font-bold text-wizzfly-text-primary">
                  {section.title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fieldKeys.map((key) => (
                    <div
                      key={key}
                      className={
                        (DS160_FIELDS[key]?.length ?? 0) > 50 ? "sm:col-span-2" : ""
                      }
                    >
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        {DS160_FIELDS[key]}
                      </label>
                      {key === "referenceConsultant" ? (
                        <select
                          {...form.register(key)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                        >
                          <option value="">Select consultant</option>
                          {REFERENCE_CONSULTANT_OPTIONS.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          {...form.register(key)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                          placeholder=""
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {status === "error" && (
            <p className="text-red-600">
              Something went wrong. Please try again or contact us.
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-green-700 disabled:opacity-70"
            >
              {status === "loading" ? "Submitting..." : "Submit & download my data"}
            </button>
            <Link
              href="/resources"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
