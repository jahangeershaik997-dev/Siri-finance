import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "About Us",
  description: "Learn about Siri Financial Services and our mission to provide the best loan solutions in Hyderabad.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-3xl font-bold text-sfs-text-primary">
          About Siri Financial Services
        </h1>
        <p className="mt-6 text-lg text-sfs-text-secondary">
          Siri Financial Services (SFS) is a trusted loan and financial services partner based in
          Hyderabad, India. We help individuals and businesses access the best loan products from
          multiple banks and NBFCs under one roof.
        </p>
        <div className="mt-12 rounded-lg bg-sfs-bg-light p-8">
          <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">
            Meet {COMPANY.contactPerson}
          </h2>
          <p className="mt-4 text-sfs-text-secondary">
            Founder and Loan Consultant at Siri Financial Services. We have helped hundreds of
            customers in Hyderabad secure personal loans, home loans, business loans, and more.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">Our Mission</h2>
            <p className="mt-2 text-sfs-text-secondary">
              To make quality credit accessible by simplifying the loan process and offering
              personalized solutions from the best banking partners.
            </p>
          </div>
          <div>
            <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">Our Vision</h2>
            <p className="mt-2 text-sfs-text-secondary">
              To be the most trusted financial services partner in Hyderabad, known for
              transparency and hassle-free loan processing.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">Our Promise</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sfs-text-secondary">
            <li>100% free consultation and processing support</li>
            <li>Compare offers from 10+ banks before you decide</li>
            <li>CIBIL issues and no-income-proof cases handled with care</li>
            <li>Quick sanction and disbursal wherever possible</li>
          </ul>
        </div>
        <div className="mt-12 text-center">
          <Link href="/apply" className="inline-block rounded-lg bg-primary-red px-8 py-3 font-semibold text-white">
            Apply for a Loan
          </Link>
        </div>
      </div>
    </div>
  );
}
