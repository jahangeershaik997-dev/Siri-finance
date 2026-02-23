"use client";

import Link from "next/link";
import { DS160_REFERENCE } from "@/lib/wizzfly-constants";

/** Bold, accessible DS160 reference notice for all users */
export function DS160Notice() {
  return (
    <section className="bg-primary-orange/10 py-4" aria-label="DS160 form reference">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-base font-bold text-wizzfly-text-primary sm:text-lg">
          <strong>
            While filling DS160 form please refer this{" "}
            <Link href="/contact" className="text-primary-blue underline hover:no-underline focus:outline focus:ring-2 focus:ring-primary-blue focus:ring-offset-2">
              contact us for the DS160 FORM by team
            </Link>
            . (Accessible for all.)
          </strong>
        </p>
      </div>
    </section>
  );
}
