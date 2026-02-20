import Link from "next/link";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { ApplySidebar } from "@/components/apply/Sidebar";
import { SLUG_TO_LOAN_PRESET } from "@/lib/constants";

export const metadata = {
  title: "Apply for Loan - Get Best Offers from Multiple Banks",
  description:
    "Fill the form and our team will contact you with the best loan options within 2 hours. Personal loans, home loans, business loans and more.",
};

interface PageProps {
  searchParams: { loanType?: string };
}

export default function ApplyPage({ searchParams }: PageProps) {
  const slug = (searchParams?.loanType ?? "").toLowerCase();
  const preset = slug ? SLUG_TO_LOAN_PRESET[slug] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-sfs-text-secondary">
        <Link href="/" className="hover:text-primary-red">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-sfs-text-primary">Apply for Loan</span>
      </nav>
      <h1 className="font-poppins text-2xl font-bold text-sfs-text-primary sm:text-3xl">
        Apply for Loan - Get Best Offers from Multiple Banks
      </h1>
      <p className="mt-2 text-sfs-text-secondary">
        Fill the form below and our team will contact you with the best loan options within 2 hours.
      </p>
      <div className="mt-10 flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 lg:w-[65%]">
          <ApplicationForm
            initialLoanType={preset?.loanType ?? ""}
            initialCategory={preset?.category ?? "loans"}
          />
        </div>
        <aside className="lg:w-[35%] lg:pl-8">
          <div className="sticky top-24 space-y-6">
            <ApplySidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
