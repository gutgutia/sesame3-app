"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, CheckSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
  goalId: string;
  goalTitle: string;
  parentTaskId?: string;  // If adding a subtask
  parentTaskTitle?: string;
}

type Priority = "high" | "medium" | "low";
type Status = "pending" | "in_progress" | "blocked";

export function AddTaskModal({ 
  isOpen, 
  onClose, 
  onTaskAdded, 
  goalId,
  goalTitle,
  parentTaskId,
  parentTaskTitle,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [status, setStatus] = useState<Status>("pending");
  const [dueDate, setDueDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const isSubtask = !!parentTaskId;

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setPriority(null);
      setStatus("pending");
      setDueDate("");
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
      const res = await fetch(`/api/profile/goals/${goalId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          priority,
          status,
          dueDate: dueDate || null,
          parentTaskId: parentTaskId || null,
        }),
      });

      if (res.ok) {
        onTaskAdded();
        onClose();
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-float overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-surface rounded-xl flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-text-main">
                {isSubtask ? "Add Subtask" : "Add Task"}
              </h2>
              <p className="text-sm text-text-muted truncate max-w-[250px]">
                {isSubtask ? `Under: ${parentTaskTitle}` : `For: ${goalTitle}`}
              </p>
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
        <div className="p-5 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">
              {isSubtask ? "Subtask" : "Task"} Title *
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isSubtask ? "e.g., Write personal statement" : "e.g., Apply to Stanford SIMR"}
              className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main placeholder:text-text-light focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Notes (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any details or reminders..."
              rows={2}
              className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main placeholder:text-text-light focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface resize-none"
            />
          </div>

          {/* Due Date & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-bg-sidebar border border-border-medium rounded-xl text-[15px] text-text-main focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-surface"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Priority</label>
              <div className="flex gap-2">
                {(["high", "medium", "low"] as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(priority === p ? null : p)}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-xs font-medium capitalize transition-all border",
                      priority === p
                        ? p === "high"
                          ? "bg-red-50 border-red-200 text-red-700"
                          : p === "medium"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-green-50 border-green-200 text-green-700"
                        : "bg-bg-sidebar border-border-subtle text-text-muted hover:bg-bg-sidebar/80"
                    )}
                  >
                    {p[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Status</label>
            <div className="flex gap-2">
              {([
                { value: "pending", label: "To Do" },
                { value: "in_progress", label: "In Progress" },
                { value: "blocked", label: "Blocked" },
              ] as { value: Status; label: string }[]).map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatus(s.value)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border",
                    status === s.value
                      ? "bg-accent-surface border-accent-primary text-accent-primary"
                      : "bg-bg-sidebar border-border-subtle text-text-muted hover:bg-bg-sidebar/80"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle">
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
                <Plus className="w-4 h-4" />
              )}
              {isSubtask ? "Add Subtask" : "Add Task"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

