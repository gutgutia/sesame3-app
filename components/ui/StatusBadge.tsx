import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "strong" | "building" | "gap" | "info" | "reach" | "target" | "safety";

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<StatusType, string> = {
  strong: "bg-success-bg text-success-text",
  building: "bg-warning-bg text-warning-text",
  gap: "bg-reach-bg text-reach-text",
  info: "bg-info-bg text-info-text",
  reach: "bg-reach-bg text-reach-text",
  target: "bg-target-bg text-target-text",
  safety: "bg-safety-bg text-safety-text",
};

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
        styles[status],
        className
      )}
    >
      {children}
    </span>
  );
}
