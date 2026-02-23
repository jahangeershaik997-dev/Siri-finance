import Link from "next/link";
import { COMPANY } from "@/lib/wizzfly-constants";

export const metadata = {
  title: "Refund Policy",
  description: `Refund policy for ${COMPANY.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-poppins text-3xl font-bold text-wizzfly-text-primary">Refund Policy</h1>
      <p className="mt-4 text-wizzfly-text-secondary">
        {COMPANY.name} refund policy will be updated here. For any queries, please{" "}
        <Link href="/contact" className="text-primary-blue underline hover:no-underline">contact us</Link>.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary-blue hover:underline">← Back to Home</Link>
    </div>
  );
}
