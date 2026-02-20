"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { servicesList } from "@/data/services";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/apply", label: "Apply Now" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        "bg-white",
        scrolled && "shadow-soft"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <svg viewBox="0 0 48 48" className="h-10 w-10">
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="#1565C0"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke="#E53935"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-poppins font-bold text-sm">
              <span className="text-[#1565C0]">S</span>
              <span className="text-[#E53935]">F</span>
              <span className="text-[#2E7D32]">S</span>
            </span>
          </div>
          <span className="hidden text-sm font-bold text-sfs-text-primary sm:block lg:text-base">
            SIRI FINANCIAL SERVICES
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.href === "/services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive("/services")
                      ? "text-primary-red"
                      : "text-sfs-text-primary hover:text-primary-blue"
                  )}
                >
                  Services
                  {isActive("/services") && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-red" />
                  )}
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute left-0 top-full pt-1"
                    >
                      <div className="w-[420px] rounded-card border border-gray-200 bg-white p-4 shadow-soft-lg">
                        <p className="mb-3 text-xs font-semibold uppercase text-sfs-text-secondary">
                          Our loan & financial services
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {servicesList.slice(0, 10).map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="rounded-lg px-3 py-2 text-sm text-sfs-text-primary hover:bg-sfs-bg-light"
                            >
                              {s.shortTitle}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/services"
                          className="mt-2 block text-center text-sm font-medium text-primary-red"
                        >
                          View all services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-primary-red"
                    : "text-sfs-text-primary hover:text-primary-blue"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-red" />
                )}
              </Link>
            )
          )}
        </nav>

        {/* Right: WhatsApp + Apply */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phone}`}
            className="hidden items-center gap-2 text-sm text-sfs-text-primary sm:flex"
            aria-label="Call us"
          >
            <span className="text-primary-green">📞</span>
            <span className="font-medium">{COMPANY.phone}</span>
          </a>
          <Link
            href="/apply"
            className="hidden rounded-lg bg-primary-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 sm:block"
          >
            Apply Now
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="flex h-5 w-6 flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-full bg-sfs-text-primary transition",
                  mobileOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-sfs-text-primary transition",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-sfs-text-primary transition",
                  mobileOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed right-0 top-0 z-50 h-full w-[280px] bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-4 p-6 pt-20">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-white"
              >
                WhatsApp {COMPANY.phone}
              </a>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary-red px-4 py-3 text-center font-semibold text-white"
              >
                Apply Now
              </Link>
              <hr />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-medium",
                    isActive(link.href) ? "text-primary-red" : "text-sfs-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
