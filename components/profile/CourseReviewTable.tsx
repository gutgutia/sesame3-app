"use client";

import React, { useState } from "react";
import { Check, X, AlertTriangle, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface ExtractedCourse {
  name: string;
  subject: string;
  level: string;
  gradeLevel: string;
  grade?: string;
  credits?: number;
  isDuplicate?: boolean;
  isPotentialDuplicate?: boolean;
  matchType?: "exact" | "similar" | "new";
  existingName?: string;
}

interface CourseReviewTableProps {
  courses: ExtractedCourse[];
  studentName?: string;
  schoolName?: string;
  gpaUnweighted?: number;
  gpaWeighted?: number;
  onImport: (courses: ExtractedCourse[]) => Promise<void>;
  onCancel: () => void;
}

const SUBJECT_OPTIONS = [
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "English", label: "English" },
  { value: "History", label: "History" },
  { value: "Language", label: "Language" },
  { value: "Arts", label: "Arts" },
  { value: "Computer Science", label: "CS" },
  { value: "Other", label: "Other" },
];

const LEVEL_OPTIONS = [
  { value: "regular", label: "Regular" },
  { value: "honors", label: "Honors" },
  { value: "ap", label: "AP" },
  { value: "ib", label: "IB" },
  { value: "college", label: "College" },
];

const GRADE_LEVEL_OPTIONS = [
  { value: "9th", label: "9th" },
  { value: "10th", label: "10th" },
  { value: "11th", label: "11th" },
  { value: "12th", label: "12th" },
];

const GRADE_OPTIONS = [
  { value: "", label: "—" },
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B", label: "B" },
  { value: "B-", label: "B-" },
  { value: "C+", label: "C+" },
  { value: "C", label: "C" },
  { value: "C-", label: "C-" },
  { value: "D+", label: "D+" },
  { value: "D", label: "D" },
  { value: "D-", label: "D-" },
  { value: "F", label: "F" },
  { value: "P", label: "Pass" },
];

