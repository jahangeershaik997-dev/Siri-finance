"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
  className?: string;
}

export function ServiceCard({ service, index = 0, className }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "rounded-card border border-gray-100 bg-white p-6 shadow-soft transition hover:shadow-soft-lg hover:scale-[1.02]",
        className
      )}
    >
      <div className="mb-3 text-3xl">{service.icon}</div>
      <h3 className="font-poppins text-lg font-bold text-sfs-text-primary">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-sfs-text-secondary line-clamp-3">
        {service.description}
      </p>
      {service.interestRate && (
        <span className="mt-3 inline-block rounded-full bg-primary-green/10 px-3 py-1 text-xs font-medium text-primary-green">
          {service.interestRate}
        </span>
      )}
      <Link
        href={`/apply?loanType=${service.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-red hover:underline"
      >
        Apply Now →
      </Link>
    </motion.div>
  );
}
