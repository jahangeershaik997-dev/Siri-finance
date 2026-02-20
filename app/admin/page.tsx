import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const displayName = (session.user as { display_name?: string | null })?.display_name || session.user?.email;
  const isSuperAdmin = (session.user as { isSuperAdmin?: boolean })?.isSuperAdmin;
  return (
    <div>
      <h1 className="font-poppins text-2xl font-bold text-sfs-text-primary">Admin Dashboard</h1>
      <p className="mt-1 text-sfs-text-secondary">
        Logged in as {displayName}
      </p>
      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/admin/submissions" className="text-primary-red hover:underline">
            → View all submissions
          </Link>
          <span className="ml-2 text-sm text-sfs-text-secondary">Queries and forms filled by the public (Supabase); view detail and download as Word</span>
        </li>
        <li>
          <Link href="/admin/export" className="text-primary-red hover:underline">
            → Export submissions to Word
          </Link>
          <span className="ml-2 text-sm text-sfs-text-secondary">Paste or type submission data and download .docx</span>
        </li>
        {isSuperAdmin && (
          <li>
            <Link href="/admin/users" className="text-primary-red hover:underline">
              → Manage users
            </Link>
            <span className="ml-2 text-sm text-sfs-text-secondary">Register and approve company/admin users (super admins only)</span>
          </li>
        )}
      </ul>
    </div>
  );
}
