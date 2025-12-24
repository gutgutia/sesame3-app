"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface TestingFormProps {
  initialData?: {
    satTotal?: number | null;
    satMath?: number | null;
    satReading?: number | null;
    actComposite?: number | null;
    actEnglish?: number | null;
    actMath?: number | null;
    actReading?: number | null;
    actScience?: number | null;
  };
  onSubmit: (data: {
    satTotal?: number;
    satMath?: number;
    satReading?: number;
    actComposite?: number;
    actEnglish?: number;
    actMath?: number;
    actReading?: number;
    actScience?: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export function TestingForm({ initialData, onSubmit, onCancel }: TestingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"sat" | "act">("sat");
  
  // SAT fields
  const [satMath, setSatMath] = useState(initialData?.satMath?.toString() || "");
  const [satReading, setSatReading] = useState(initialData?.satReading?.toString() || "");
  
  // ACT fields
  const [actEnglish, setActEnglish] = useState(initialData?.actEnglish?.toString() || "");
  const [actMath, setActMath] = useState(initialData?.actMath?.toString() || "");
  const [actReading, setActReading] = useState(initialData?.actReading?.toString() || "");
  const [actScience, setActScience] = useState(initialData?.actScience?.toString() || "");

  // Calculate totals
  const satTotal = satMath && satReading ? parseInt(satMath) + parseInt(satReading) : null;
  const actComposite = actEnglish && actMath && actReading && actScience
    ? Math.round((parseInt(actEnglish) + parseInt(actMath) + parseInt(actReading) + parseInt(actScience)) / 4)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        satTotal: satTotal || undefined,
        satMath: satMath ? parseInt(satMath) : undefined,
        satReading: satReading ? parseInt(satReading) : undefined,
        actComposite: actComposite || undefined,
        actEnglish: actEnglish ? parseInt(actEnglish) : undefined,
        actMath: actMath ? parseInt(actMath) : undefined,
        actReading: actReading ? parseInt(actReading) : undefined,
        actScience: actScience ? parseInt(actScience) : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-bg-sidebar rounded-lg">
        <button
          type="button"
          onClick={() => setActiveTab("sat")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "sat" 
              ? "bg-white text-text-main shadow-sm" 
              : "text-text-muted hover:text-text-main"
          }`}
        >
          SAT
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("act")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "act" 
              ? "bg-white text-text-main shadow-sm" 
              : "text-text-muted hover:text-text-main"
          }`}
        >
          ACT
        </button>
      </div>

      {/* SAT Form */}
      {activeTab === "sat" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Math"
              type="number"
              min="200"
              max="800"
              step="10"
              placeholder="200-800"
              value={satMath}
              onChange={(e) => setSatMath(e.target.value)}
            />
            <Input
              label="Reading & Writing"
              type="number"
              min="200"
              max="800"
              step="10"
              placeholder="200-800"
              value={satReading}
              onChange={(e) => setSatReading(e.target.value)}
            />
          </div>
          
          {satTotal && (
            <div className="bg-accent-surface/50 rounded-xl p-4 text-center">
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Total Score</div>
              <div className="text-3xl font-mono font-bold text-accent-primary">{satTotal}</div>
            </div>
          )}
        </div>
      )}

      {/* ACT Form */}
      {activeTab === "act" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="English"
              type="number"
              min="1"
              max="36"
              placeholder="1-36"
              value={actEnglish}
              onChange={(e) => setActEnglish(e.target.value)}
            />
            <Input
              label="Math"
              type="number"
              min="1"
              max="36"
              placeholder="1-36"
              value={actMath}
              onChange={(e) => setActMath(e.target.value)}
            />
            <Input
              label="Reading"
              type="number"
              min="1"
              max="36"
              placeholder="1-36"
              value={actReading}
              onChange={(e) => setActReading(e.target.value)}
            />
            <Input
              label="Science"
              type="number"
              min="1"
              max="36"
              placeholder="1-36"
              value={actScience}
              onChange={(e) => setActScience(e.target.value)}
            />
          </div>
          
          {actComposite && (
            <div className="bg-accent-surface/50 rounded-xl p-4 text-center">
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Composite Score</div>
              <div className="text-3xl font-mono font-bold text-accent-primary">{actComposite}</div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Link 
          href="/advisor?mode=profile&q=help me with my test scores"
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

