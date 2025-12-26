"use client";

import React, { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const LEVEL_OPTIONS = [
  { value: "", label: "Select level..." },
  { value: "school", label: "School" },
  { value: "regional", label: "Regional" },
  { value: "state", label: "State" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Select category..." },
  { value: "academic", label: "Academic" },
  { value: "arts", label: "Arts" },
  { value: "athletics", label: "Athletics" },
  { value: "community", label: "Community Service" },
  { value: "other", label: "Other" },
];

interface AwardFormProps {
  initialData?: {
    id?: string;
    title?: string;
    organization?: string | null;
    level?: string | null;
    category?: string | null;
    year?: number | null;
    gradeLevel?: string | null;
    description?: string | null;
  };
  onSubmit: (data: {
    title: string;
    organization?: string;
    level?: string;
    category?: string;
    year?: number;
    gradeLevel?: string;
    description?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export function AwardForm({ initialData, onSubmit, onCancel }: AwardFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [organization, setOrganization] = useState(initialData?.organization || "");
  const [level, setLevel] = useState(initialData?.level || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [year, setYear] = useState(initialData?.year?.toString() || new Date().getFullYear().toString());
  const [gradeLevel, setGradeLevel] = useState(initialData?.gradeLevel || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        organization: organization.trim() || undefined,
        level: level || undefined,
        category: category || undefined,
        year: year ? parseInt(year) : undefined,
        gradeLevel: gradeLevel || undefined,
        description: description.trim() || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "", label: "Select year..." },
    ...Array.from({ length: 6 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString(),
    })),
  ];

  const gradeOptions = [
    { value: "", label: "Select grade..." },
    { value: "9th", label: "9th Grade" },
    { value: "10th", label: "10th Grade" },
    { value: "11th", label: "11th Grade" },
    { value: "12th", label: "12th Grade" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Award Title"
        placeholder="e.g., AIME Qualifier, AP Scholar with Distinction"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        label="Awarding Organization"
        placeholder="e.g., MAA, College Board, National Honor Society"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Level"
          options={LEVEL_OPTIONS}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Year Received"
          options={yearOptions}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Select
          label="Grade Level"
          options={gradeOptions}
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
        />
      </div>

      <Textarea
        label="Description (optional)"
        placeholder="Brief description of the award and its significance..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me with my awards"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help?</span>
        </Link>
        
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !title.trim()}>
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Add Award"}
          </Button>
        </div>
      </div>
    </form>
  );
}

