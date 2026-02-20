import Link from "next/link";

interface CTABannerProps {
  title: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function CTABanner({
  title,
  buttonText = "Apply Now",
  buttonHref = "/apply",
  className = "",
}: CTABannerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-card bg-primary-green px-6 py-6 text-white sm:flex-row sm:justify-between ${className}`}
    >
      <p className="text-center text-lg font-semibold sm:text-left">{title}</p>
      <Link
        href={buttonHref}
        className="shrink-0 rounded-lg bg-white px-6 py-2.5 font-semibold text-primary-green transition hover:bg-gray-100"
      >
        {buttonText}
      </Link>
    </div>
  );
}
