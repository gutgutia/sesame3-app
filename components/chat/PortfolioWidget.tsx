import React, { useState } from "react";
import { Check, Calendar as CalendarIcon, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PortfolioWidgetProps {
  data: {
    category: string;
    label: string;
    value: string;
    date: string;
  };
  status: "draft" | "saved";
  onConfirm: (data: any) => void;
}

export function PortfolioWidget({ data, status, onConfirm }: PortfolioWidgetProps) {
  const [date, setDate] = useState(data.date || "");
  const [value, setValue] = useState(data.value);

  if (status === "saved") {
    return (
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 mt-2 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 text-[#15803D] font-semibold text-sm mb-2">
          <Check className="w-4 h-4" />
          Update Saved
        </div>
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-2 px-3">
          <span className="text-text-muted text-xs uppercase font-bold tracking-wider">{data.label}</span>
          <span className="font-mono font-bold text-text-main">{data.value}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF9] border border-border-subtle rounded-xl p-4 mt-2">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirm Update</span>
        <span className="text-xs bg-bg-sidebar px-2 py-1 rounded text-text-muted">{data.category}</span>
      </div>

      <div className="space-y-3 mb-4">
        {/* Value Input */}
        <div>
          <label className="block text-xs text-text-muted mb-1">Score / Value</label>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white border border-border-medium rounded-lg px-3 py-2 text-sm font-mono font-semibold text-text-main focus:border-accent-primary outline-none"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-xs text-text-muted mb-1">Date Taken</label>
          <div className="relative">
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white border border-border-medium rounded-lg pl-9 pr-3 py-2 text-sm text-text-main focus:border-accent-primary outline-none"
            />
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onConfirm({ ...data, value, date })}
          className="flex-1 bg-text-main text-white py-2 rounded-lg text-sm font-semibold hover:bg-black/80 transition-colors"
        >
          Confirm & Save
        </button>
        <button className="px-3 py-2 border border-border-medium rounded-lg text-sm font-medium hover:bg-white text-text-muted hover:text-text-main transition-colors">
          Discard
        </button>
      </div>
    </div>
  );
}
