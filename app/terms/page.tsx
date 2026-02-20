import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions of Siri Financial Services.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-3xl font-bold text-sfs-text-primary">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-sfs-text-secondary">
          By using the website or submitting an enquiry/application to Siri Financial Services
          (&quot;SFS&quot;), you agree to these terms.
        </p>
        <div className="prose mt-8 max-w-none text-sfs-text-secondary">
          <h2 className="font-poppins text-xl font-bold text-sfs-text-primary">Services</h2>
          <p className="mt-2">
            SFS acts as an intermediary between you and banks/NBFCs for loan and financial
            products. We do not lend directly. Loan approval, interest rates, and terms are
            determined by the respective lender.
          </p>
          <h2 className="mt-6 font-poppins text-xl font-bold text-sfs-text-primary">Your obligations</h2>
          <p className="mt-2">
            You agree to provide accurate and complete information. You authorize SFS to share your
            details with partner banks/NBFCs for processing your application and to contact you
            via phone, SMS, WhatsApp, or email.
          </p>
          <h2 className="mt-6 font-poppins text-xl font-bold text-sfs-text-primary">Disclaimer</h2>
          <p className="mt-2">
            We do not guarantee loan approval. Rates and eligibility are subject to lender norms.
            Our service is free for applicants; lenders may charge processing fees as per their
            policy.
          </p>
          <h2 className="mt-6 font-poppins text-xl font-bold text-sfs-text-primary">Contact</h2>
          <p className="mt-2">
            For any questions, contact us at info@sirifinancialservices.com or 7095899552.
          </p>
        </div>
      </div>
    </div>
  );
}
