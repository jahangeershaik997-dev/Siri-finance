"use client";

import Link from "next/link";

/** Bold, accessible DS160 reference notice + big green button to fill all required fields */
export function DS160Notice() {
  return (
    <section className="bg-primary-orange/10 py-6 sm:py-8" aria-label="DS160 form reference">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-base font-bold text-wizzfly-text-primary sm:text-lg">
          <strong>
            While filling DS160 form please refer this document — fill all fields required on the form.
          </strong>
        </p>
        <Link
          href="/ds160-form"
          className="mt-4 inline-block rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-700 focus:outline focus:ring-4 focus:ring-green-400"
        >
          DS160 Form — Fill All Required Fields
        </Link>
        <p className="mt-3 text-sm text-wizzfly-text-secondary">
          Fill the form online, then download your data or get the form.{" "}
          <Link href="/contact" className="text-primary-blue font-medium hover:underline">
            Contact us
          </Link>{" "}
          for assistance. (Accessible for all.)
        </p>
      </div>
    </section>
  );
}
