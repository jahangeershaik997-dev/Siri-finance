"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY, NAV_LINKS } from "@/lib/wizzfly-constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href) || (href.startsWith("/#") && pathname === "/");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-gray-50 text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-4 py-2 sm:px-6 lg:px-8">
          <a
            href={`tel:+91${COMPANY.phone}`}
            className="flex items-center gap-2 text-wizzfly-text-primary hover:text-primary-blue"
            aria-label="Call us"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">{COMPANY.phone}</span>
          </a>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-wizzfly-text-primary hover:text-[#25D366]"
            aria-label="WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-medium">WhatsApp</span>
          </a>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/login"
              className="font-medium text-wizzfly-text-secondary hover:text-primary-blue"
            >
              Login
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/admin/login"
              className="font-medium text-primary-blue hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Header - Sticky */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-shadow duration-300 bg-white",
          scrolled && "shadow-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Whizzfly Overseas Home">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <img
                src="/logo.png"
                alt=""
                className="h-10 w-10 object-contain"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = "none";
                  const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (next) next.classList.remove("hidden");
                }}
              />
              <span className="hidden flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white" aria-hidden>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3 21h18l-3-9M6 12l3-9 3 9M6 12h12" />
                </svg>
              </span>
            </span>
            <span className="hidden sm:block">
              <span className="block font-poppins text-lg font-bold leading-tight text-wizzfly-text-primary">
                {COMPANY.name}
              </span>
              {COMPANY.studyAbroad && (
                <span className="block text-xs font-semibold uppercase tracking-wide text-primary-orange">
                  {COMPANY.studyAbroad}
                </span>
              )}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-primary-blue"
                    : "text-wizzfly-text-primary hover:text-primary-blue"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-blue" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-lg bg-primary-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 sm:block"
            >
              Contact Us
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="flex h-5 w-6 flex-col justify-between">
                <span className={cn("block h-0.5 w-6 rounded bg-wizzfly-text-primary transition", mobileOpen && "translate-y-2 rotate-45")} />
                <span className={cn("block h-0.5 w-6 rounded bg-wizzfly-text-primary transition", mobileOpen && "opacity-0")} />
                <span className={cn("block h-0.5 w-6 rounded bg-wizzfly-text-primary transition", mobileOpen && "-translate-y-2 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed right-0 top-[120px] z-50 h-[calc(100vh-120px)] w-[280px] bg-white shadow-xl lg:hidden"
              >
                <div className="flex flex-col gap-2 p-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 font-medium",
                        isActive(link.href) ? "bg-primary-blue/10 text-primary-blue" : "text-wizzfly-text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-lg bg-primary-orange px-4 py-3 text-center font-semibold text-white"
                  >
                    Contact Us
                  </Link>
                  <a href={`tel:+91${COMPANY.phone}`} className="rounded-lg border px-4 py-3 text-center font-medium">
                    Call {COMPANY.phone}
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-white"
                  >
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
