import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy Policy of Siri Financial Services." };
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-3xl font-bold text-sfs-text-primary">Privacy Policy</h1>
        <p className="mt-4 text-sfs-text-secondary">
          Last updated: 2025. We collect and use your information to process loan enquiries and
          connect you with banking partners. We do not sell your data. Contact
          info@sirifinancialservices.com for queries.
        </p>
      </div>
    </div>
  );
}
