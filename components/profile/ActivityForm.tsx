"use client";

import React, { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const CATEGORY_OPTIONS = [
  { value: "", label: "Select category..." },
  { value: "club", label: "Club" },
  { value: "sport", label: "Sport" },
  { value: "arts", label: "Arts" },
  { value: "volunteer", label: "Volunteer/Community Service" },
  { value: "work", label: "Work Experience" },
  { value: "family", label: "Family Responsibilities" },
  { value: "other", label: "Other" },
];

interface ActivityFormProps {
  initialData?: {
    id?: string;
    title?: string;
    organization?: string | null;
    category?: string | null;
    yearsActive?: string | null;
    hoursPerWeek?: number | null;
    weeksPerYear?: number | null;
    description?: string | null;
    isLeadership?: boolean;
    isSpike?: boolean;
  };
  onSubmit: (data: {
    title: string;
    organization?: string;
    category?: string;
    yearsActive?: string;
    hoursPerWeek?: number;
    weeksPerYear?: number;
    description?: string;
    isLeadership?: boolean;
    isSpike?: boolean;
  }) => Promise<void>;
  onCancel: () => void;
}

export function ActivityForm({ initialData, onSubmit, onCancel }: ActivityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [organization, setOrganization] = useState(initialData?.organization || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [yearsActive, setYearsActive] = useState(initialData?.yearsActive || "");
  const [hoursPerWeek, setHoursPerWeek] = useState(initialData?.hoursPerWeek?.toString() || "");
  const [weeksPerYear, setWeeksPerYear] = useState(initialData?.weeksPerYear?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isLeadership, setIsLeadership] = useState(initialData?.isLeadership || false);
  const [isSpike, setIsSpike] = useState(initialData?.isSpike || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        organization: organization.trim() || undefined,
        category: category || undefined,
        yearsActive: yearsActive.trim() || undefined,
        hoursPerWeek: hoursPerWeek ? parseFloat(hoursPerWeek) : undefined,
        weeksPerYear: weeksPerYear ? parseInt(weeksPerYear) : undefined,
        description: description.trim() || undefined,
        isLeadership,
        isSpike,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Role / Position"
        placeholder="e.g., President, Captain, Volunteer"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        label="Organization / Club"
        placeholder="e.g., Robotics Club, Local Hospital"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          label="Years Active"
          placeholder="e.g., 9th-12th or 2021-2024"
          value={yearsActive}
          onChange={(e) => setYearsActive(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Hours per Week"
          type="number"
          min="0"
          max="168"
          step="0.5"
          placeholder="e.g., 10"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
        />
        <Input
          label="Weeks per Year"
          type="number"
          min="1"
          max="52"
          placeholder="e.g., 40"
          value={weeksPerYear}
          onChange={(e) => setWeeksPerYear(e.target.value)}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="What do you do? What have you accomplished? What's the impact?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        hint="Describe your role, responsibilities, and achievements"
      />

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isLeadership}
            onChange={(e) => setIsLeadership(e.target.checked)}
            className="w-4 h-4 rounded border-border-medium text-accent-primary focus:ring-accent-primary"
          />
          <span className="text-sm text-text-main">Leadership role</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSpike}
            onChange={(e) => setIsSpike(e.target.checked)}
            className="w-4 h-4 rounded border-border-medium text-accent-primary focus:ring-accent-primary"
          />
          <span className="text-sm text-text-main">This is my "spike" activity</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me describe my activities"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help writing this?</span>
        </Link>
        
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !title.trim()}>
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Add Activity"}
          </Button>
        </div>
      </div>
    </form>
  );
}

