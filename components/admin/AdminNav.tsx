"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

export function AdminNav({ session }: { session: Session }) {
  const isSuperAdmin = (session?.user as { isSuperAdmin?: boolean })?.isSuperAdmin;
  const displayName = (session?.user as { display_name?: string | null })?.display_name || session?.user?.email;
  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link href="/admin" className="text-sfs-text-secondary hover:text-primary-red">
        Dashboard
      </Link>
      <Link href="/admin/submissions" className="text-sfs-text-secondary hover:text-primary-red">
        Submissions
      </Link>
      <Link href="/admin/export" className="text-sfs-text-secondary hover:text-primary-red">
        Export to Word
      </Link>
      {isSuperAdmin && (
        <Link href="/admin/users" className="text-sfs-text-secondary hover:text-primary-red">
          Users
        </Link>
      )}
      <span className="text-sfs-text-secondary" title={session?.user?.email ?? ""}>{displayName}</span>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="text-primary-red hover:underline"
      >
        Sign out
      </button>
    </nav>
  );
}
