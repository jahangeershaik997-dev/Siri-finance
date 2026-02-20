"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Submission = {
  id: string;
  form_type: string;
  data: Record<string, unknown>;
  created_at: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function preview(data: Record<string, unknown>): string {
  const name = (data.fullName ?? data.name ?? data.email ?? "") as string;
  const extra = [data.loanType, data.subject, data.mobileNumber ?? data.phone].filter(Boolean);
  const parts = [name, ...extra].map(String).slice(0, 3);
  return parts.join(" · ") || "—";
}

export default function AdminSubmissionsPage() {
  const [list, setList] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState<Submission | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const downloadWord = async (sub: Submission) => {
    setDownloading(sub.id);
    try {
      const res = await fetch("/api/admin/export-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission: {
            ...sub.data,
            "Form type": sub.form_type,
            "Submitted at": formatDate(sub.created_at),
          },
        }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SFS-Submission-${sub.form_type}-${sub.id.slice(0, 8)}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setDownloading(null);
    }
  };

  if (loading) return <p className="text-sfs-text-secondary">Loading submissions…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <nav className="mb-6 text-sm text-sfs-text-secondary">
        <Link href="/admin" className="hover:text-primary-red">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-sfs-text-primary">Admin – Submissions</span>
      </nav>
      <h1 className="font-poppins text-2xl font-bold text-sfs-text-primary">
        All submissions
      </h1>
      <p className="mt-1 text-sfs-text-secondary">
        Forms filled by the public (Apply, Contact, Hero, Get info). Stored in Supabase. Click a row to view detail; use Download Word to export.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Preview</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sfs-text-secondary">
                  No submissions yet. Share the Apply or Get info link so the public can submit; data will appear here.
                </td>
              </tr>
            ) : (
              list.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{formatDate(sub.created_at)}</td>
                  <td className="px-4 py-3 capitalize">{sub.form_type.replace("_", " ")}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={preview(sub.data)}>
                    {preview(sub.data)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setDetail(sub)}
                      className="mr-2 text-primary-red hover:underline"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadWord(sub)}
                      disabled={downloading === sub.id}
                      className="text-primary-red hover:underline disabled:opacity-50"
                    >
                      {downloading === sub.id ? "…" : "Download Word"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h2 className="font-poppins text-lg font-bold text-sfs-text-primary">
                Submission detail · {detail.form_type}
              </h2>
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="text-sfs-text-secondary hover:text-primary-red"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-xs text-sfs-text-secondary">
              {formatDate(detail.created_at)} · ID: {detail.id}
            </p>
            <dl className="mt-4 space-y-2">
              {Object.entries(detail.data).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-medium text-sfs-text-secondary">
                    {k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  </dt>
                  <dd className="mt-0.5 text-sfs-text-primary">
                    {v === null || v === undefined ? "—" : String(v)}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => downloadWord(detail)}
                disabled={downloading === detail.id}
                className="rounded-lg bg-primary-red px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {downloading === detail.id ? "Generating…" : "Download Word"}
              </button>
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
