"use client";

import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  PenTool, 
  Users, 
  Trophy, 
  FlaskConical,
  ChevronRight,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/context/ProfileContext";
import { calculateGPA, formatGPA } from "@/lib/gpa-calculator";

// =============================================================================
// MAIN PROFILE OVERVIEW PAGE
// =============================================================================

export default function ProfileOverviewPage() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-text-muted mb-4">Failed to load profile</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Calculate stats
  const gpaResult = calculateGPA(profile?.courses || []);
  const satScores = profile?.testing?.satScores || [];
  const actScores = profile?.testing?.actScores || [];
  const bestSAT = satScores.length > 0 ? Math.max(...satScores.map(s => s.total)) : null;
  const bestACT = actScores.length > 0 ? Math.max(...actScores.map(s => s.composite)) : null;
  
  const courseCount = profile?.courses?.length || 0;
  const activityCount = profile?.activities?.length || 0;
  const awardCount = profile?.awards?.length || 0;
  const programCount = profile?.programs?.length || 0;

  // Profile completeness
  const completenessItems = [
    { label: "About Me", done: !!profile?.aboutMe?.story },
    { label: "Courses", done: courseCount >= 5 },
    { label: "Test Scores", done: satScores.length > 0 || actScores.length > 0 },
    { label: "Activities", done: activityCount >= 3 },
    { label: "Awards", done: awardCount >= 1 },
  ];
  const completedCount = completenessItems.filter(i => i.done).length;
  const completenessPercent = Math.round((completedCount / completenessItems.length) * 100);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-main mb-2">Your Profile</h1>
          <p className="text-text-muted">Your academic and extracurricular snapshot.</p>
        </div>
      </div>

      {/* Top Row: Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Unweighted GPA" 
          value={formatGPA(gpaResult.unweighted)} 
          subtext={courseCount > 0 ? `from ${courseCount} courses` : undefined}
          accent
        />
        <StatCard 
          label="Weighted GPA" 
          value={formatGPA(gpaResult.weighted)} 
          subtext={gpaResult.apCount > 0 ? `${gpaResult.apCount} AP/IB courses` : undefined}
          accent
        />
        <StatCard 
          label="Best SAT" 
          value={bestSAT?.toString() || "—"} 
          subtext={satScores.length > 0 ? `${satScores.length} attempt${satScores.length > 1 ? "s" : ""}` : undefined}
        />
        <StatCard 
          label="Best ACT" 
          value={bestACT?.toString() || "—"} 
          subtext={actScores.length > 0 ? `${actScores.length} attempt${actScores.length > 1 ? "s" : ""}` : undefined}
        />
      </div>

      {/* About Me + Completeness Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* About Me */}
        <div className="lg:col-span-2">
          <AboutMeCard aboutMe={profile?.aboutMe} />
        </div>

        {/* Profile Completeness */}
        <div className="bg-white border border-border-subtle rounded-[20px] p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-text-main">Profile Completeness</h3>
            <span className="text-2xl font-bold text-accent-primary">{completenessPercent}%</span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-bg-sidebar rounded-full mb-5 overflow-hidden">
            <div 
              className="h-full bg-accent-primary rounded-full transition-all duration-500"
              style={{ width: `${completenessPercent}%` }}
            />
          </div>

          <div className="space-y-2.5">
            {completenessItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-accent-primary" />
                ) : (
                  <Circle className="w-4 h-4 text-border-medium" />
                )}
                <span className={cn(
                  "text-sm",
                  item.done ? "text-text-main" : "text-text-muted"
                )}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCard
          icon={GraduationCap}
          title="Courses"
          description="Your coursework and GPA"
          href="/profile/courses"
          stats={[
            { label: "Courses", value: courseCount },
            { label: "AP/IB", value: gpaResult.apCount },
            { label: "Honors", value: gpaResult.honorsCount },
          ]}
          isEmpty={courseCount === 0}
          emptyMessage="Add your courses to calculate GPA"
        />

        <SectionCard
          icon={PenTool}
          title="Testing"
          description="SAT, ACT, and AP scores"
          href="/profile/testing"
          stats={[
            { label: "SAT", value: satScores.length },
            { label: "ACT", value: actScores.length },
            { label: "AP", value: profile?.testing?.apScores?.length || 0 },
          ]}
          isEmpty={satScores.length === 0 && actScores.length === 0}
          emptyMessage="Add your test scores"
        />

        <SectionCard
          icon={Users}
          title="Activities"
          description="Extracurriculars and involvement"
          href="/profile/activities"
          stats={[
            { label: "Total", value: activityCount },
            { label: "Leadership", value: profile?.activities?.filter(a => a.isLeadership).length || 0 },
            { label: "Spike", value: profile?.activities?.filter(a => a.isSpike).length || 0 },
          ]}
          isEmpty={activityCount === 0}
          emptyMessage="Add your activities"
        />

        <SectionCard
          icon={Trophy}
          title="Awards"
          description="Honors and recognitions"
          href="/profile/awards"
          stats={[
            { label: "Total", value: awardCount },
          ]}
          isEmpty={awardCount === 0}
          emptyMessage="Add your awards"
        />

        <SectionCard
          icon={FlaskConical}
          title="Programs"
          description="Summer programs and research"
          href="/profile/programs"
          stats={[
            { label: "Total", value: programCount },
          ]}
          isEmpty={programCount === 0}
          emptyMessage="Add programs you've done"
        />
      </div>

      {/* Chat Prompt */}
      <div className="mt-8 bg-bg-sidebar/50 border border-border-subtle rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent-surface text-accent-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-medium text-text-main">Need help with your profile?</div>
            <div className="text-sm text-text-muted">Chat with your advisor for personalized guidance</div>
          </div>
        </div>
        <Link href="/advisor?mode=profile">
          <Button variant="secondary">
            <MessageCircle className="w-4 h-4" />
            Chat with Advisor
          </Button>
        </Link>
      </div>
    </>
  );
}

