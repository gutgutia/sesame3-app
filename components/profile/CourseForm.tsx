"use client";

import React, { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const SUBJECT_OPTIONS = [
  { value: "", label: "Select subject..." },
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "English", label: "English" },
  { value: "History", label: "History / Social Studies" },
  { value: "Language", label: "World Language" },
  { value: "Arts", label: "Arts" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Other", label: "Other" },
];

const LEVEL_OPTIONS = [
  { value: "", label: "Select level..." },
  { value: "regular", label: "Regular" },
  { value: "honors", label: "Honors" },
  { value: "ap", label: "AP" },
  { value: "ib", label: "IB" },
  { value: "college", label: "Dual Enrollment / College" },
  { value: "other", label: "Other" },
];

const GRADE_OPTIONS = [
  { value: "", label: "Select grade..." },
  { value: "A+", label: "A+ (4.0)" },
  { value: "A", label: "A (4.0)" },
  { value: "A-", label: "A- (3.7)" },
  { value: "B+", label: "B+ (3.3)" },
  { value: "B", label: "B (3.0)" },
  { value: "B-", label: "B- (2.7)" },
  { value: "C+", label: "C+ (2.3)" },
  { value: "C", label: "C (2.0)" },
  { value: "C-", label: "C- (1.7)" },
  { value: "D+", label: "D+ (1.3)" },
  { value: "D", label: "D (1.0)" },
  { value: "D-", label: "D- (0.7)" },
  { value: "F", label: "F (0.0)" },
  { value: "P", label: "Pass" },
  { value: "IP", label: "In Progress" },
];

const GRADE_LEVEL_OPTIONS = [
  { value: "", label: "Select year..." },
  { value: "9th", label: "9th Grade (Freshman)" },
  { value: "10th", label: "10th Grade (Sophomore)" },
  { value: "11th", label: "11th Grade (Junior)" },
  { value: "12th", label: "12th Grade (Senior)" },
];

const STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "in_progress", label: "In Progress" },
  { value: "planned", label: "Planned" },
];

// Grade to numeric value mapping
const GRADE_VALUES: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

interface CourseFormProps {
  initialData?: {
    id?: string;
    name?: string;
    subject?: string | null;
    level?: string | null;
    status?: string;
    gradeLevel?: string | null;
    grade?: string | null;
    credits?: number | null;
  };
  onSubmit: (data: {
    name: string;
    subject?: string;
    level?: string;
    status: string;
    gradeLevel?: string;
    grade?: string;
    gradeNumeric?: number;
    credits?: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export function CourseForm({ initialData, onSubmit, onCancel }: CourseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(initialData?.name || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [level, setLevel] = useState(initialData?.level || "regular");
  const [status, setStatus] = useState(initialData?.status || "completed");
  const [gradeLevel, setGradeLevel] = useState(initialData?.gradeLevel || "");
  const [grade, setGrade] = useState(initialData?.grade || "");
  const [credits, setCredits] = useState(initialData?.credits?.toString() || "1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        name: name.trim(),
        subject: subject || undefined,
        level: level || undefined,
        status,
        gradeLevel: gradeLevel || undefined,
        grade: grade || undefined,
        gradeNumeric: grade ? GRADE_VALUES[grade] : undefined,
        credits: credits ? parseFloat(credits) : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showGradeField = status === "completed" || status === "in_progress";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Course Name"
        placeholder="e.g., AP Calculus BC, Honors Chemistry"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Subject"
          options={SUBJECT_OPTIONS}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Select
          label="Course Level"
          options={LEVEL_OPTIONS}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Year Taken"
          options={GRADE_LEVEL_OPTIONS}
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
        />
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      {showGradeField && (
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Final Grade"
            options={GRADE_OPTIONS}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <Input
            label="Credits"
            type="number"
            min="0.5"
            max="2"
            step="0.5"
            placeholder="1"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            hint="Usually 1.0 for full year"
          />
        </div>
      )}

      {/* Level indicator */}
      {level && level !== "regular" && (
        <div className="bg-accent-surface/50 border border-accent-border rounded-xl p-3 flex items-center gap-2">
          <span className="text-xs font-medium text-accent-primary uppercase">{level.toUpperCase()}</span>
          <span className="text-sm text-text-muted">
            {level === "ap" && "This course will add +1.0 to your weighted GPA"}
            {level === "honors" && "This course will add +0.5 to your weighted GPA"}
            {level === "ib" && "This course will add +1.0 to your weighted GPA"}
            {level === "college" && "This course will add +1.0 to your weighted GPA"}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me with my course selection"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help?</span>
        </Link>
        
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !name.trim()}>
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Add Course"}
          </Button>
        </div>
      </div>
    </form>
  );
}

