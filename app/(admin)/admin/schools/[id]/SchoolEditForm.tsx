"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Sparkles,
  Plus,
  Trash2,
  Info,
} from "lucide-react";
import { ADMISSION_TYPES } from "@/lib/data/admission-types";

interface SchoolDeadlineYear {
  id: string;
  admissionsCycle: number;
  deadlineEd: Date | null;
  deadlineEd2: Date | null;
  deadlineEa: Date | null;
  deadlineRd: Date | null;
  deadlinePriority: Date | null;
  deadlineFinancialAid: Date | null;
  dataSource: string | null;
  dataConfidence: string | null;
}

interface School {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  type: string | null;
  websiteUrl: string | null;
  acceptanceRate: number | null;
  // Admission type flags
  hasEarlyDecision: boolean;
  hasEarlyDecisionII: boolean;
  hasEarlyAction: boolean;
  isRestrictiveEarlyAction: boolean;
  hasRollingAdmissions: boolean;
  admissionsNotes: string | null;
  notes: string | null;
  // Related data
  deadlineYears: SchoolDeadlineYear[];
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

  // Current admissions cycle (Fall 2025 = applying in 2024-25)
  const currentYear = new Date().getFullYear();
  const currentCycle = currentYear + 1; // If it's 2024, we're applying for Fall 2025

  // Form state for school fields
  const [formData, setFormData] = useState({
    websiteUrl: school.websiteUrl || "",
    acceptanceRate: school.acceptanceRate?.toString() || "",
    hasEarlyDecision: school.hasEarlyDecision,
    hasEarlyDecisionII: school.hasEarlyDecisionII,
    hasEarlyAction: school.hasEarlyAction,
    isRestrictiveEarlyAction: school.isRestrictiveEarlyAction,
    hasRollingAdmissions: school.hasRollingAdmissions,
    admissionsNotes: school.admissionsNotes || "",
    notes: school.notes || "",
  });

  // State for deadline years
  const [deadlineYears, setDeadlineYears] = useState<
    Array<{
      id: string | null;
      admissionsCycle: number;
      deadlineEd: string;
      deadlineEd2: string;
      deadlineEa: string;
      deadlineRd: string;
      deadlinePriority: string;
      deadlineFinancialAid: string;
      dataSource: string;
      dataConfidence: string;
      isNew?: boolean;
    }>
  >(
    school.deadlineYears.map((dy) => ({
      id: dy.id,
      admissionsCycle: dy.admissionsCycle,
      deadlineEd: formatDateForInput(dy.deadlineEd),
      deadlineEd2: formatDateForInput(dy.deadlineEd2),
      deadlineEa: formatDateForInput(dy.deadlineEa),
      deadlineRd: formatDateForInput(dy.deadlineRd),
      deadlinePriority: formatDateForInput(dy.deadlinePriority),
      deadlineFinancialAid: formatDateForInput(dy.deadlineFinancialAid),
      dataSource: dy.dataSource || "manual",
      dataConfidence: dy.dataConfidence || "low",
    }))
  );

  // Selected year for editing
  const [selectedCycle, setSelectedCycle] = useState(
    deadlineYears.find((dy) => dy.admissionsCycle === currentCycle)
      ?.admissionsCycle || currentCycle
  );

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

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleDeadlineChange = (cycle: number, field: string, value: string) => {
    setDeadlineYears((prev) =>
      prev.map((dy) =>
        dy.admissionsCycle === cycle ? { ...dy, [field]: value } : dy
      )
    );
    setSuccess(false);
  };

  const addDeadlineYear = (cycle: number) => {
    if (deadlineYears.some((dy) => dy.admissionsCycle === cycle)) return;

    setDeadlineYears((prev) => [
      ...prev,
      {
        id: null,
        admissionsCycle: cycle,
        deadlineEd: "",
        deadlineEd2: "",
        deadlineEa: "",
        deadlineRd: "",
        deadlinePriority: "",
        deadlineFinancialAid: "",
        dataSource: "manual",
        dataConfidence: "low",
        isNew: true,
      },
    ]);
    setSelectedCycle(cycle);
  };

