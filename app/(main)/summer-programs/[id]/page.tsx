"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Loader2,
  Globe,
  Award,
  CalendarClock,
  CalendarCheck,
  CalendarX,
  Banknote,
  UserCheck,
  ClipboardList,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/context/ProfileContext";
import {
  calculateEligibility,
  getEligibilityBadge,
  type EligibilityResult,
} from "@/lib/eligibility/calculate-eligibility";

// =============================================================================
// TYPES
// =============================================================================

interface SummerProgram {
  id: string;
  name: string;
  shortName?: string | null;
  organization: string;
  description?: string | null;
  websiteUrl?: string | null;
  programYear: number;

  // Eligibility
  minGrade?: number | null;
  maxGrade?: number | null;
  minAge?: number | null;
  maxAge?: number | null;
  minGpaUnweighted?: number | null;
  minGpaWeighted?: number | null;
  citizenship?: string | null;
  requiredCourses?: string[];
  recommendedCourses?: string[];
  otherRequirements?: string[];
  eligibilityNotes?: string | null;

  // Application Timeline
  applicationOpens?: string | null;
  earlyDeadline?: string | null;
  applicationDeadline?: string | null;
  isRolling?: boolean;
  rollingNotes?: string | null;
  notificationDate?: string | null;
  applicationUrl?: string | null;
  applicationFee?: number | null;

  // Application Requirements
  requiresRecs?: boolean;
  requiresTranscript?: boolean;
  requiresEssay?: boolean;
  requiresInterview?: boolean;
  requiresTestScores?: boolean;
  applicationNotes?: string | null;

  // Program Details
  startDate?: string | null;
  endDate?: string | null;
  duration?: string | null;
  format?: string | null;
  location?: string | null;
  cost?: number | null;
  stipend?: number | null;
  financialAid?: boolean;
  costNotes?: string | null;

  // Classification
  selectivity?: string | null;
  acceptanceRate?: number | null;
  cohortSize?: number | null;
  focusAreas?: string[];
}

interface TrackingInfo {
  id: string;
  status: string;
  applicationYear: number;
  notes?: string | null;
  whyInterested?: string | null;
}

