import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get loan info – Siri Financial Services",
  description: "Submit your details for loan enquiry. Our team will contact you shortly.",
};

export default function GetInfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