export function CourseReviewTable({ 
  courses: initialCourses, 
  studentName,
  schoolName,
  gpaUnweighted,
  gpaWeighted,
  onImport, 
  onCancel 
}: CourseReviewTableProps) {
  const [courses, setCourses] = useState(initialCourses.map((c, i) => ({
    ...c,
    id: i,
    selected: !c.isDuplicate, // Auto-deselect exact duplicates
  })));
  const [isImporting, setIsImporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const selectedCount = courses.filter(c => c.selected).length;
  const duplicateCount = courses.filter(c => c.isDuplicate).length;
  const potentialDuplicateCount = courses.filter(c => c.isPotentialDuplicate).length;

  const toggleCourse = (id: number) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };

  const toggleAll = (selected: boolean) => {
    setCourses(courses.map(c => ({
      ...c,
      selected: c.isDuplicate ? false : selected,
    })));
  };

  const updateCourse = (id: number, field: string, value: string | number) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const selectedCourses = courses
        .filter(c => c.selected)
        .map(({ id, selected, ...course }) => course);
      await onImport(selectedCourses);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="bg-accent-surface/30 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-text-main">
              Extracted {courses.length} courses
            </h3>
            {(studentName || schoolName) && (
              <p className="text-sm text-text-muted">
                {studentName && <span>{studentName}</span>}
                {studentName && schoolName && <span> • </span>}
                {schoolName && <span>{schoolName}</span>}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            {gpaUnweighted && (
              <div className="text-center">
                <div className="font-mono font-bold text-accent-primary">{gpaUnweighted.toFixed(2)}</div>
                <div className="text-xs text-text-muted">Unweighted</div>
              </div>
            )}
            {gpaWeighted && (
              <div className="text-center">
                <div className="font-mono font-bold text-accent-primary">{gpaWeighted.toFixed(2)}</div>
                <div className="text-xs text-text-muted">Weighted</div>
              </div>
            )}
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-white rounded-lg text-xs font-medium text-text-main">
            {selectedCount} selected
          </span>
          {duplicateCount > 0 && (
            <span className="px-2 py-1 bg-red-50 rounded-lg text-xs font-medium text-red-600">
              {duplicateCount} duplicates (will skip)
            </span>
          )}
          {potentialDuplicateCount > 0 && (
            <span className="px-2 py-1 bg-yellow-50 rounded-lg text-xs font-medium text-yellow-700">
              {potentialDuplicateCount} possible duplicates
            </span>
          )}
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => toggleAll(true)}
          >
            Select All
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => toggleAll(false)}
          >
            Deselect All
          </Button>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          Edit columns
          <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
        </button>
      </div>

      {/* Course Table */}
      <div className="border border-border-subtle rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-bg-sidebar grid grid-cols-[40px_1fr_100px_80px_80px_60px] gap-2 p-3 text-xs font-medium text-text-muted uppercase tracking-wider">
          <div></div>
          <div>Course Name</div>
          <div>Subject</div>
          <div>Level</div>
          <div>Year</div>
          <div>Grade</div>
        </div>

        {/* Rows */}
        <div className="max-h-[400px] overflow-y-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className={cn(
                "grid grid-cols-[40px_1fr_100px_80px_80px_60px] gap-2 p-3 items-center border-t border-border-subtle transition-colors",
                course.isDuplicate && "bg-red-50/50 opacity-60",
                course.isPotentialDuplicate && "bg-yellow-50/50",
                course.selected && !course.isDuplicate && "bg-accent-surface/20"
              )}
            >
              {/* Checkbox */}
              <div className="flex justify-center">
                <button
                  onClick={() => toggleCourse(course.id)}
                  disabled={course.isDuplicate}
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                    course.isDuplicate 
                      ? "border-red-300 bg-red-100 cursor-not-allowed"
                      : course.selected
                        ? "border-accent-primary bg-accent-primary text-white"
                        : "border-border-medium hover:border-accent-primary"
                  )}
                >
                  {course.isDuplicate ? (
                    <X className="w-3 h-3 text-red-500" />
                  ) : course.selected ? (
                    <Check className="w-3 h-3" />
                  ) : null}
                </button>
              </div>

              {/* Course Name */}
              <div className="min-w-0">
                <div className="font-medium text-text-main truncate">{course.name}</div>
                {course.isDuplicate && (
                  <div className="text-xs text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    Already exists
                  </div>
                )}
                {course.isPotentialDuplicate && (
                  <div className="text-xs text-yellow-700 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Similar to: {course.existingName}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div>
                <select
                  value={course.subject}
                  onChange={(e) => updateCourse(course.id, "subject", e.target.value)}
                  disabled={course.isDuplicate}
                  className="w-full text-xs p-1.5 rounded border border-border-subtle bg-white focus:outline-none focus:border-accent-primary"
                >
                  {SUBJECT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <select
                  value={course.level}
                  onChange={(e) => updateCourse(course.id, "level", e.target.value)}
                  disabled={course.isDuplicate}
                  className={cn(
                    "w-full text-xs p-1.5 rounded border border-border-subtle bg-white focus:outline-none focus:border-accent-primary font-medium",
                    course.level === "ap" && "text-red-600",
                    course.level === "honors" && "text-blue-600",
                    course.level === "ib" && "text-purple-600",
                  )}
                >
                  {LEVEL_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Grade Level */}
              <div>
                <select
                  value={course.gradeLevel}
                  onChange={(e) => updateCourse(course.id, "gradeLevel", e.target.value)}
                  disabled={course.isDuplicate}
                  className="w-full text-xs p-1.5 rounded border border-border-subtle bg-white focus:outline-none focus:border-accent-primary"
                >
                  {GRADE_LEVEL_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Grade */}
              <div>
                <select
                  value={course.grade || ""}
                  onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                  disabled={course.isDuplicate}
                  className="w-full text-xs p-1.5 rounded border border-border-subtle bg-white focus:outline-none focus:border-accent-primary font-mono font-semibold"
                >
                  {GRADE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <p className="text-sm text-text-muted">
          {selectedCount} of {courses.length} courses will be imported
        </p>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={isImporting}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={selectedCount === 0 || isImporting}
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Import {selectedCount} Courses
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

