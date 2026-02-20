"use client";

import { useState } from "react";
import Link from "next/link";

const QUICK_FIELDS = [
  { id: "fullName", label: "Full Name" },
  { id: "name", label: "Name" },
  { id: "mobileNumber", label: "Mobile / Phone" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "subject", label: "Subject" },
  { id: "loanType", label: "Loan Type" },
  { id: "loanAmount", label: "Loan Amount" },
  { id: "city", label: "City" },
  { id: "message", label: "Message" },
  { id: "referenceNumber", label: "Reference Number" },
  { id: "notes", label: "Notes (any extra info)" },
];

const STATUS_OPTIONS = [
  { value: "", label: "— Select status —" },
  { value: "Pending", label: "Pending" },
  { value: "Started", label: "Started" },
  { value: "Contacted", label: "Contacted" },
  { value: "Checking CIBIL", label: "Checking CIBIL" },
  { value: "In progress", label: "In progress" },
  { value: "Hold", label: "Hold" },
  { value: "To be updated", label: "To be updated" },
  { value: "Completed", label: "Completed" },
];

export default function AdminExportPage() {
  const [json, setJson] = useState("");
  const [quickValues, setQuickValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [useQuick, setUseQuick] = useState(true);
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setError("");
    let submission: Record<string, string>;

    if (useQuick) {
      submission = Object.fromEntries(
        Object.entries(quickValues).filter(([, v]) => v.trim() !== "")
      );
      if (status.trim()) submission["Application status"] = status.trim();
      if (Object.keys(submission).length === 0) {
        setError("Fill in at least one field above, or switch to JSON and paste data.");
        return;
      }
    } else {
      let data: unknown;
      try {
        data = JSON.parse(json || "{}");
      } catch {
        setError("Invalid JSON. Paste a single submission object, e.g. {\"fullName\": \"John\", \"mobileNumber\": \"9999999999\"}");
        return;
      }
      submission = typeof data === "object" && data !== null && !Array.isArray(data)
        ? (data as Record<string, string>)
        : { "(invalid)": String(data) };
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/export-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminKey ? { "x-api-key": adminKey } : {}),
        },
        body: JSON.stringify({ submission }),
      });
      if (!res.ok) {
        const t = await res.text();
        if (res.status === 401) setError("Wrong or missing Admin key. Set ADMIN_API_KEY in Vercel and enter it above.");
        else setError(t || "Export failed.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SFS-Submission-${Date.now()}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-sfs-text-secondary">
        <Link href="/" className="hover:text-primary-red">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-sfs-text-primary">Admin – Export to Word</span>
      </nav>
      <h1 className="font-poppins text-2xl font-bold text-sfs-text-primary">
        Export submission to Word
      </h1>
      <p className="mt-2 text-sfs-text-secondary">
        Download a form submission (from Formspree or any source) as a Word document.
      </p>

      <p className="mt-1 text-sm text-sfs-text-secondary">
        Formspree’s CSV/JSON export requires an upgrade. Use <strong>Quick entry</strong> below: open each submission in Formspree, then type or copy the values here and download as Word.
      </p>

      <div className="mt-6">
        <label className="block text-sm font-medium text-sfs-text-primary">Admin key (required if set in env)</label>
        <input
          type="password"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Paste ADMIN_API_KEY here"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-4 flex gap-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setUseQuick(true)}
          className={`border-b-2 pb-2 text-sm font-medium ${useQuick ? "border-primary-red text-primary-red" : "border-transparent text-sfs-text-secondary"}`}
        >
          Quick entry (no JSON)
        </button>
        <button
          type="button"
          onClick={() => setUseQuick(false)}
          className={`border-b-2 pb-2 text-sm font-medium ${!useQuick ? "border-primary-red text-primary-red" : "border-transparent text-sfs-text-secondary"}`}
        >
          Paste JSON
        </button>
      </div>

      {useQuick ? (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {QUICK_FIELDS.map(({ id, label }) => (
              <div key={id}>
                <label className="block text-xs font-medium text-sfs-text-secondary">{label}</label>
                <input
                  type="text"
                  value={quickValues[id] ?? ""}
                  onChange={(e) => setQuickValues((prev) => ({ ...prev, [id]: e.target.value }))}
                  placeholder={label}
                  className="mt-0.5 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-sfs-text-secondary">Application status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-0.5 w-full max-w-xs rounded border border-gray-300 px-3 py-2 text-sm"
            >
              {STATUS_OPTIONS.map(({ value, label }) => (
                <option key={value || "empty"} value={value}>{label}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-sfs-text-secondary">e.g. Pending, Contacted, Checking CIBIL, In progress, Hold</p>
          </div>
        </>
      ) : (
        <>
          <p className="mt-2 text-xs text-sfs-text-secondary">
            Open a submission in Formspree, copy the data, and paste as JSON below.
          </p>
          <div className="mt-2">
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder={'{"fullName": "Customer Name", "mobileNumber": "9999999999", "loanType": "Personal Loan", ...}'}
              rows={8}
              className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
            />
          </div>
        </>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={loading}
          className="rounded-lg bg-primary-red px-6 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Generating…" : "Download Word"}
        </button>
      </div>
    </div>
  );
}
