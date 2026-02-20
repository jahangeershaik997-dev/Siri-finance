import { Hero } from "@/components/home/Hero";
import { TrustBanner } from "@/components/home/TrustBanner";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EMICalculator } from "@/components/home/EMICalculator";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactStrip } from "@/components/home/ContactStrip";

// Avoid static prerender so framer-motion works at build time
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <EMICalculator />
      <Testimonials />
      <ContactStrip />
    </>
  );
}
