import React from "react";
import { Target, ArrowRight, Clock, Check, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FocusWidget() {
  return (
    <div className="bg-white border border-border-subtle rounded-[20px] p-1.5 shadow-float mb-12 relative overflow-hidden">
      <div className="bg-[#FAFAF9] rounded-xl flex flex-col md:flex-row relative">
        {/* Decorative Blob */}
        <div className="absolute -top-1/2 -left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-surface)_0%,rgba(255,255,255,0)_70%)] opacity-80 pointer-events-none" />

        {/* Main Content */}
        <div className="p-8 flex-[2] relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border-medium rounded-full text-xs font-bold text-text-muted uppercase tracking-wide mb-4">
            <Target className="w-3.5 h-3.5" />
            Current Focus
          </div>
          
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 text-text-main leading-tight">
            Submit Stanford SIMR Application
          </h2>
          
          <p className="text-text-muted mb-6 max-w-lg leading-relaxed">
            This is your highest impact task right now (Programs Pillar). The deadline is in 3 days.
          </p>

          <div className="flex gap-3 mb-8">
            <Button>
              Continue Draft
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary">
              <Clock className="w-4 h-4 text-text-muted" />
              Defer
            </Button>
          </div>

          <div>
            <h4 className="text-xs font-bold text-text-light uppercase tracking-wider mb-3">Next Steps</h4>
            <div className="space-y-2">
              <StepItem checked text="Draft Short Essay 1" />
              <StepItem text="Draft Short Essay 2 (Research Interest)" />
              <StepItem text="Upload Transcript" />
            </div>
          </div>
        </div>

        {/* Sidebar Resources */}
        <div className="w-full md:w-[300px] border-t md:border-t-0 md:border-l border-border-medium p-6 bg-white/50 relative z-10">
          <h4 className="text-xs font-bold text-text-light uppercase tracking-wider mb-3">Helpful Resources</h4>
          <div className="space-y-2.5">
            <ResourceCard 
              icon={FileText} 
              title="Successful Essays" 
              desc="See 3 examples from last year" 
            />
            <ResourceCard 
              icon={Video} 
              title="Writing Guide" 
              desc="How to discuss 'Research Interests'" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepItem({ checked, text }: { checked?: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3 p-2.5 bg-white border border-border-subtle rounded-lg">
      <div className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center ${checked ? 'bg-accent-primary border-accent-primary text-white' : 'border-border-medium'}`}>
        {checked && <Check className="w-3 h-3 stroke-[3px]" />}
      </div>
      <span className={`text-sm ${checked ? 'text-text-muted line-through opacity-60' : 'text-text-main font-medium'}`}>
        {text}
      </span>
    </div>
  );
}

function ResourceCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-2.5 items-start p-3 bg-white border border-border-subtle rounded-lg hover:border-accent-primary transition-colors cursor-pointer group">
      <div className="w-8 h-8 rounded-md bg-info-bg text-info-text flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h5 className="text-[13px] font-semibold text-text-main leading-tight mb-0.5">{title}</h5>
        <p className="text-[11px] text-text-muted leading-snug">{desc}</p>
      </div>
    </div>
  );
}
