import React from "react";
import { Search } from "lucide-react";
import { ZenInput } from "@/components/dashboard/ZenInput";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-bg-sidebar rounded-2xl flex items-center justify-center text-text-muted mb-6">
        <Search className="w-8 h-8" />
      </div>
      <h1 className="font-display font-bold text-3xl text-text-main mb-3">Discover Opportunities</h1>
      <p className="text-text-muted mb-8">
        Find summer programs, scholarships, and competitions that match your profile spikes.
      </p>
      
      <div className="w-full">
        <ZenInput />
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full mt-8 opacity-50">
        <div className="h-32 bg-white border border-border-subtle rounded-xl" />
        <div className="h-32 bg-white border border-border-subtle rounded-xl" />
        <div className="h-32 bg-white border border-border-subtle rounded-xl" />
        <div className="h-32 bg-white border border-border-subtle rounded-xl" />
      </div>
    </div>
  );
}
