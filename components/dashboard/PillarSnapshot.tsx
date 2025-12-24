import React from "react";
import { GraduationCap, PenTool, Trophy, Users, FlaskConical, FileText } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

export function PillarSnapshot() {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-lg">Profile Snapshot</h3>
        <Link href="/profile" className="text-[13px] font-medium text-accent-primary hover:underline">
          View Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        <PillarItem icon={GraduationCap} name="Academics" status="strong" label="Strong" />
        <PillarItem icon={Users} name="Activities" status="building" label="Building" />
        <PillarItem icon={PenTool} name="Testing" status="strong" label="Strong" />
        <PillarItem icon={FlaskConical} name="Programs" status="building" label="Focus" />
        <PillarItem icon={Trophy} name="Awards" status="gap" label="Gap" />
        <PillarItem icon={FileText} name="Essays" status="info" label="Not Started" />
      </div>
    </div>
  );
}

function PillarItem({ icon: Icon, name, status, label }: { icon: any, name: string, status: any, label: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-[13px] font-medium text-text-main">
        <Icon className="w-3.5 h-3.5 text-text-muted" />
        {name}
      </div>
      <StatusBadge status={status}>{label}</StatusBadge>
    </div>
  );
}
