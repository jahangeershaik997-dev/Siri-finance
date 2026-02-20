import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Toaster } from "sonner";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { SessionProvider } from "@/components/providers/SessionProvider";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Siri Financial Services | Loans, Home Loan, Personal Loan in Hyderabad",
    template: "%s | Siri Financial Services",
  },
  description:
    "Siri Financial Services - Your trusted partner for personal loans, home loans, business loans, and more in Hyderabad. Best interest rates from 10+ banks. CIBIL issues? We can help!",
  keywords: [
    "personal loan Hyderabad",
    "home loan Hyderabad",
    "business loan",
    "Siri Financial Services",
    "loan Ameerpet",
    "CIBIL loan",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E53935" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SFS" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-152x152.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: COMPANY.name,
              image: `${SITE_URL}/images/logo-og.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: COMPANY.address,
                addressLocality: "Ameerpet",
                addressRegion: "Telangana",
                postalCode: "500016",
                addressCountry: "IN",
              },
              telephone: `+91${COMPANY.phone}`,
              email: COMPANY.email,
              openingHours: "Mo-Sa 09:30-18:30",
              priceRange: "₹₹",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
        <Toaster position="top-center" richColors closeButton />
        </SessionProvider>
      </body>
    </html>
  );
}
