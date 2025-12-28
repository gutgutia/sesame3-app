"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  Edit2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface School {
  id: string;
  name: string;
  shortName: string | null;
  city: string | null;
  state: string | null;
  type: string | null;
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
  acceptanceRate: number | null;
  lastUpdated: Date;
}

interface SchoolsTableProps {
  schools: School[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  currentFilter: string;
  currentSearch: string;
}

export function SchoolsTable({
  schools,
  currentPage,
  totalPages,
  totalCount,
  currentFilter,
  currentSearch,
}: SchoolsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/admin/schools?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchInput, page: "1" });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDeadlineStatus = (school: School) => {
    const hasAny = school.deadlineRd || school.deadlineEd || school.deadlineEa;
    const hasAll = school.deadlineRd && (school.deadlineEd || school.deadlineEa);

    if (hasAll) return { status: "complete", label: "Complete", color: "text-green-600" };
    if (hasAny) return { status: "partial", label: "Partial", color: "text-amber-600" };
    return { status: "missing", label: "Missing", color: "text-red-600" };
  };

  const filters = [
    { value: "all", label: "All Schools" },
    { value: "missing-deadlines", label: "Missing Deadlines" },
    { value: "pending-review", label: "Pending Review" },
    { value: "verified", label: "Verified" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </form>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => updateParams({ filter: f.value === "all" ? "" : f.value, page: "1" })}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                currentFilter === f.value || (f.value === "all" && !currentFilter)
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">School</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Location</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">ED</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">EA</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">RD</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schools.map((school) => {
              const deadlineStatus = getDeadlineStatus(school);

              return (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">{school.name}</div>
                      {school.shortName && (
                        <div className="text-xs text-gray-500">{school.shortName}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {school.city && school.state
                      ? `${school.city}, ${school.state}`
                      : school.state || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DateCell date={school.deadlineEd} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DateCell date={school.deadlineEa} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DateCell date={school.deadlineRd} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn("text-xs font-medium", deadlineStatus.color)}>
                      {deadlineStatus.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/admin/schools/${school.id}`}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(school.name + " admissions deadlines")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Search Deadlines"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * 25 + 1}–{Math.min(currentPage * 25, totalCount)} of {totalCount}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateParams({ page: String(currentPage - 1) })}
            disabled={currentPage <= 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => updateParams({ page: String(currentPage + 1) })}
            disabled={currentPage >= totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DateCell({ date }: { date: Date | null }) {
  if (!date) {
    return <X className="w-4 h-4 text-gray-300 mx-auto" />;
  }

  const formatted = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <span className="text-gray-600">{formatted}</span>
  );
}