// =============================================================================
// COMPONENTS
// =============================================================================

function StatCard({ 
  label, 
  value, 
  subtext,
  accent,
}: { 
  label: string; 
  value: string; 
  subtext?: string;
  accent?: boolean;
}) {
  return (
    <div className={cn(
      "rounded-[16px] p-5 border",
      accent 
        ? "bg-accent-surface/50 border-accent-border" 
        : "bg-white border-border-subtle shadow-card"
    )}>
      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">{label}</div>
      <div className={cn(
        "text-3xl font-mono font-bold",
        accent ? "text-accent-primary" : "text-text-main"
      )}>
        {value}
      </div>
      {subtext && (
        <div className="text-xs text-text-muted mt-1">{subtext}</div>
      )}
    </div>
  );
}

interface AboutMe {
  story?: string | null;
  interests?: string[] | null;
  values?: string[] | null;
}

function AboutMeCard({ aboutMe }: { aboutMe: AboutMe | null | undefined }) {
  if (!aboutMe?.story) {
    return (
      <div className="bg-bg-sidebar border border-border-subtle rounded-[20px] p-6 h-full flex items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-text-muted border border-border-subtle shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-text-main mb-1">Tell us about yourself</h3>
            <p className="text-sm text-text-muted">Beyond grades and scores — who are you?</p>
          </div>
          <Link href="/advisor?mode=story">
            <Button size="sm">
              <MessageCircle className="w-4 h-4" />
              Share My Story
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-subtle rounded-[20px] p-6 shadow-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-text-main">About Me</h3>
        <Link href="/advisor?mode=story" className="text-sm text-accent-primary hover:underline">
          Edit
        </Link>
      </div>
      <p className="text-sm text-text-main leading-relaxed mb-4 line-clamp-3">{aboutMe.story}</p>
      
      <div className="flex flex-wrap gap-2">
        {aboutMe.values?.slice(0, 3).map((value, i) => (
          <span key={i} className="px-3 py-1 bg-accent-surface text-accent-primary text-xs font-medium rounded-full">
            {value}
          </span>
        ))}
        {aboutMe.interests?.slice(0, 3).map((interest, i) => (
          <span key={i} className="px-3 py-1 bg-bg-sidebar text-text-muted text-xs font-medium rounded-full">
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  description,
  href,
  stats,
  isEmpty,
  emptyMessage,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  stats: Array<{ label: string; value: number }>;
  isEmpty?: boolean;
  emptyMessage?: string;
}) {
  return (
    <Link 
      href={href}
      className="group bg-white border border-border-subtle rounded-[20px] p-6 shadow-card hover:border-accent-primary hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bg-sidebar rounded-xl flex items-center justify-center text-text-muted group-hover:bg-accent-surface group-hover:text-accent-primary transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-text-main">{title}</h3>
            <p className="text-xs text-text-muted">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-text-light group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
      </div>

      {isEmpty ? (
        <div className="text-sm text-text-muted py-4 text-center bg-bg-sidebar/50 rounded-xl">
          {emptyMessage}
        </div>
      ) : (
        <div className="flex gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-bold text-text-main">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}
