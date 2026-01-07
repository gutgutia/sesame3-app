"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  ChevronLeft,
  Plus,
  Trash2,
  Pencil,
  ChevronDown,
  ChevronUp,
  Star,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/context/ProfileContext";
import { ActivityForm } from "@/components/profile";

export default function ActivitiesPage() {
  const { profile, isLoading, error, refreshProfile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Record<string, unknown> | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activities = profile?.activities || [];
  const spikeActivities = activities.filter(a => a.isSpike);
  const leadershipCount = activities.filter(a => a.isLeadership).length;

  const handleSaveActivity = async (data: Record<string, unknown>) => {
    const isEdit = !!editingActivity?.id;
    const response = await fetch(
      isEdit ? `/api/profile/activities/${editingActivity.id}` : "/api/profile/activities",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      await refreshProfile();
      setIsModalOpen(false);
      setEditingActivity(null);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    await fetch(`/api/profile/activities/${id}`, { method: "DELETE" });
    refreshProfile();
  };

  const openAddModal = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const openEditModal = (activity: Record<string, unknown>) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-text-muted mb-4">Failed to load profile</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/profile" 
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-surface rounded-xl flex items-center justify-center text-accent-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-text-main">Activities</h1>
              <p className="text-text-muted">Extracurriculars and involvement</p>
            </div>
          </div>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4" />
            Add Activity
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      {activities.length > 0 && (
        <div className="bg-white border border-border-subtle rounded-[16px] p-5 mb-6 shadow-card">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Total Activities</div>
              <div className="text-2xl font-bold text-text-main">{activities.length}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Leadership Roles</div>
              <div className="text-2xl font-bold text-text-main">{leadershipCount}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Spike Activities</div>
              <div className="text-2xl font-bold text-accent-primary">{spikeActivities.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="bg-white border border-border-subtle rounded-[20px] p-12 text-center shadow-card">
          <Users className="w-12 h-12 text-text-light mx-auto mb-4" />
          <h3 className="font-display font-bold text-lg text-text-main mb-2">No activities yet</h3>
          <p className="text-text-muted mb-6">Add your extracurriculars, clubs, sports, and other involvements</p>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4" />
            Add Your First Activity
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className={cn(
                "bg-white border rounded-[16px] p-5 shadow-card transition-all group",
                activity.isSpike 
                  ? "border-accent-primary/30 bg-accent-surface/10" 
                  : "border-border-subtle"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-display font-bold text-lg text-text-main">{activity.title}</span>
                    {activity.isSpike && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-accent-primary bg-accent-surface px-2 py-0.5 rounded">
                        <Star className="w-3 h-3" />
                        Spike
                      </span>
                    )}
                    {activity.isLeadership && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        <Crown className="w-3 h-3" />
                        Leadership
                      </span>
                    )}
                  </div>
                  
                  {activity.organization && (
                    <div className="text-text-main mb-1">{activity.organization}</div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 text-sm text-text-muted">
                    {activity.yearsActive && <span>{activity.yearsActive}</span>}
                    {activity.hoursPerWeek && (
                      <span>{activity.hoursPerWeek} hr/week</span>
                    )}
                    {activity.weeksPerYear && (
                      <span>{activity.weeksPerYear} weeks/year</span>
                    )}
                    {activity.category && (
                      <span className="capitalize px-2 py-0.5 bg-bg-sidebar rounded">
                        {activity.category}
                      </span>
                    )}
                  </div>

                  {activity.description && (
                    <div className={cn(
                      "mt-3 text-sm text-text-main",
                      expandedId !== activity.id && "line-clamp-2"
                    )}>
                      {activity.description}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {activity.description && (
                    <button 
                      onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                      className="p-2 text-text-muted hover:text-text-main hover:bg-bg-sidebar rounded-lg transition-colors"
                    >
                      {expandedId === activity.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  <button 
                    onClick={() => openEditModal(activity)}
                    className="p-2 text-text-muted hover:text-accent-primary hover:bg-accent-surface rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingActivity(null); }}
        title={editingActivity ? "Edit Activity" : "Add Activity"}
        description="Describe your extracurricular involvement"
        size="lg"
      >
        <ActivityForm
          initialData={editingActivity || undefined}
          onSubmit={handleSaveActivity}
          onCancel={() => { setIsModalOpen(false); setEditingActivity(null); }}
        />
      </Modal>
    </>
  );
}