  const removeDeadlineYear = (cycle: number) => {
    setDeadlineYears((prev) =>
      prev.filter((dy) => dy.admissionsCycle !== cycle)
    );
    if (selectedCycle === cycle) {
      setSelectedCycle(currentCycle);
    }
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
          websiteUrl: formData.websiteUrl || null,
          acceptanceRate: formData.acceptanceRate
            ? parseFloat(formData.acceptanceRate)
            : null,
          hasEarlyDecision: formData.hasEarlyDecision,
          hasEarlyDecisionII: formData.hasEarlyDecisionII,
          hasEarlyAction: formData.hasEarlyAction,
          isRestrictiveEarlyAction: formData.isRestrictiveEarlyAction,
          hasRollingAdmissions: formData.hasRollingAdmissions,
          admissionsNotes: formData.admissionsNotes || null,
          notes: formData.notes || null,
          deadlineYears: deadlineYears.map((dy) => ({
            id: dy.id,
            admissionsCycle: dy.admissionsCycle,
            deadlineEd: dy.deadlineEd || null,
            deadlineEd2: dy.deadlineEd2 || null,
            deadlineEa: dy.deadlineEa || null,
            deadlineRd: dy.deadlineRd || null,
            deadlinePriority: dy.deadlinePriority || null,
            deadlineFinancialAid: dy.deadlineFinancialAid || null,
            dataSource: dy.dataSource,
            dataConfidence: dy.dataConfidence,
          })),
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

      // Ensure we have a deadline year for current cycle
      if (!deadlineYears.some((dy) => dy.admissionsCycle === currentCycle)) {
        addDeadlineYear(currentCycle);
      }

      // Update deadlines from LLM results
      if (data.deadlines) {
        const dateFields = [
          "deadlineEd",
          "deadlineEd2",
          "deadlineEa",
          "deadlineRd",
          "deadlineFinancialAid",
        ];
        const updates: Record<string, string> = {};
        for (const field of dateFields) {
          const value = data.deadlines[field];
          if (
            value &&
            typeof value === "string" &&
            value.match(/^\d{4}-\d{2}-\d{2}$/)
          ) {
            updates[field] = value;
          }
        }

        if (Object.keys(updates).length > 0) {
          setDeadlineYears((prev) =>
            prev.map((dy) =>
              dy.admissionsCycle === currentCycle
                ? {
                    ...dy,
                    ...updates,
                    dataSource: "llm_scraped",
                    dataConfidence: data.deadlines.confidence || "medium",
                  }
                : dy
            )
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "LLM scraping failed");
    } finally {
      setIsRunningLlm(false);
    }
  };

  const selectedDeadlineYear = deadlineYears.find(
    (dy) => dy.admissionsCycle === selectedCycle
  );

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

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
        <p className="text-gray-500">
          {school.city && school.state
            ? `${school.city}, ${school.state}`
            : school.state || "Location not set"}
          {school.type && ` - ${school.type}`}
        </p>
      </div>

      {/* Admission Types */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg mb-4">Admission Types Offered</h2>
        <p className="text-sm text-gray-500 mb-4">
          Check all application options this school offers. These flags are
          stable year-over-year.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <CheckboxField
            label="Early Decision (ED)"
            checked={formData.hasEarlyDecision}
            onChange={(v) => handleChange("hasEarlyDecision", v)}
            description={ADMISSION_TYPES.early_decision.shortDescription}
          />
          <CheckboxField
            label="Early Decision II (ED2)"
            checked={formData.hasEarlyDecisionII}
            onChange={(v) => handleChange("hasEarlyDecisionII", v)}
            description={ADMISSION_TYPES.early_decision_ii.shortDescription}
          />
          <CheckboxField
            label="Early Action (EA)"
            checked={formData.hasEarlyAction}
            onChange={(v) => handleChange("hasEarlyAction", v)}
            description={ADMISSION_TYPES.early_action.shortDescription}
          />
          <CheckboxField
            label="Restrictive EA (REA/SCEA)"
            checked={formData.isRestrictiveEarlyAction}
            onChange={(v) => handleChange("isRestrictiveEarlyAction", v)}
            description={
              ADMISSION_TYPES.restrictive_early_action.shortDescription
            }
            disabled={!formData.hasEarlyAction}
          />
          <CheckboxField
            label="Rolling Admissions"
            checked={formData.hasRollingAdmissions}
            onChange={(v) => handleChange("hasRollingAdmissions", v)}
            description={ADMISSION_TYPES.rolling.shortDescription}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admissions Notes
          </label>
          <textarea
            value={formData.admissionsNotes}
            onChange={(e) => handleChange("admissionsNotes", e.target.value)}
            placeholder="Any special notes about the admissions process..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            rows={2}
          />
        </div>
      </div>

      {/* Application Deadlines by Year */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-lg">Application Deadlines</h2>
            <p className="text-sm text-gray-500">
              Manage deadlines for each admissions cycle
            </p>
          </div>
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

        {/* Cycle Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {deadlineYears
            .sort((a, b) => b.admissionsCycle - a.admissionsCycle)
            .map((dy) => (
              <button
                key={dy.admissionsCycle}
                type="button"
                onClick={() => setSelectedCycle(dy.admissionsCycle)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCycle === dy.admissionsCycle
                    ? "bg-slate-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Fall {dy.admissionsCycle}
              </button>
            ))}

          {/* Add new year button */}
          <div className="relative group">
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 hidden group-hover:block z-10">
              {[currentCycle + 1, currentCycle, currentCycle - 1].map(
                (year) =>
                  !deadlineYears.some((dy) => dy.admissionsCycle === year) && (
                    <button
                      key={year}
                      type="button"
                      onClick={() => addDeadlineYear(year)}
                      className="w-full px-3 py-1.5 text-sm text-left hover:bg-gray-50"
                    >
                      Fall {year}
                    </button>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Deadline Fields */}
        {selectedDeadlineYear ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.hasEarlyDecision && (
                <DateField
                  label="Early Decision"
                  value={selectedDeadlineYear.deadlineEd}
                  onChange={(v) =>
                    handleDeadlineChange(selectedCycle, "deadlineEd", v)
                  }
                />
              )}
              {formData.hasEarlyDecisionII && (
                <DateField
                  label="Early Decision II"
                  value={selectedDeadlineYear.deadlineEd2}
                  onChange={(v) =>
                    handleDeadlineChange(selectedCycle, "deadlineEd2", v)
                  }
                />
              )}
              {formData.hasEarlyAction && (
                <DateField
                  label={
                    formData.isRestrictiveEarlyAction
                      ? "Restrictive EA"
                      : "Early Action"
                  }
                  value={selectedDeadlineYear.deadlineEa}
                  onChange={(v) =>
                    handleDeadlineChange(selectedCycle, "deadlineEa", v)
                  }
                />
              )}
              <DateField
                label="Regular Decision"
                value={selectedDeadlineYear.deadlineRd}
                onChange={(v) =>
                  handleDeadlineChange(selectedCycle, "deadlineRd", v)
                }
              />
              {formData.hasRollingAdmissions && (
                <DateField
                  label="Priority Deadline"
                  value={selectedDeadlineYear.deadlinePriority}
                  onChange={(v) =>
                    handleDeadlineChange(selectedCycle, "deadlinePriority", v)
                  }
                />
              )}
              <DateField
                label="Financial Aid Priority"
                value={selectedDeadlineYear.deadlineFinancialAid}
                onChange={(v) =>
                  handleDeadlineChange(selectedCycle, "deadlineFinancialAid", v)
                }
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  Source:{" "}
                  <select
                    value={selectedDeadlineYear.dataSource}
                    onChange={(e) =>
                      handleDeadlineChange(
                        selectedCycle,
                        "dataSource",
                        e.target.value
                      )
                    }
                    className="border-none bg-transparent focus:ring-0 p-0 pr-6"
                  >
                    <option value="manual">Manual</option>
                    <option value="website">Website</option>
                    <option value="common_data_set">Common Data Set</option>
                    <option value="llm_scraped">AI Scraped</option>
                  </select>
                </span>
                <span>
                  Confidence:{" "}
                  <select
                    value={selectedDeadlineYear.dataConfidence}
                    onChange={(e) =>
                      handleDeadlineChange(
                        selectedCycle,
                        "dataConfidence",
                        e.target.value
                      )
                    }
                    className="border-none bg-transparent focus:ring-0 p-0 pr-6"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeDeadlineYear(selectedCycle)}
                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Remove year
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No deadline data for Fall {selectedCycle}</p>
            <button
              type="button"
              onClick={() => addDeadlineYear(selectedCycle)}
              className="mt-2 text-sm text-slate-900 hover:underline"
            >
              Add deadlines for this cycle
            </button>
          </div>
        )}
      </div>

      {/* Basic Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => handleChange("websiteUrl", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Acceptance Rate (decimal, e.g., 0.05 for 5%)
            </label>
            <input
              type="number"
              step="0.001"
              min="0"
              max="1"
              value={formData.acceptanceRate}
              onChange={(e) => handleChange("acceptanceRate", e.target.value)}
              placeholder="0.05"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-2 mb-2">
          <h2 className="font-bold text-lg">Notes</h2>
          <Info className="w-4 h-4 text-gray-400 mt-1" />
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Freeform notes about this school. This information can be used by AI
          to provide context to students.
        </p>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Add any relevant information about this school that might help students..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          rows={6}
        />
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
          <span className="text-sm text-green-600">
            Changes saved successfully!
          </span>
        )}

        {error && <span className="text-sm text-red-600">{error}</span>}

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

function CheckboxField({
  label,
  checked,
  onChange,
  description,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${checked ? "border-slate-900 bg-slate-50" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        className="mt-0.5 rounded border-gray-300 text-slate-900 focus:ring-slate-900"
      />
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {description && (
          <div className="text-xs text-gray-500 mt-0.5">{description}</div>
        )}
      </div>
    </label>
  );
}
