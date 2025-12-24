"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface ACTScoreFormProps {
  initialData?: {
    id?: string;
    english?: number;
    math?: number;
    reading?: number;
    science?: number;
    writing?: number | null;
    testDate?: string | Date;
    isPrimary?: boolean;
  };
  onSubmit: (data: {
    english: number;
    math: number;
    reading: number;
    science: number;
    writing?: number;
    testDate: string;
    isPrimary?: boolean;
  }) => Promise<void>;
  onCancel: () => void;
}

export function ACTScoreForm({ initialData, onSubmit, onCancel }: ACTScoreFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [english, setEnglish] = useState(initialData?.english?.toString() || "");
  const [math, setMath] = useState(initialData?.math?.toString() || "");
  const [reading, setReading] = useState(initialData?.reading?.toString() || "");
  const [science, setScience] = useState(initialData?.science?.toString() || "");
  const [writing, setWriting] = useState(initialData?.writing?.toString() || "");
  const [testDate, setTestDate] = useState(
    initialData?.testDate 
      ? new Date(initialData.testDate).toISOString().split("T")[0] 
      : ""
  );
  const [isPrimary, setIsPrimary] = useState(initialData?.isPrimary || false);

  // Calculate composite
  const scores = [parseInt(english), parseInt(math), parseInt(reading), parseInt(science)].filter(s => !isNaN(s));
  const composite = scores.length === 4 ? Math.round(scores.reduce((a, b) => a + b, 0) / 4) : null;
  const isValidComposite = composite !== null && composite >= 1 && composite <= 36;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!english || !math || !reading || !science || !testDate) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        english: parseInt(english),
        math: parseInt(math),
        reading: parseInt(reading),
        science: parseInt(science),
        writing: writing ? parseInt(writing) : undefined,
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
          label="English"
          type="number"
          min="1"
          max="36"
          placeholder="1-36"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          required
        />
        <Input
          label="Math"
          type="number"
          min="1"
          max="36"
          placeholder="1-36"
          value={math}
          onChange={(e) => setMath(e.target.value)}
          required
        />
        <Input
          label="Reading"
          type="number"
          min="1"
          max="36"
          placeholder="1-36"
          value={reading}
          onChange={(e) => setReading(e.target.value)}
          required
        />
        <Input
          label="Science"
          type="number"
          min="1"
          max="36"
          placeholder="1-36"
          value={science}
          onChange={(e) => setScience(e.target.value)}
          required
        />
      </div>

      {/* Composite Score Display */}
      {composite !== null && (
        <div className={`rounded-xl p-4 text-center ${isValidComposite ? "bg-accent-surface/50" : "bg-yellow-50"}`}>
          <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Composite Score</div>
          <div className={`text-3xl font-mono font-bold ${isValidComposite ? "text-accent-primary" : "text-yellow-600"}`}>
            {composite}
          </div>
        </div>
      )}

      {/* Optional: Writing */}
      <Input
        label="Writing Score (optional)"
        type="number"
        min="2"
        max="12"
        placeholder="2-12 (if taken)"
        value={writing}
        onChange={(e) => setWriting(e.target.value)}
        hint="Writing section is optional"
      />

      {/* Primary Score Flag */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isPrimary}
          onChange={(e) => setIsPrimary(e.target.checked)}
          className="w-4 h-4 rounded border-border-medium text-accent-primary focus:ring-accent-primary"
        />
        <span className="text-sm text-text-main">Use as my primary ACT score</span>
      </label>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me understand my ACT scores"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need help?</span>
        </Link>
        
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !english || !math || !reading || !science || !testDate || !isValidComposite}
          >
            {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Add Score"}
          </Button>
        </div>
      </div>
    </form>
  );
}

