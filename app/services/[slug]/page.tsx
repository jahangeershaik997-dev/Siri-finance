import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getRelatedServices } from "@/data/services";
import { SectionTitle } from "@/components/shared/SectionTitle";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { servicesList } = await import("@/data/services");
  return servicesList.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const related = service.relatedSlugs?.length
    ? getRelatedServices(service.relatedSlugs)
    : [];

  return (
    <div className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-sfs-text-secondary">
          <Link href="/" className="hover:text-primary-red">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-primary-red">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-sfs-text-primary">{service.title}</span>
        </nav>
        <div className="mb-6 text-4xl">{service.icon}</div>
        <h1 className="font-poppins text-3xl font-bold text-sfs-text-primary">
          {service.title}
        </h1>
        {service.interestRate && (
          <span className="mt-2 inline-block rounded-full bg-primary-green/10 px-3 py-1 text-sm font-medium text-primary-green">
            {service.interestRate}
          </span>
        )}
        <div className="prose mt-8 max-w-none text-sfs-text-secondary">
          <p className="text-lg">{service.description}</p>
        </div>
        {service.features && service.features.length > 0 && (
          <div className="mt-10">
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
              Key Features
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sfs-text-secondary">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
        {service.eligibility && service.eligibility.length > 0 && (
          <div className="mt-10">
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
              Eligibility Criteria
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-sfs-bg-light">
                    <th className="border-b border-gray-200 px-4 py-2 text-left font-semibold">
                      Criteria
                    </th>
                    <th className="border-b border-gray-200 px-4 py-2 text-left font-semibold">
                      Salaried
                    </th>
                    <th className="border-b border-gray-200 px-4 py-2 text-left font-semibold">
                      Self-Employed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {service.eligibility.map((row) => (
                    <tr key={row.criteria} className="border-b border-gray-100">
                      <td className="px-4 py-2 font-medium">{row.criteria}</td>
                      <td className="px-4 py-2 text-sfs-text-secondary">{row.salaried}</td>
                      <td className="px-4 py-2 text-sfs-text-secondary">{row.selfEmployed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {service.documents && service.documents.length > 0 && (
          <div className="mt-10">
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
              Documents Required
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-1 text-sfs-text-secondary">
              {service.documents.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        )}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mt-10">
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-4">
              {service.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-lg border border-gray-200 bg-sfs-bg-light p-4"
                >
                  <p className="font-medium text-sfs-text-primary">{faq.q}</p>
                  <p className="mt-2 text-sm text-sfs-text-secondary">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-12 rounded-lg bg-primary-red p-6 text-center text-white">
          <p className="font-semibold">Ready to apply?</p>
          <Link
            href={`/apply?loanType=${service.slug}`}
            className="mt-4 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary-red"
          >
            Apply for {service.shortTitle} Now
          </Link>
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
              Related Services
            </h2>
            <div className="mt-4 flex flex-wrap gap-4">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-sfs-text-primary shadow-soft hover:border-primary-red hover:text-primary-red"
                >
                  {s.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
