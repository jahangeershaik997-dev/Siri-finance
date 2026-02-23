"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { COMPANY, FORMSPREE_CONTACT_ENDPOINT, REFERENCE_CONSULTANT_OPTIONS } from "@/lib/wizzfly-constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

const subjects = [
  "General Enquiry",
  "Visa Enquiry",
  "Study Abroad",
  "Work Visa",
  "PR / Migration",
  "DS160 / Form Assistance",
  "Other",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { subject: "", referenceConsultant: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    const payload = {
      "Reference Consultant": data.referenceConsultant ?? "",
      name: data.name ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      subject: data.subject ?? "",
      message: data.message ?? "",
      _subject: `Contact: ${data.subject ?? "Enquiry"} - Wizzfly Overseas`,
    };
    try {
      const res = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      await fetch("/api/send-to-slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", data: payload }),
      });
      await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", data: payload }),
      }).catch(() => {});
      toast.success("Message sent. We will get back to you soon!");
      form.reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-wizzfly-bg-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-3xl font-bold text-wizzfly-text-primary">
          Contact Us
        </h1>
        <p className="mt-2 text-wizzfly-text-secondary">
          Get in touch for visa, immigration, or overseas education enquiries.
        </p>
        <p className="mt-2 text-sm font-bold text-wizzfly-text-primary">
          <strong>While filling DS160 form please refer this—contact us for the DS160 FORM by team. (Accessible for all.)</strong>
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="font-poppins text-xl font-bold text-wizzfly-text-primary">
              Send a Message
            </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Reference Consultant (Whose client is this?)</label>
                <select
                  {...form.register("referenceConsultant")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                >
                  <option value="">Select consultant</option>
                  {REFERENCE_CONSULTANT_OPTIONS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  {...form.register("name")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  {...form.register("phone")}
                  type="tel"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Subject</label>
                <select
                  {...form.register("subject")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
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
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                />
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary-orange py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-poppins text-xl font-bold text-wizzfly-text-primary">
                Office & Contact
              </h2>
              <p className="mt-4 text-wizzfly-text-secondary">{COMPANY.address}</p>
              <p className="mt-2">
                <a href={`tel:+91${COMPANY.phone}`} className="font-medium text-primary-blue hover:underline">
                  +91 {COMPANY.phone}
                </a>
              </p>
              <p className="mt-2">
                <a href={`mailto:${COMPANY.email}`} className="text-primary-blue underline hover:no-underline">
                  {COMPANY.email}
                </a>
              </p>
              <p className="mt-2">
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
                  WhatsApp
                </a>
              </p>
              <p className="mt-2 text-sm text-wizzfly-text-secondary">{COMPANY.hours}</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <iframe
                title="Wizzfly Overseas - Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.585678789!2d78.4867!3d17.385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a333d%3A0xc4242849b24b84!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
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
