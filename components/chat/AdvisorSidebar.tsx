"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

type AdvisorContext = {
  profileSnapshot: {
    name: string;
    grade: string | null;
    school: string | null;
    gpa: number | null;
    sat: number | null;
    act: number | null;
  };
  objectives: string[];
  objectivesGeneratedAt: string | null;
  deadlines: Array<{
    label: string;
    daysUntil: number;
    priority: string;
    type: string;
  }>;
  commitments: string[];
  goals: Array<{
    id: string;
    title: string;
    status: string;
    category: string | null;
    progress: number | null;
    taskCount: number;
    completedCount: number;
  }>;
  sessionInfo: {
    daysSinceLastSession: number | null;
    totalConversations: number;
  };
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AdvisorSidebar() {
  const [context, setContext] = useState<AdvisorContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContext = async () => {
      try {
        const res = await fetch("/api/advisor/context");
        if (res.ok) {
          const data = await res.json();
          setContext(data);
        }
      } catch (error) {
        console.error("Failed to load advisor context:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContext();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
      </div>
    );
  }

  if (!context) {
    return (
      <div className="p-4 text-center text-text-muted">
        Unable to load context
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto">
      {/* Profile Snapshot */}
      <ProfileSnapshot snapshot={context.profileSnapshot} />

      {/* Session Objectives */}
      {context.objectives.length > 0 && (
        <ObjectivesSection objectives={context.objectives} />
      )}

      {/* Upcoming Deadlines */}
      {context.deadlines.length > 0 && (
        <DeadlinesSection deadlines={context.deadlines} />
      )}

      {/* Open Commitments */}
      {context.commitments.length > 0 && (
        <CommitmentsSection commitments={context.commitments} />
      )}

      {/* Active Goals */}
      {context.goals.length > 0 && <GoalsSection goals={context.goals} />}

      {/* Session Info (subtle footer) */}
      <SessionInfo info={context.sessionInfo} />
    </div>
  );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

function ProfileSnapshot({
  snapshot,
}: {
  snapshot: AdvisorContext["profileSnapshot"];
}) {
  const stats = [
    snapshot.gpa && { label: "GPA", value: snapshot.gpa.toFixed(2) },
    snapshot.sat && { label: "SAT", value: snapshot.sat.toString() },
    snapshot.act && { label: "ACT", value: snapshot.act.toString() },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <div className="bg-white rounded-xl p-4 border border-border-subtle">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-accent-surface text-accent-primary rounded-full flex items-center justify-center font-semibold">
          {snapshot.name[0]?.toUpperCase() || "S"}
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">{snapshot.name}</h3>
          <p className="text-sm text-text-muted">
            {snapshot.grade && formatGrade(snapshot.grade)}
            {snapshot.school && ` at ${snapshot.school}`}
          </p>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="flex gap-4 pt-3 border-t border-border-subtle">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex-1">
              <div className="text-lg font-semibold text-text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ObjectivesSection({ objectives }: { objectives: string[] }) {
  return (
    <SidebarSection title="Today's Focus" icon={Target}>
      <ul className="space-y-2">
        {objectives.map((objective, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-text-secondary"
          >
            <span className="w-5 h-5 bg-accent-surface text-accent-primary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="leading-snug">{objective}</span>
          </li>
        ))}
      </ul>
    </SidebarSection>
  );
}

function DeadlinesSection({
  deadlines,
}: {
  deadlines: AdvisorContext["deadlines"];
}) {
  return (
    <SidebarSection title="Upcoming Deadlines" icon={Clock}>
      <ul className="space-y-2">
        {deadlines.map((deadline, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center justify-between text-sm p-2 rounded-lg",
              deadline.priority === "urgent"
                ? "bg-red-50 text-red-700"
                : deadline.priority === "soon"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-surface-secondary text-text-secondary"
            )}
          >
            <span className="flex items-center gap-2">
              {deadline.priority === "urgent" && (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span className="truncate max-w-[180px]">{deadline.label}</span>
            </span>
            <span className="font-medium text-xs whitespace-nowrap">
              {deadline.daysUntil === 0
                ? "Today"
                : deadline.daysUntil === 1
                  ? "Tomorrow"
                  : `${deadline.daysUntil}d`}
            </span>
          </li>
        ))}
      </ul>
    </SidebarSection>
  );
}

function CommitmentsSection({ commitments }: { commitments: string[] }) {
  return (
    <SidebarSection title="Open Commitments" icon={CheckCircle2}>
      <ul className="space-y-2">
        {commitments.map((commitment, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-text-secondary"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 flex-shrink-0" />
            <span className="leading-snug">{commitment}</span>
          </li>
        ))}
      </ul>
    </SidebarSection>
  );
}

function GoalsSection({ goals }: { goals: AdvisorContext["goals"] }) {
  return (
    <SidebarSection title="Active Goals" icon={Target}>
      <ul className="space-y-3">
        {goals.slice(0, 3).map((goal) => (
          <li key={goal.id}>
            <Link
              href={`/plan?goal=${goal.id}`}
              className="block p-2 rounded-lg hover:bg-surface-secondary transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                  {goal.title}
                </span>
                <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {goal.taskCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-primary rounded-full transition-all"
                      style={{ width: `${goal.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">
                    {goal.completedCount}/{goal.taskCount}
                  </span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarSection>
  );
}

function SessionInfo({
  info,
}: {
  info: AdvisorContext["sessionInfo"];
}) {
  if (info.totalConversations === 0 && info.daysSinceLastSession === null) {
    return null;
  }

  return (
    <div className="mt-auto pt-4 border-t border-border-subtle">
      <p className="text-xs text-text-muted text-center">
        {info.daysSinceLastSession !== null ? (
          info.daysSinceLastSession === 0 ? (
            "Last chat: earlier today"
          ) : info.daysSinceLastSession === 1 ? (
            "Last chat: yesterday"
          ) : (
            `Last chat: ${info.daysSinceLastSession} days ago`
          )
        ) : (
          "Welcome to your first session!"
        )}
        {info.totalConversations > 0 && (
          <span className="mx-1">•</span>
        )}
        {info.totalConversations > 0 && (
          `${info.totalConversations} total session${info.totalConversations === 1 ? "" : "s"}`
        )}
      </p>
    </div>
  );
}

// =============================================================================
// HELPERS
// =============================================================================

function SidebarSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-text-muted" />
        <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function formatGrade(grade: string): string {
  const gradeMap: Record<string, string> = {
    "9th": "Freshman",
    "10th": "Sophomore",
    "11th": "Junior",
    "12th": "Senior",
    gap_year: "Gap Year",
  };
  return gradeMap[grade] || grade;
}
