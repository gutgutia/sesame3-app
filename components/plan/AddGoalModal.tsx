"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, Target, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoalAdded: () => void;
}

type Category = "research" | "competition" | "leadership" | "project" | "academic" | "application" | "other";
type Status = "parking_lot" | "planning" | "in_progress";
type Priority = "high" | "medium" | "low";

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: "research", label: "Research", icon: "🔬" },
  { value: "competition", label: "Competition", icon: "🏆" },
  { value: "leadership", label: "Leadership", icon: "👥" },
  { value: "project", label: "Project", icon: "🚀" },
  { value: "academic", label: "Academic", icon: "📚" },
  { value: "application", label: "Application", icon: "📝" },
  { value: "other", label: "Other", icon: "🎯" },
];

export function AddGoalModal({ isOpen, onClose, onGoalAdded }: AddGoalModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("project");
  const [status, setStatus] = useState<Status>("planning");
  const [priority, setPriority] = useState<Priority>("medium");
  const [targetDate, setTargetDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setCategory("project");
      setStatus("planning");
      setPriority("medium");
      setTargetDate("");
    }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/profile/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          category,
          status,
          priority,
          targetDate: targetDate || null,
        }),
      });

      if (res.ok) {
        onGoalAdded();
        onClose();
      } else {
        console.error("Failed to add goal");
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-float overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-surface rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-text-main">Add Goal</h2>
              <p className="text-sm text-text-muted">What do you want to achieve?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -m-2 text-text-muted hover:text-text-main hover:bg-bg-sidebar rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Goal Title *</label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Get into a summer research program"
              className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main placeholder:text-text-light focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why is this goal important? What does success look like?"
              rows={2}
              className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main placeholder:text-text-light focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface resize-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl border transition-all text-center",
                    category === cat.value
                      ? "bg-accent-surface border-accent-primary text-accent-primary"
                      : "bg-bg-sidebar border-border-subtle text-text-muted hover:border-border-medium"
                  )}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface"
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="parking_lot">Parking Lot</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Priority</label>
              <div className="flex gap-2">
                {(["high", "medium", "low"] as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all border",
                      priority === p
                        ? p === "high"
                          ? "bg-red-50 border-red-200 text-red-700"
                          : p === "medium"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-green-50 border-green-200 text-green-700"
                        : "bg-bg-sidebar border-border-subtle text-text-muted hover:bg-bg-sidebar/80"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Target Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle space-y-3">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title.trim() || isSaving}
              className="flex-1"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Target className="w-4 h-4" />
              )}
              Add Goal
            </Button>
          </div>
          
          {/* Chat option */}
          <a
            href="/advisor?mode=planning"
            className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Not sure? Brainstorm goals with your advisor
          </a>
        </div>
      </div>
    </div>
  );
}

