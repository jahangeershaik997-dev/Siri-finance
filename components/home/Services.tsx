import Link from "next/link";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { servicesList } from "@/data/services";

export function Services() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive Financial Solutions Under One Roof"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {servicesList.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
        <div className="mt-12">
          <CTABanner
            title="⭐ CIBIL Issue Cases and No Income Proof Cases Also Successfully Handled! Apply Without Worry →"
            buttonText="Apply Now"
            buttonHref="/apply"
          />
        </div>
      </div>
    </section>
  );
}
