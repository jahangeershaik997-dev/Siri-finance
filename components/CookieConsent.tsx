"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "wizzfly-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = typeof window !== "undefined" && localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      setVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-xl sm:border"
        >
          <p className="text-sm text-wizzfly-text-secondary">
            We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{" "}
            <Link href="/privacy-policy" className="text-primary-blue underline hover:no-underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={accept}
              className="rounded-lg bg-primary-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-wizzfly-text-primary hover:bg-gray-50"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
