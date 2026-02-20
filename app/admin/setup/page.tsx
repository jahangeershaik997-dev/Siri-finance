"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alreadyHasUsers, setAlreadyHasUsers] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/seed")
      .then((r) => r.json())
      .then((d) => {
        setAlreadyHasUsers(!d.canSeed);
      })
      .catch(() => setAlreadyHasUsers(false));
  }, []);

  async function handleSeed() {
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) setMessage("First admin created. Go to login.");
      else setMessage(data.error || "Failed");
    } finally {
      setLoading(false);
    }
  }

  if (alreadyHasUsers === null) return <p className="p-8">Checking…</p>;
  if (alreadyHasUsers) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-sfs-text-primary">Admin users already exist.</p>
        <Link href="/admin/login" className="mt-4 inline-block text-primary-red hover:underline">Go to login</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8">
      <h1 className="font-poppins text-xl font-bold text-sfs-text-primary">Create first admin</h1>
      <p className="mt-2 text-sm text-sfs-text-secondary">
        Set <code className="rounded bg-gray-100 px-1">ADMIN_SEED_EMAIL</code> and{" "}
        <code className="rounded bg-gray-100 px-1">ADMIN_SEED_PASSWORD</code> in your environment (e.g. Vercel), then click below.
      </p>
      <button
        type="button"
        onClick={handleSeed}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-primary-red py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create first admin"}
      </button>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {message && (
        <Link href="/admin/login" className="mt-2 inline-block text-sm text-primary-red hover:underline">Go to login</Link>
      )}
    </div>
  );
}
