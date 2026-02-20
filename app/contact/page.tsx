"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

const subjects = [
  "General Enquiry",
  "Loan Enquiry",
  "Complaint",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { subject: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "service-page",
          fullName: data.name,
          mobileNumber: data.phone,
          email: data.email,
          purpose: `Contact form: ${data.subject} - ${data.message}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      toast.success("Message sent. We will get back to you soon!");
      form.reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sfs-bg-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-3xl font-bold text-sfs-text-primary">
          Contact Us
        </h1>
        <p className="mt-2 text-sfs-text-secondary">
          Get in touch for loan enquiries or any assistance.
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="rounded-card border border-gray-200 bg-white p-6 shadow-soft">
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
              Send a Message
            </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Name *</label>
                <input
                  {...form.register("name")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue"
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone *</label>
                <input
                  {...form.register("phone")}
                  type="tel"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue"
                />
                {form.formState.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  {...form.register("email")}
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Subject *</label>
                <select
                  {...form.register("subject")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue"
                >
                  <option value="">Select...</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {form.formState.errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Message *</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue"
                />
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary-red py-3 font-semibold text-white disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div>
            <div className="rounded-card border border-gray-200 bg-white p-6 shadow-soft">
              <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
                Office & Contact
              </h2>
              <p className="mt-4 text-sfs-text-secondary">{COMPANY.address}</p>
              <p className="mt-2">
                <a href={`tel:${COMPANY.phone}`} className="font-medium text-primary-red">
                  {COMPANY.phone}
                </a>
              </p>
              <p className="mt-2">
                <a href={`mailto:${COMPANY.email}`} className="text-primary-blue underline">
                  {COMPANY.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-sfs-text-secondary">{COMPANY.hours}</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-card border border-gray-200 bg-white shadow-soft">
              <iframe
                title="Office location"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.585678789!2d78.446!3d17.4375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzE1LjAiTiA3OMKwMjYnNDUuOSJF!5e0!3m2!1sen!2sin!4v1`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