const STATUS_OPTIONS = [
  { value: "interested", label: "Interested", color: "bg-blue-100 text-blue-700" },
  { value: "researching", label: "Researching", color: "bg-purple-100 text-purple-700" },
  { value: "preparing", label: "Preparing", color: "bg-yellow-100 text-yellow-700" },
  { value: "applying", label: "Applying", color: "bg-orange-100 text-orange-700" },
  { value: "applied", label: "Applied", color: "bg-indigo-100 text-indigo-700" },
  { value: "accepted", label: "Accepted", color: "bg-green-100 text-green-700" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-700" },
  { value: "waitlisted", label: "Waitlisted", color: "bg-amber-100 text-amber-700" },
  { value: "declined", label: "Declined", color: "bg-gray-100 text-gray-700" },
  { value: "attending", label: "Attending", color: "bg-emerald-100 text-emerald-700" },
  { value: "completed", label: "Completed", color: "bg-teal-100 text-teal-700" },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatDate(dateStr: string | null | undefined, options?: Intl.DateTimeFormatOptions) {
  if (!dateStr) return null;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options || defaultOptions);
}

function formatCurrency(amount: number | null | undefined) {
  if (amount === null || amount === undefined) return null;
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatGradeRange(min: number | null | undefined, max: number | null | undefined) {
  if (!min && !max) return null;
  if (min && max && min === max) return `${min}th grade (rising)`;
  if (min && max) return `${min}th - ${max}th grade (rising)`;
  if (min) return `${min}th grade and above (rising)`;
  if (max) return `Up to ${max}th grade (rising)`;
  return null;
}

function formatAgeRange(min: number | null | undefined, max: number | null | undefined) {
  if (!min && !max) return null;
  if (min && max && min === max) return `${min} years old`;
  if (min && max) return `${min} - ${max} years old`;
  if (min) return `${min}+ years old`;
  if (max) return `Under ${max + 1} years old`;
  return null;
}

function formatCitizenship(citizenship: string | null | undefined) {
  if (!citizenship) return null;
  const map: Record<string, string> = {
    us_only: "US Citizens only",
    us_permanent_resident: "US Citizens & Permanent Residents",
    international_ok: "Open to International Students",
  };
  return map[citizenship] || citizenship;
}

function formatSelectivity(selectivity: string | null | undefined) {
  if (!selectivity) return null;
  const map: Record<string, { label: string; color: string }> = {
    highly_selective: { label: "Highly Selective", color: "bg-red-100 text-red-700" },
    selective: { label: "Selective", color: "bg-orange-100 text-orange-700" },
    moderate: { label: "Moderate", color: "bg-yellow-100 text-yellow-700" },
    open: { label: "Open Enrollment", color: "bg-green-100 text-green-700" },
  };
  return map[selectivity] || { label: selectivity, color: "bg-gray-100 text-gray-700" };
}

function formatFormat(format: string | null | undefined) {
  if (!format) return null;
  const map: Record<string, string> = {
    residential: "Residential (on-campus)",
    commuter: "Commuter (day program)",
    online: "Online / Virtual",
    hybrid: "Hybrid (online + in-person)",
  };
  return map[format] || format;
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function SummerProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { profile } = useProfile();

  const [program, setProgram] = useState<SummerProgram | null>(null);
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const programId = params.id as string;

  // Fetch program data
  const fetchProgram = useCallback(async () => {
    try {
      const res = await fetch(`/api/summer-programs/${programId}`);
      if (res.ok) {
        const data = await res.json();
        setProgram(data.program);
        setTracking(data.tracking);
      } else if (res.status === 404) {
        router.push("/opportunities");
      }
    } catch (error) {
      console.error("Error fetching program:", error);
    } finally {
      setIsLoading(false);
    }
  }, [programId, router]);

  useEffect(() => {
    fetchProgram();
  }, [fetchProgram]);

  // Add to tracking
  const handleAddToTracking = async () => {
    setIsAdding(true);
    try {
      const res = await fetch("/api/opportunities/summer-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summerProgramId: programId }),
      });

      if (res.ok) {
        const data = await res.json();
        setTracking({
          id: data.id,
          status: data.status,
          applicationYear: data.applicationYear,
          notes: null,
          whyInterested: null,
        });
      }
    } catch (error) {
      console.error("Error adding to tracking:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Update status
  const handleUpdateStatus = async (newStatus: string) => {
    if (!tracking) return;

    try {
      const res = await fetch(`/api/opportunities/summer-programs/${tracking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setTracking({ ...tracking, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setShowStatusDropdown(false);
  };

  // Calculate eligibility
  const eligibility: EligibilityResult | null =
    profile && program
      ? calculateEligibility(
          profile as Parameters<typeof calculateEligibility>[0],
          program as Parameters<typeof calculateEligibility>[1]
        )
      : null;
  const eligibilityBadge = eligibility ? getEligibilityBadge(eligibility.overall) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Program not found</h2>
          <Link href="/opportunities" className="text-accent-primary hover:underline">
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const selectivityInfo = formatSelectivity(program.selectivity);
  const statusOption = tracking
    ? STATUS_OPTIONS.find((s) => s.value === tracking.status) || STATUS_OPTIONS[0]
    : null;

  // Check deadline status
  const now = new Date();
  const deadlineDate = program.applicationDeadline ? new Date(program.applicationDeadline) : null;
  const opensDate = program.applicationOpens ? new Date(program.applicationOpens) : null;
  const isDeadlinePassed = deadlineDate && deadlineDate < now;
  const isNotYetOpen = opensDate && opensDate > now;
  const isDeadlineSoon =
    deadlineDate && !isDeadlinePassed && deadlineDate.getTime() - now.getTime() < 30 * 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen pb-8">
      {/* Back button */}
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Opportunities
      </Link>

      {/* Header */}
      <div className="bg-white border border-border-subtle rounded-[20px] p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            {/* Title and org */}
            <div className="flex items-start gap-3 mb-2">
              {program.shortName && (
                <span className="inline-flex items-center px-3 py-1 bg-accent-surface text-accent-primary rounded-lg font-semibold text-sm">
                  {program.shortName}
                </span>
              )}
              {selectivityInfo && (
                <span className={cn("inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium", selectivityInfo.color)}>
                  {selectivityInfo.label}
                </span>
              )}
            </div>
            <h1 className="font-display font-bold text-2xl lg:text-3xl text-text-main mb-2">
              {program.name}
            </h1>
            <p className="text-lg text-text-muted">{program.organization}</p>

            {/* Focus areas */}
            {program.focusAreas && program.focusAreas.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {program.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 bg-surface-secondary text-text-muted rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 lg:items-end">
            {/* Tracking status or Add button */}
            {tracking ? (
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    statusOption?.color
                  )}
                >
                  {statusOption?.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showStatusDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowStatusDropdown(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white border border-border-subtle rounded-xl shadow-lg z-20 py-1 min-w-[160px] max-h-[280px] overflow-y-auto">
                      {STATUS_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleUpdateStatus(opt.value)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm w-full transition-colors",
                            tracking.status === opt.value
                              ? "bg-accent-surface text-accent-primary"
                              : "text-text-primary hover:bg-surface-secondary"
                          )}
                        >
                          {tracking.status === opt.value && <Check className="w-3 h-3" />}
                          <span className={cn(tracking.status !== opt.value && "ml-5")}>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button onClick={handleAddToTracking} disabled={isAdding}>
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Track This Program
                  </>
                )}
              </Button>
            )}

            {/* Visit website */}
            {program.websiteUrl && (
              <a
                href={program.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle rounded-xl text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Apply button */}
            {program.applicationUrl && !isDeadlinePassed && (
              <a
                href={program.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-xl text-sm font-medium hover:bg-accent-primary/90 transition-colors"
              >
                Apply Now
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {program.description && (
            <section className="bg-white border border-border-subtle rounded-[20px] p-6">
              <h2 className="font-display font-semibold text-lg text-text-primary mb-4">About the Program</h2>
              <p className="text-text-muted whitespace-pre-line">{program.description}</p>
            </section>
          )}

          {/* Application Timeline */}
          <section className="bg-white border border-border-subtle rounded-[20px] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-accent-primary" />
              Application Timeline
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Application Opens */}
              <div className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl">
                <CalendarCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-text-primary">Application Opens</div>
                  <div className="text-sm text-text-muted">
                    {formatDate(program.applicationOpens) || "Not specified"}
                    {isNotYetOpen && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        Not yet open
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Early Deadline */}
              {program.earlyDeadline && (
                <div className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl">
                  <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Early Deadline</div>
                    <div className="text-sm text-text-muted">{formatDate(program.earlyDeadline)}</div>
                  </div>
                </div>
              )}

              {/* Application Deadline */}
              <div className={cn("flex items-start gap-3 p-3 rounded-xl", isDeadlinePassed ? "bg-red-50" : isDeadlineSoon ? "bg-orange-50" : "bg-surface-secondary")}>
                <CalendarX className={cn("w-5 h-5 mt-0.5", isDeadlinePassed ? "text-red-600" : isDeadlineSoon ? "text-orange-600" : "text-red-500")} />
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {program.isRolling ? "Rolling Deadline" : "Application Deadline"}
                  </div>
                  <div className={cn("text-sm", isDeadlinePassed ? "text-red-600" : isDeadlineSoon ? "text-orange-600" : "text-text-muted")}>
                    {formatDate(program.applicationDeadline) || (program.isRolling ? "Rolling" : "Not specified")}
                    {isDeadlinePassed && <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Passed</span>}
                    {isDeadlineSoon && !isDeadlinePassed && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">Soon!</span>
                    )}
                  </div>
                  {program.rollingNotes && (
                    <div className="text-xs text-text-light mt-1">{program.rollingNotes}</div>
                  )}
                </div>
              </div>

              {/* Notification Date */}
              {program.notificationDate && (
                <div className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Decision Notification</div>
                    <div className="text-sm text-text-muted">{formatDate(program.notificationDate)}</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Application Requirements */}
          {(program.requiresRecs || program.requiresTranscript || program.requiresEssay || program.requiresInterview || program.requiresTestScores || program.applicationNotes) && (
            <section className="bg-white border border-border-subtle rounded-[20px] p-6">
              <h2 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-accent-primary" />
                Application Requirements
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {program.requiresTranscript && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Transcript
                  </div>
                )}
                {program.requiresRecs && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Recommendations
                  </div>
                )}
                {program.requiresEssay && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Essay
                  </div>
                )}
                {program.requiresTestScores && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Test Scores
                  </div>
                )}
                {program.requiresInterview && (
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Interview
                  </div>
                )}
              </div>
              {program.applicationNotes && (
                <p className="mt-4 text-sm text-text-muted">{program.applicationNotes}</p>
              )}
              {program.applicationFee !== null && program.applicationFee !== undefined && (
                <div className="mt-4 pt-4 border-t border-border-subtle">
                  <span className="text-sm text-text-muted">
                    Application Fee: <strong>{program.applicationFee === 0 ? "Free" : `$${program.applicationFee}`}</strong>
                  </span>
                </div>
              )}
            </section>
          )}

          {/* Program Details */}
          <section className="bg-white border border-border-subtle rounded-[20px] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent-primary" />
              Program Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dates */}
              {(program.startDate || program.endDate) && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Program Dates</div>
                    <div className="text-sm text-text-muted">
                      {formatDate(program.startDate, { month: "short", day: "numeric" })}
                      {program.endDate && ` - ${formatDate(program.endDate, { month: "short", day: "numeric", year: "numeric" })}`}
                    </div>
                  </div>
                </div>
              )}

              {/* Duration */}
              {program.duration && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Duration</div>
                    <div className="text-sm text-text-muted">{program.duration}</div>
                  </div>
                </div>
              )}

              {/* Format */}
              {program.format && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Format</div>
                    <div className="text-sm text-text-muted">{formatFormat(program.format)}</div>
                  </div>
                </div>
              )}

              {/* Location */}
              {program.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Location</div>
                    <div className="text-sm text-text-muted">{program.location}</div>
                  </div>
                </div>
              )}

              {/* Cohort Size */}
              {program.cohortSize && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Cohort Size</div>
                    <div className="text-sm text-text-muted">{program.cohortSize} students</div>
                  </div>
                </div>
              )}

              {/* Acceptance Rate */}
              {program.acceptanceRate !== null && program.acceptanceRate !== undefined && (
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Acceptance Rate</div>
                    <div className="text-sm text-text-muted">{(program.acceptanceRate * 100).toFixed(0)}%</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Cost & Financial Aid */}
          <section className="bg-white border border-border-subtle rounded-[20px] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent-primary" />
              Cost & Financial Aid
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cost */}
              <div className="flex items-start gap-3 p-3 bg-surface-secondary rounded-xl">
                <Banknote className="w-5 h-5 text-text-muted mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-text-primary">Program Cost</div>
                  <div className="text-sm text-text-muted">
                    {program.cost === 0 || program.cost === null ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      formatCurrency(program.cost)
                    )}
                  </div>
                </div>
              </div>

              {/* Stipend */}
              {program.stipend !== null && program.stipend !== undefined && program.stipend > 0 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Stipend</div>
                    <div className="text-sm text-green-600 font-medium">{formatCurrency(program.stipend)}</div>
                  </div>
                </div>
              )}

              {/* Financial Aid */}
              {program.financialAid && (
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Financial Aid Available</div>
                    <div className="text-sm text-text-muted">{program.costNotes || "Need-based aid available"}</div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right column - Eligibility & Quick Info */}
        <div className="space-y-6">
          {/* Eligibility Card */}
          <section className="bg-white border border-border-subtle rounded-[20px] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-accent-primary" />
              Your Eligibility
            </h2>

            {!eligibility ? (
              <div className="text-sm text-text-muted text-center py-4">
                Complete your profile to check eligibility.
              </div>
            ) : (
              <>
                {/* Overall status */}
                <div className={cn("flex items-center gap-3 p-4 rounded-xl mb-4", eligibilityBadge?.bgColor)}>
                  {eligibility.overall === "eligible" && <CheckCircle2 className={cn("w-6 h-6", eligibilityBadge?.color)} />}
                  {eligibility.overall === "ineligible" && <AlertCircle className={cn("w-6 h-6", eligibilityBadge?.color)} />}
                  {(eligibility.overall === "check_required" || eligibility.overall === "unknown") && (
                    <HelpCircle className={cn("w-6 h-6", eligibilityBadge?.color)} />
                  )}
                  <div>
                    <div className={cn("font-semibold", eligibilityBadge?.color)}>{eligibilityBadge?.label}</div>
                    <div className="text-sm text-text-muted">{eligibility.summary}</div>
                  </div>
                </div>

                {/* Individual checks */}
                <div className="space-y-2">
                  {eligibility.checks.map((check, i) => {
                    const checkBadge = getEligibilityBadge(check.status);
                    return (
                      <div key={i} className="flex items-start gap-2 p-2 bg-surface-secondary rounded-lg">
                        <div className={cn("w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5", checkBadge.bgColor)}>
                          {check.status === "eligible" && <Check className={cn("w-2.5 h-2.5", checkBadge.color)} />}
                          {check.status === "ineligible" && <span className={cn("w-1.5 h-1.5 bg-current rounded-full", checkBadge.color)} />}
                          {(check.status === "check_required" || check.status === "unknown") && (
                            <span className={cn("text-xs font-bold", checkBadge.color)}>?</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-text-primary">{check.criterion}</div>
                          <div className="text-xs text-text-muted">{check.message}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>

          {/* Eligibility Requirements Card */}
          <section className="bg-white border border-border-subtle rounded-[20px] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-primary" />
              Requirements
            </h2>
            <div className="space-y-3">
              {/* Grade */}
              {(program.minGrade || program.maxGrade) && (
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-text-muted mt-0.5" />
                  <div className="text-sm text-text-muted">{formatGradeRange(program.minGrade, program.maxGrade)}</div>
                </div>
              )}

              {/* Age */}
              {(program.minAge || program.maxAge) && (
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-text-muted mt-0.5" />
                  <div className="text-sm text-text-muted">{formatAgeRange(program.minAge, program.maxAge)}</div>
                </div>
              )}

              {/* GPA */}
              {(program.minGpaUnweighted || program.minGpaWeighted) && (
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-text-muted mt-0.5" />
                  <div className="text-sm text-text-muted">
                    {program.minGpaUnweighted && `${program.minGpaUnweighted}+ GPA (unweighted)`}
                    {program.minGpaUnweighted && program.minGpaWeighted && " or "}
                    {program.minGpaWeighted && `${program.minGpaWeighted}+ GPA (weighted)`}
                  </div>
                </div>
              )}

              {/* Citizenship */}
              {program.citizenship && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-text-muted mt-0.5" />
                  <div className="text-sm text-text-muted">{formatCitizenship(program.citizenship)}</div>
                </div>
              )}

              {/* Required Courses */}
              {program.requiredCourses && program.requiredCourses.length > 0 && (
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-1">Required Courses</div>
                    <div className="text-sm text-text-muted">{program.requiredCourses.join(", ")}</div>
                  </div>
                </div>
              )}

              {/* Recommended Courses */}
              {program.recommendedCourses && program.recommendedCourses.length > 0 && (
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-text-light mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-text-muted mb-1">Recommended Courses</div>
                    <div className="text-sm text-text-light">{program.recommendedCourses.join(", ")}</div>
                  </div>
                </div>
              )}

              {/* Other Requirements */}
              {program.otherRequirements && program.otherRequirements.length > 0 && (
                <div className="pt-2 border-t border-border-subtle">
                  <div className="text-sm font-medium text-text-primary mb-2">Other Requirements</div>
                  <ul className="space-y-1">
                    {program.otherRequirements.map((req, i) => (
                      <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                        <span className="text-text-light">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligibility Notes */}
              {program.eligibilityNotes && (
                <div className="pt-2 border-t border-border-subtle">
                  <p className="text-sm text-text-muted italic">{program.eligibilityNotes}</p>
                </div>
              )}
            </div>
          </section>

          {/* Program Year Note */}
          <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
            <strong>Program Year:</strong> {program.programYear}
            <p className="mt-1 text-blue-600">
              Eligibility is calculated based on your age and grade at the time of the program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
