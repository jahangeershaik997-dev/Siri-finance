import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Siri Financial Services in Hyderabad. Visit us at Ameerpet or send a message. We respond within 2 hours on working days.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
