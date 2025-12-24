"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface AcademicsFormProps {
  initialData?: {
    gpaUnweighted?: number | null;
    gpaWeighted?: number | null;
    gpaScale?: number | null;
    classRank?: number | null;
    classSize?: number | null;
  };
  onSubmit: (data: {
    gpaUnweighted?: number;
    gpaWeighted?: number;
    gpaScale?: number;
    classRank?: number;
    classSize?: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export function AcademicsForm({ initialData, onSubmit, onCancel }: AcademicsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gpaUnweighted, setGpaUnweighted] = useState(initialData?.gpaUnweighted?.toString() || "");
  const [gpaWeighted, setGpaWeighted] = useState(initialData?.gpaWeighted?.toString() || "");
  const [gpaScale, setGpaScale] = useState(initialData?.gpaScale?.toString() || "4.0");
  const [classRank, setClassRank] = useState(initialData?.classRank?.toString() || "");
  const [classSize, setClassSize] = useState(initialData?.classSize?.toString() || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        gpaUnweighted: gpaUnweighted ? parseFloat(gpaUnweighted) : undefined,
        gpaWeighted: gpaWeighted ? parseFloat(gpaWeighted) : undefined,
        gpaScale: gpaScale ? parseFloat(gpaScale) : undefined,
        classRank: classRank ? parseInt(classRank) : undefined,
        classSize: classSize ? parseInt(classSize) : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="GPA (Unweighted)"
          type="number"
          step="0.01"
          min="0"
          max="4.0"
          placeholder="e.g., 3.85"
          value={gpaUnweighted}
          onChange={(e) => setGpaUnweighted(e.target.value)}
        />
        <Input
          label="GPA (Weighted)"
          type="number"
          step="0.01"
          min="0"
          max="5.0"
          placeholder="e.g., 4.2"
          value={gpaWeighted}
          onChange={(e) => setGpaWeighted(e.target.value)}
        />
      </div>

      <Input
        label="GPA Scale"
        type="number"
        step="0.1"
        min="4.0"
        max="5.0"
        placeholder="4.0"
        value={gpaScale}
        onChange={(e) => setGpaScale(e.target.value)}
        hint="Usually 4.0 or 5.0"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Class Rank"
          type="number"
          min="1"
          placeholder="e.g., 15"
          value={classRank}
          onChange={(e) => setClassRank(e.target.value)}
        />
        <Input
          label="Class Size"
          type="number"
          min="1"
          placeholder="e.g., 450"
          value={classSize}
          onChange={(e) => setClassSize(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me with my academics"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help?</span>
        </Link>
        
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}

