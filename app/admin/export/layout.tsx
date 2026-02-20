import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export to Word",
  description: "Download form submissions as Word documents.",
  robots: { index: false, follow: false },
};

export default function AdminExportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
