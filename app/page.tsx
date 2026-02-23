import { Hero } from "@/components/Hero";
import { DS160Notice } from "@/components/DS160Notice";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Countries } from "@/components/Countries";
import { CountryTabs } from "@/components/CountryTabs";
import { Coaching } from "@/components/Coaching";
import { VisaTypes } from "@/components/VisaTypes";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DS160Notice />
      <About />
      <Services />
      <Countries />
      <CountryTabs />
      <Coaching />
      <VisaTypes />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
