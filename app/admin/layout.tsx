import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("Admin layout getServerSession error:", e);
  }
  return (
    <div className="min-h-screen bg-sfs-bg-light">
      {session && (
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/admin" className="font-poppins font-semibold text-sfs-text-primary">
              SFS Admin
            </Link>
            <AdminNav session={session} />
          </div>
        </header>
      )}
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
