"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface School {
  id: string;
  name: string;
  shortName: string | null;
  city: string | null;
  state: string | null;
  type: string | null;
  website: string | null;
  acceptanceRate: number | null;
  deadlineEd: Date | null;
  deadlineEd2: Date | null;
  deadlineEa: Date | null;
  deadlineRea: Date | null;
  deadlineRd: Date | null;
  deadlineFinancialAid: Date | null;
  deadlineCommitment: Date | null;
  notificationEd: Date | null;
  notificationEa: Date | null;
  notificationRd: Date | null;
}

interface SchoolEditFormProps {
  school: School;
}

export function SchoolEditForm({ school }: SchoolEditFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isRunningLlm, setIsRunningLlm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function formatDateForInput(date: Date | null | undefined): string {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    } catch {
      return "";
    }
  }

  const [formData, setFormData] = useState({
    shortName: school.shortName || "",
    website: school.website || "",
    acceptanceRate: school.acceptanceRate?.toString() || "",
    deadlineEd: formatDateForInput(school.deadlineEd),
    deadlineEd2: formatDateForInput(school.deadlineEd2),
    deadlineEa: formatDateForInput(school.deadlineEa),
    deadlineRea: formatDateForInput(school.deadlineRea),
    deadlineRd: formatDateForInput(school.deadlineRd),
    deadlineFinancialAid: formatDateForInput(school.deadlineFinancialAid),
    deadlineCommitment: formatDateForInput(school.deadlineCommitment),
    notificationEd: formatDateForInput(school.notificationEd),
    notificationEa: formatDateForInput(school.notificationEa),
    notificationRd: formatDateForInput(school.notificationRd),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/schools/${school.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortName: formData.shortName || null,
          website: formData.website || null,
          acceptanceRate: formData.acceptanceRate ? parseFloat(formData.acceptanceRate) : null,
          deadlineEd: formData.deadlineEd || null,
          deadlineEd2: formData.deadlineEd2 || null,
          deadlineEa: formData.deadlineEa || null,
          deadlineRea: formData.deadlineRea || null,
          deadlineRd: formData.deadlineRd || null,
          deadlineFinancialAid: formData.deadlineFinancialAid || null,
          deadlineCommitment: formData.deadlineCommitment || null,
          notificationEd: formData.notificationEd || null,
          notificationEa: formData.notificationEa || null,
          notificationRd: formData.notificationRd || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunLlm = async () => {
    setIsRunningLlm(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/llm/scrape-deadlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "school",
          id: school.id,
          name: school.name,
        }),
      });

      if (!res.ok) throw new Error("LLM scraping failed");

      const data = await res.json();

      // Update form with LLM results
      // The LLM returns date strings in YYYY-MM-DD format directly
      if (data.deadlines) {
        const dateFields = [
          "deadlineEd", "deadlineEd2", "deadlineEa", "deadlineRea",
          "deadlineRd", "deadlineFinancialAid", "deadlineCommitment",
          "notificationEd", "notificationEa", "notificationRd"
        ];
        const updates: Record<string, string> = {};
        for (const field of dateFields) {
          const value = data.deadlines[field];
          if (value && typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            updates[field] = value;
          }
        }
        if (Object.keys(updates).length > 0) {
          setFormData((prev) => ({ ...prev, ...updates }));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "LLM scraping failed");
    } finally {
      setIsRunningLlm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Link */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Schools
      </button>

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Name
            </label>
            <input
              type="text"
              value={formData.shortName}
              onChange={(e) => handleChange("shortName", e.target.value)}
              placeholder="e.g., MIT, Stanford"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Acceptance Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formData.acceptanceRate}
              onChange={(e) => handleChange("acceptanceRate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </div>
      </div>

      {/* Application Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Application Deadlines</h2>
          <button
            type="button"
            onClick={handleRunLlm}
            disabled={isRunningLlm}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 disabled:opacity-50"
          >
            {isRunningLlm ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Auto-fill with AI
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <DateField
            label="Early Decision"
            value={formData.deadlineEd}
            onChange={(v) => handleChange("deadlineEd", v)}
          />
          <DateField
            label="Early Decision II"
            value={formData.deadlineEd2}
            onChange={(v) => handleChange("deadlineEd2", v)}
          />
          <DateField
            label="Early Action"
            value={formData.deadlineEa}
            onChange={(v) => handleChange("deadlineEa", v)}
          />
          <DateField
            label="Restrictive EA"
            value={formData.deadlineRea}
            onChange={(v) => handleChange("deadlineRea", v)}
          />
          <DateField
            label="Regular Decision"
            value={formData.deadlineRd}
            onChange={(v) => handleChange("deadlineRd", v)}
          />
          <DateField
            label="Financial Aid"
            value={formData.deadlineFinancialAid}
            onChange={(v) => handleChange("deadlineFinancialAid", v)}
          />
        </div>
      </div>

      {/* Notification Dates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg mb-4">Notification Dates</h2>
        <div className="grid grid-cols-3 gap-4">
          <DateField
            label="ED Notification"
            value={formData.notificationEd}
            onChange={(v) => handleChange("notificationEd", v)}
          />
          <DateField
            label="EA Notification"
            value={formData.notificationEa}
            onChange={(v) => handleChange("notificationEa", v)}
          />
          <DateField
            label="RD Notification"
            value={formData.notificationRd}
            onChange={(v) => handleChange("notificationRd", v)}
          />
          <DateField
            label="Enrollment Commitment"
            value={formData.deadlineCommitment}
            onChange={(v) => handleChange("deadlineCommitment", v)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>

        {success && (
          <span className="text-sm text-green-600">Changes saved successfully!</span>
        )}

        {error && (
          <span className="text-sm text-red-600">{error}</span>
        )}

        <div className="flex-1" />

        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(school.name + " admissions deadlines " + new Date().getFullYear())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ExternalLink className="w-4 h-4" />
          Search for deadlines
        </a>
      </div>
    </form>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
      />
    </div>
  );
}
