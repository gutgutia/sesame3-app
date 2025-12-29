"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface School {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  type: string | null;
  hasEarlyDecision: boolean;
  hasEarlyDecisionII: boolean;
  hasEarlyAction: boolean;
  isRestrictiveEarlyAction: boolean;
  hasRollingAdmissions: boolean;
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

  const getAdmissionTypes = (school: School) => {
    const types: string[] = [];
    if (school.hasEarlyDecision) types.push("ED");
    if (school.hasEarlyDecisionII) types.push("ED2");
    if (school.hasEarlyAction) {
      types.push(school.isRestrictiveEarlyAction ? "REA" : "EA");
    }
    if (school.hasRollingAdmissions) types.push("Rolling");
    return types;
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
              onClick={() =>
                updateParams({
                  filter: f.value === "all" ? "" : f.value,
                  page: "1",
                })
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                currentFilter === f.value ||
                  (f.value === "all" && !currentFilter)
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
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                School
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">
                Location
              </th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">
                Type
              </th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">
                Admission Options
              </th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">
                Accept Rate
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schools.map((school) => {
              const admissionTypes = getAdmissionTypes(school);

              return (
                <tr
                  key={school.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/schools/${school.id}`)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {school.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {school.city && school.state
                      ? `${school.city}, ${school.state}`
                      : school.state || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {school.type && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {school.type}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {admissionTypes.length > 0 ? (
                        admissionTypes.map((type) => (
                          <span
                            key={type}
                            className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                          >
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Not configured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {school.acceptanceRate
                      ? `${(school.acceptanceRate * 100).toFixed(1)}%`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
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
          Showing {(currentPage - 1) * 25 + 1}–
          {Math.min(currentPage * 25, totalCount)} of {totalCount}
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
