"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserRow = { id: string; email: string; role: string; approved: boolean; display_name: string | null; created_at: string };

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "company">("company");
  const [newApproved, setNewApproved] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isSuperAdmin = (session?.user as { isSuperAdmin?: boolean })?.isSuperAdmin;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    if (status === "authenticated" && !isSuperAdmin) {
      router.push("/admin");
      return;
    }
    if (isSuperAdmin) fetchUsers();
  }, [status, isSuperAdmin, router]);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setSubmitLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: newRole,
          approved: newApproved,
          display_name: displayName || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to add user");
        return;
      }
      setMessage("User added. They can sign in" + (newApproved ? " now." : " after you approve them."));
      setEmail("");
      setPassword("");
      setDisplayName("");
      setNewApproved(false);
      fetchUsers();
    } finally {
      setSubmitLoading(false);
    }
  }

  async function handleApprove(id: string, approved: boolean) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    if (res.ok) fetchUsers();
  }

  if (status === "loading" || (status === "authenticated" && !isSuperAdmin)) return null;

  return (
    <div>
      <nav className="mb-6 text-sm text-sfs-text-secondary">
        <Link href="/admin" className="hover:text-primary-red">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-sfs-text-primary">Users</span>
      </nav>
      <h1 className="font-poppins text-2xl font-bold text-sfs-text-primary">Manage users</h1>
      <p className="mt-1 text-sfs-text-secondary">
        Only registered and approved users can access the admin area. Add company or admin users below.
      </p>

      <form onSubmit={handleAddUser} className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="font-poppins font-semibold text-sfs-text-primary">Add user</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-sfs-text-primary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sfs-text-primary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sfs-text-primary">Display name (shown when logged in)</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. John"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sfs-text-primary">Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as "admin" | "company")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="company">Company</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="newApproved"
              checked={newApproved}
              onChange={(e) => setNewApproved(e.target.checked)}
            />
            <label htmlFor="newApproved" className="text-sm text-sfs-text-primary">Approved (can sign in immediately)</label>
          </div>
        </div>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        <button
          type="submit"
          disabled={submitLoading}
          className="mt-4 rounded-lg bg-primary-red px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {submitLoading ? "Adding…" : "Add user"}
        </button>
      </form>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="font-poppins font-semibold text-sfs-text-primary">All users</h2>
        {loading ? (
          <p className="mt-2 text-sm text-sfs-text-secondary">Loading…</p>
        ) : (
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-2 font-medium">Display name</th>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Approved</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-100">
                  <td className="py-2">{u.display_name || "—"}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2">{u.approved ? "Yes" : "No"}</td>
                  <td className="py-2">
                    {!u.approved ? (
                      <button
                        type="button"
                        onClick={() => handleApprove(u.id, true)}
                        className="text-primary-red hover:underline"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApprove(u.id, false)}
                        className="text-sfs-text-secondary hover:underline"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
