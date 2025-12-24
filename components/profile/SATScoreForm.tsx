"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface SATScoreFormProps {
  initialData?: {
    id?: string;
    math?: number;
    reading?: number;
    essay?: number | null;
    testDate?: string | Date;
    isPrimary?: boolean;
  };
  onSubmit: (data: {
    math: number;
    reading: number;
    essay?: number;
    testDate: string;
    isPrimary?: boolean;
  }) => Promise<void>;
  onCancel: () => void;
}

export function SATScoreForm({ initialData, onSubmit, onCancel }: SATScoreFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [math, setMath] = useState(initialData?.math?.toString() || "");
  const [reading, setReading] = useState(initialData?.reading?.toString() || "");
  const [essay, setEssay] = useState(initialData?.essay?.toString() || "");
  const [testDate, setTestDate] = useState(
    initialData?.testDate 
      ? new Date(initialData.testDate).toISOString().split("T")[0] 
      : ""
  );
  const [isPrimary, setIsPrimary] = useState(initialData?.isPrimary || false);

  // Calculate total
  const total = (parseInt(math) || 0) + (parseInt(reading) || 0);
  const isValidTotal = total >= 400 && total <= 1600;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!math || !reading || !testDate) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        math: parseInt(math),
        reading: parseInt(reading),
        essay: essay ? parseInt(essay) : undefined,
        testDate,
        isPrimary,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Date */}
      <Input
        label="Test Date"
        type="date"
        value={testDate}
        onChange={(e) => setTestDate(e.target.value)}
        required
      />

      {/* Section Scores */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Math"
          type="number"
          min="200"
          max="800"
          step="10"
          placeholder="200-800"
          value={math}
          onChange={(e) => setMath(e.target.value)}
          required
        />
        <Input
          label="Evidence-Based Reading & Writing"
          type="number"
          min="200"
          max="800"
          step="10"
          placeholder="200-800"
          value={reading}
          onChange={(e) => setReading(e.target.value)}
          required
        />
      </div>

      {/* Total Score Display */}
      {(math || reading) && (
        <div className={`rounded-xl p-4 text-center ${isValidTotal ? "bg-accent-surface/50" : "bg-yellow-50"}`}>
          <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Total Score</div>
          <div className={`text-3xl font-mono font-bold ${isValidTotal ? "text-accent-primary" : "text-yellow-600"}`}>
            {total}
          </div>
          {!isValidTotal && total > 0 && (
            <div className="text-xs text-yellow-600 mt-1">SAT total should be 400-1600</div>
          )}
        </div>
      )}

      {/* Optional: Essay */}
      <Input
        label="Essay Score (optional)"
        type="number"
        min="2"
        max="8"
        placeholder="2-8 (if taken)"
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        hint="Only for tests taken before 2021"
      />

      {/* Primary Score Flag */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isPrimary}
          onChange={(e) => setIsPrimary(e.target.checked)}
          className="w-4 h-4 rounded border-border-medium text-accent-primary focus:ring-accent-primary"
        />
        <span className="text-sm text-text-main">Use as my primary SAT score</span>
      </label>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me understand my SAT scores"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help?</span>
        </Link>
        
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !math || !reading || !testDate || !isValidTotal}>
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Add Score"}
          </Button>
        </div>
      </div>
    </form>
  );
}

