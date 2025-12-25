"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/**
 * Profile data structure (matches API response)
 */
export interface ProfileData {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  preferredName?: string | null;
  grade?: string | null;
  graduationYear?: number | null;
  highSchoolName?: string | null;
  highSchoolCity?: string | null;
  highSchoolState?: string | null;
  highSchoolType?: string | null;
  aboutMe?: {
    story?: string | null;
    values?: string[];
    interests?: string[];
    personality?: string | null;
    background?: string | null;
    aspirations?: string | null;
  } | null;
  academics?: {
    gpaUnweighted?: number | null;
    gpaWeighted?: number | null;
    gpaScale?: number | null;
    classRank?: number | null;
    classSize?: number | null;
    apCourseCount?: number | null;
    honorsCourseCount?: number | null;
  } | null;
  testing?: {
    psatTotal?: number | null;
    psatMath?: number | null;
    psatReading?: number | null;
    psatDate?: string | null;
    nmsqtQualified?: boolean | null;
    satScores?: Array<{
      id: string;
      total: number;
      math: number;
      reading: number;
      essay?: number | null;
      testDate: string;
      isPrimary?: boolean;
      isSuperscored?: boolean;
    }>;
    actScores?: Array<{
      id: string;
      composite: number;
      english: number;
      math: number;
      reading: number;
      science: number;
      writing?: number | null;
      testDate: string;
      isPrimary?: boolean;
      isSuperscored?: boolean;
    }>;
    apScores?: Array<{ id: string; subject: string; score: number; year: number }>;
    subjectTests?: Array<{ id: string; subject: string; score: number; testDate?: string | null }>;
  } | null;
  activities?: Array<{
    id: string;
    title: string;
    organization?: string | null;
    category?: string | null;
    description?: string | null;
    isLeadership?: boolean;
    isSpike?: boolean;
    hoursPerWeek?: number | null;
    weeksPerYear?: number | null;
  }>;
  awards?: Array<{
    id: string;
    title: string;
    organization?: string | null;
    level?: string | null;
    year?: number | null;
  }>;
  courses?: Array<{
    id: string;
    name: string;
    subject?: string | null;
    level?: string | null;
    status?: string | null;
    grade?: string | null;
  }>;
  programs?: Array<{
    id: string;
    name: string;
    organization?: string | null;
    type?: string | null;
    status?: string | null;
  }>;
  goals?: Array<{
    id: string;
    title: string;
    description?: string | null;
    category?: string | null;
    status?: string | null;
    priority?: string | null;
    targetDate?: string | null;
    tasks?: Array<{
      id: string;
      title: string;
      status?: string | null;
      completed: boolean;
      dueDate?: string | null;
      priority?: string | null;
      subtasks?: Array<{
        id: string;
        title: string;
        status?: string | null;
        completed: boolean;
        dueDate?: string | null;
        priority?: string | null;
      }>;
    }>;
  }>;
  schoolList?: Array<{
    id: string;
    tier?: string | null;
    isDream?: boolean;
    status?: string | null;
    interestLevel?: string | null;
    school?: {
      id: string;
      name: string;
      shortName?: string | null;
      city?: string | null;
      state?: string | null;
      acceptanceRate?: number | null;
      satRange25?: number | null;
      satRange75?: number | null;
      websiteUrl?: string | null;
    } | null;
  }>;
}

interface ProfileContextType {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: (showLoading?: boolean) => Promise<void>;
  updateProfile: (updates: Partial<ProfileData>) => void;
  // Optimistic update helpers
  toggleTask: (goalId: string, taskId: string, completed: boolean) => void;
  addTask: (goalId: string, task: NonNullable<ProfileData["goals"]>[number]["tasks"][number]) => void;
  addSubtask: (goalId: string, parentTaskId: string, subtask: NonNullable<NonNullable<ProfileData["goals"]>[number]["tasks"][number]["subtasks"]>[number]) => void;
  addGoal: (goal: NonNullable<ProfileData["goals"]>[number]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * ProfileProvider - Loads and caches profile data for the entire app
 * 
 * Benefits:
 * - Single fetch on app load instead of per-page
 * - Instant page navigation (no loading states)
 * - Consistent data across all components
 */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch full profile from API
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const startTime = Date.now();
      const response = await fetch("/api/profile");
      
      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated - that's okay, just no profile
          setProfile(null);
          return;
        }
        throw new Error("Failed to fetch profile");
      }
      
      const data = await response.json();
      setProfile(data);
      
      console.log(`[ProfileContext] Loaded in ${Date.now() - startTime}ms`);
    } catch (err) {
      console.error("[ProfileContext] Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Refresh profile (call after updates) - background refresh without loading state
  const refreshProfile = useCallback(async (showLoading = false) => {
    if (showLoading) {
      await fetchProfile();
    } else {
      // Background refresh - don't show loading state
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("[ProfileContext] Background refresh error:", err);
      }
    }
  }, [fetchProfile]);

  // Optimistic update (update local state immediately)
  const updateProfile = useCallback((updates: Partial<ProfileData>) => {
    setProfile(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  // Optimistic task toggle
  const toggleTask = useCallback((goalId: string, taskId: string, completed: boolean) => {
    setProfile(prev => {
      if (!prev?.goals) return prev;
      return {
        ...prev,
        goals: prev.goals.map(goal => {
          if (goal.id !== goalId) return goal;
          return {
            ...goal,
            tasks: goal.tasks?.map(task => {
              if (task.id === taskId) {
                return { ...task, completed, status: completed ? "completed" : "pending" };
              }
              // Check subtasks
              return {
                ...task,
                subtasks: task.subtasks?.map(st => 
                  st.id === taskId ? { ...st, completed, status: completed ? "completed" : "pending" } : st
                ),
              };
            }),
          };
        }),
      };
    });
  }, []);

  // Optimistic add task
  const addTask = useCallback((goalId: string, task: NonNullable<ProfileData["goals"]>[number]["tasks"][number]) => {
    setProfile(prev => {
      if (!prev?.goals) return prev;
      return {
        ...prev,
        goals: prev.goals.map(goal => {
          if (goal.id !== goalId) return goal;
          return {
            ...goal,
            tasks: [...(goal.tasks || []), task],
          };
        }),
      };
    });
  }, []);

  // Optimistic add subtask
  const addSubtask = useCallback((goalId: string, parentTaskId: string, subtask: NonNullable<NonNullable<ProfileData["goals"]>[number]["tasks"][number]["subtasks"]>[number]) => {
    setProfile(prev => {
      if (!prev?.goals) return prev;
      return {
        ...prev,
        goals: prev.goals.map(goal => {
          if (goal.id !== goalId) return goal;
          return {
            ...goal,
            tasks: goal.tasks?.map(task => {
              if (task.id !== parentTaskId) return task;
              return {
                ...task,
                subtasks: [...(task.subtasks || []), subtask],
              };
            }),
          };
        }),
      };
    });
  }, []);

  // Optimistic add goal
  const addGoal = useCallback((goal: NonNullable<ProfileData["goals"]>[number]) => {
    setProfile(prev => prev ? { ...prev, goals: [...(prev.goals || []), goal] } : null);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        error,
        refreshProfile,
        updateProfile,
        toggleTask,
        addTask,
        addSubtask,
        addGoal,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

/**
 * Hook to access profile data
 */
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

/**
 * Hook to get specific profile sections with loading state
 */
export function useProfileSection<K extends keyof ProfileData>(section: K) {
  const { profile, isLoading } = useProfile();
  return {
    data: profile?.[section] ?? null,
    isLoading,
  };
}
