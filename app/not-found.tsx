import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="font-poppins text-6xl font-bold text-primary-red">404</h1>
      <p className="mt-2 text-lg text-sfs-text-secondary">Page not found</p>
      <p className="mt-1 text-sm text-sfs-text-secondary">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary-red px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
