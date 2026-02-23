"use client";

import { motion } from "framer-motion";
import { SENIOR_CONSULTANTS } from "@/lib/wizzfly-constants";

export function SeniorConsultants() {
  return (
    <section className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-3xl font-bold text-wizzfly-text-primary sm:text-4xl"
        >
          Senior Advisors &amp; Consultants
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 text-center text-wizzfly-text-secondary"
        >
          Call or WhatsApp our consultants directly
        </motion.p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SENIOR_CONSULTANTS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-blue/10 font-poppins text-lg font-bold text-primary-blue">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-wizzfly-text-primary">{c.name}</h3>
                  <p className="text-sm text-wizzfly-text-secondary">{c.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:+91${String(c.phone)}`}
                  className="flex items-center gap-2 text-sm font-medium text-wizzfly-text-primary hover:text-primary-blue"
                >
                  📞 +91 {String(c.phone)}
                </a>
                {"phone2" in c && c.phone2 && (
                  <a
                    href={`tel:+91${String(c.phone2)}`}
                    className="flex items-center gap-2 text-sm font-medium text-wizzfly-text-primary hover:text-primary-blue"
                  >
                    📞 +91 {String(c.phone2)}
                  </a>
                )}
                <a
                  href={`https://wa.me/${String(c.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline"
                >
                  WhatsApp
                </a>
                {c.email && (
                  <a
                    href={`mailto:${String(c.email)}`}
                    className="flex items-center gap-2 text-sm font-medium text-wizzfly-text-primary hover:text-primary-blue"
                  >
                    ✉️ {String(c.email)}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
