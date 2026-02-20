"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getServicesByCategory } from "@/data/services";
import type { ServiceItem } from "@/lib/types";

const tabs: { value: "all" | ServiceItem["category"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "loans", label: "Loans" },
  { value: "credit-cards", label: "Credit Cards" },
  { value: "insurance", label: "Insurance" },
];

export default function ServicesPage() {
  const [filter, setFilter] = useState<"all" | ServiceItem["category"]>("all");
  const list = getServicesByCategory(filter);

  return (
    <div className="bg-sfs-bg-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-gradient-to-r from-primary-blue to-sfs-dark py-16 text-white">
          <h1 className="font-poppins text-center text-3xl font-bold sm:text-4xl">
            Our Financial Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/90">
            Loans, credit cards, insurance and more from leading banks.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilter(tab.value)}
              className={filter === tab.value ? "rounded-lg bg-primary-red px-4 py-2 text-sm font-medium text-white" : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-sfs-text-primary shadow-soft"}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
