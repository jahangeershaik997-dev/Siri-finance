import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { CookieConsent } from "@/components/CookieConsent";
import { Toaster } from "sonner";
import { COMPANY, SITE_URL } from "@/lib/wizzfly-constants";
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
    default: "Best Immigration Consultants in Hyderabad | Wizzfly Overseas",
    template: "%s | Wizzfly Overseas",
  },
  description:
    "Wizzfly Overseas - Best visa consultants in Hyderabad. Visa consultants Hyderabad, immigration consultants Hyderabad, overseas education consultants. Your wings to the world.",
  keywords: [
    "visa consultants hyderabad",
    "immigration consultants hyderabad",
    "overseas education consultants",
    "Wizzfly Overseas",
    "study abroad hyderabad",
    "PR visa consultants",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Best Immigration Consultants in Hyderabad | Wizzfly Overseas",
    description: "Visa consultants Hyderabad, immigration consultants Hyderabad, overseas education consultants. Your wings to the world.",
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
        <meta name="theme-color" content="#1a56db" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Wizzfly Overseas" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: COMPANY.name,
              description: COMPANY.tagline,
              image: `${SITE_URL}/images/logo-og.png`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              telephone: `+91${COMPANY.phone}`,
              email: COMPANY.email,
              openingHours: "Mo-Sa 09:30-18:30",
              url: SITE_URL,
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased scroll-smooth">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCTA />
          <CookieConsent />
          <Toaster position="top-center" richColors closeButton />
        </SessionProvider>
      </body>
    </html>
  );
}
