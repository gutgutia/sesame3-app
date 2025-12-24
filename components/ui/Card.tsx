import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-card transition-all",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
