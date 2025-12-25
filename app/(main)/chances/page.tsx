"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Loader2, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BarChart3,
  Plus,
  GraduationCap,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SchoolLogo } from "@/components/ui/SchoolLogo";
import { ChancesResult } from "@/lib/chances/types";
import { useProfile } from "@/lib/context/ProfileContext";

// =============================================================================
// TYPES
// =============================================================================

interface School {
  id: string;
  name: string;
  shortName: string | null;
  city: string | null;
  state: string | null;
  type: string | null;
  acceptanceRate: number | null;
  satRange25: number | null;
  satRange75: number | null;
}

interface AssessedSchool {
  schoolId: string;
  school: School;
  result: ChancesResult;
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ChancesPage() {
  const searchParams = useSearchParams();
  const initialSchoolId = searchParams.get("school");
  const { profile } = useProfile();
  
  // Assessed schools state
  const [assessedSchools, setAssessedSchools] = useState<AssessedSchool[]>([]);
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  
  // Add card state
  const [isAddingSchool, setIsAddingSchool] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<School[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Calculation state
  const [calculatingSchool, setCalculatingSchool] = useState<School | null>(null);
  const [calculationProgress, setCalculationProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const addCardRef = useRef<HTMLDivElement>(null);

  // Load initial school if provided via URL
  const loadSchoolById = useCallback(async (schoolId: string) => {
    try {
      const res = await fetch(`/api/schools/${schoolId}`);
      if (res.ok) {
        const school = await res.json();
        await calculateForSchool(school);
      }
    } catch (error) {
      console.error("Failed to load school:", error);
    }
  }, []);

  useEffect(() => {
    if (initialSchoolId) {
      loadSchoolById(initialSchoolId);
    }
  }, [initialSchoolId, loadSchoolById]);

  // Focus input when starting to add
  useEffect(() => {
    if (isAddingSchool) {
      searchInputRef.current?.focus();
    }
  }, [isAddingSchool]);

  // Close add card when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addCardRef.current && !addCardRef.current.contains(event.target as Node)) {
        if (isAddingSchool && !searchQuery) {
          setIsAddingSchool(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAddingSchool, searchQuery]);

  // Debounced search
  const searchSchools = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/schools/search?q=${encodeURIComponent(query)}&limit=6`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.schools || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(true);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      searchSchools(query);
    }, 300);
  };

  // Calculate chances for a school
  const calculateForSchool = async (school: School) => {
    // Check if already assessed
    const existing = assessedSchools.find(s => s.schoolId === school.id);
    if (existing) {
      setExpandedSchoolId(school.id);
      cancelAddSchool();
      return;
    }
    
    setCalculatingSchool(school);
    setError(null);
    setCalculationProgress("Analyzing your profile...");
    cancelAddSchool();
    
    try {
      // Simulate progress steps
      setTimeout(() => setCalculationProgress("Comparing academics..."), 500);
      setTimeout(() => setCalculationProgress("Evaluating activities..."), 1500);
      setTimeout(() => setCalculationProgress("Assessing overall fit..."), 2500);
      
      const res = await fetch("/api/chances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: school.id }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to calculate chances");
      }
      
      const result = await res.json();
      
      // Add to assessed schools at the top
      setAssessedSchools(prev => [
        { schoolId: school.id, school, result },
        ...prev,
      ]);
      setExpandedSchoolId(school.id);
    } catch (error) {
      console.error("Calculation error:", error);
      setError(error instanceof Error ? error.message : "Failed to calculate chances");
    } finally {
      setCalculatingSchool(null);
      setCalculationProgress("");
    }
  };

  // Handle school selection from search
  const handleSelectSchool = (school: School) => {
    setShowResults(false);
    calculateForSchool(school);
  };

  // Cancel adding school
  const cancelAddSchool = () => {
    setIsAddingSchool(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Toggle expand/collapse
  const toggleExpand = (schoolId: string) => {
    setExpandedSchoolId(expandedSchoolId === schoolId ? null : schoolId);
  };

  // Recalculate for a school
  const recalculate = async (school: School) => {
    // Remove from list first
    setAssessedSchools(prev => prev.filter(s => s.schoolId !== school.id));
    // Then recalculate
    await calculateForSchool(school);
  };

  // Format relative date
  const formatCheckedDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-surface-primary pb-20">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary">
              Your Chances
            </h1>
          </div>
          <p className="text-text-secondary">
            See how you stack up against your target schools
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Schools List */}
        <div className="space-y-4">
          {/* Calculating Card - Shows when calculating */}
          {calculatingSchool && (
            <div className="bg-surface-secondary border border-border-subtle rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <SchoolLogo name={calculatingSchool.name} size="md" />
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {calculatingSchool.name}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {calculatingSchool.city}, {calculatingSchool.state}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-accent-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">{calculationProgress}</span>
                </div>
              </div>
            </div>
          )}

          {/* Assessed Schools */}
          {assessedSchools.map(({ schoolId, school, result }) => (
            <SchoolChancesCard
              key={schoolId}
              school={school}
              result={result}
              isExpanded={expandedSchoolId === schoolId}
              onToggle={() => toggleExpand(schoolId)}
              onRecalculate={() => recalculate(school)}
              formatCheckedDate={formatCheckedDate}
            />
          ))}

          {/* Add School Card */}
          <div 
            ref={addCardRef}
            className={cn(
              "rounded-2xl border-2 border-dashed transition-all",
              isAddingSchool 
                ? "border-accent-primary bg-surface-secondary" 
                : "border-border-subtle hover:border-accent-primary/50 hover:bg-surface-secondary/50"
            )}
          >
            {isAddingSchool ? (
              // Active search state
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowResults(true)}
                    placeholder="Type a school name..."
                    className={cn(
                      "w-full pl-10 pr-10 py-3 rounded-xl",
                      "bg-surface-tertiary border-none",
                      "text-text-primary placeholder:text-text-muted",
                      "focus:outline-none focus:ring-2 focus:ring-accent-primary/30",
                      "transition-all"
                    )}
                  />
                  <button
                    onClick={cancelAddSchool}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Search Results */}
                {showResults && (searchResults.length > 0 || isSearching) && (
                  <div className="mt-2 bg-surface-tertiary rounded-xl overflow-hidden">
                    {isSearching && searchResults.length === 0 && (
                      <div className="px-4 py-3 flex items-center gap-2 text-text-muted">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Searching...</span>
                      </div>
                    )}
                    {searchResults.map((school) => (
                      <button
                        key={school.id}
                        onClick={() => handleSelectSchool(school)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-surface-primary/50 transition-colors text-left"
                      >
                        <SchoolLogo name={school.name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-text-primary truncate">
                            {school.name}
                          </div>
                          <div className="text-sm text-text-muted">
                            {school.city}, {school.state}
                            {school.acceptanceRate && (
                              <span className="ml-2">
                                • {(school.acceptanceRate * 100).toFixed(1)}% acceptance
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                    {searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
                      <div className="px-4 py-3 text-sm text-text-muted">
                        No schools found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Inactive placeholder state
              <button
                onClick={() => setIsAddingSchool(true)}
                className="w-full p-5 flex items-center gap-4 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-tertiary flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                  <Plus className="w-5 h-5 text-text-muted group-hover:text-accent-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-text-muted group-hover:text-text-primary transition-colors">
                    Add a school
                  </h3>
                  <p className="text-sm text-text-muted">
                    Check your chances at any school
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Empty State Hint */}
          {assessedSchools.length === 0 && !calculatingSchool && !isAddingSchool && (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-surface-secondary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-text-muted" />
              </div>
              <p className="text-text-muted text-sm">
                Click "Add a school" above to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SCHOOL CHANCES CARD
// =============================================================================

interface SchoolChancesCardProps {
  school: School;
  result: ChancesResult;
  isExpanded: boolean;
  onToggle: () => void;
  onRecalculate: () => void;
  formatCheckedDate: (date: Date | string) => string;
}

function SchoolChancesCard({ 
  school, 
  result, 
  isExpanded, 
  onToggle,
  onRecalculate,
  formatCheckedDate,
}: SchoolChancesCardProps) {
  const tierColors: Record<string, string> = {
    safety: "bg-green-500/20 text-green-400",
    likely: "bg-emerald-500/20 text-emerald-400",
    target: "bg-yellow-500/20 text-yellow-400",
    reach: "bg-orange-500/20 text-orange-400",
    unlikely: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-surface-secondary border border-border-subtle rounded-2xl overflow-hidden">
      {/* Collapsed Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 hover:bg-surface-tertiary/50 transition-colors text-left"
      >
        <SchoolLogo name={school.name} size="md" />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary truncate">
            {school.name}
          </h3>
          <p className="text-sm text-text-muted">
            {school.city}, {school.state}
            {school.acceptanceRate && (
              <span> • {(school.acceptanceRate * 100).toFixed(1)}% acceptance</span>
            )}
          </p>
        </div>
        
        {/* Probability Badge + Date */}
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-accent-primary">
            {result.probability}%
          </div>
          <div className="flex items-center gap-2 justify-end">
            <div className={cn(
              "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
              tierColors[result.tier] || "bg-gray-500/20 text-gray-400"
            )}>
              {result.tier.charAt(0).toUpperCase() + result.tier.slice(1)}
            </div>
            <span className="text-xs text-text-muted">
              • {formatCheckedDate(result.calculatedAt)}
            </span>
          </div>
        </div>
        
        {/* Expand/Collapse Icon */}
        <div className="text-text-muted shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-border-subtle">
          {/* Summary */}
          <p className="text-text-secondary mt-5 mb-6">
            {result.summary}
          </p>
          
          {/* Factor Breakdown */}
          <div className="bg-surface-tertiary rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-accent-primary" />
              <h4 className="font-medium text-text-primary">Factor Breakdown</h4>
            </div>
            
            <div className="space-y-3">
              <FactorBar 
                label="Academics" 
                score={result.factors.academics.score}
                impact={result.factors.academics.impact}
                details={result.factors.academics.details}
              />
              <FactorBar 
                label="Testing" 
                score={result.factors.testing.score}
                impact={result.factors.testing.impact}
                details={result.factors.testing.details}
              />
              <FactorBar 
                label="Activities" 
                score={result.factors.activities.score}
                impact={result.factors.activities.impact}
                details={result.factors.activities.details}
              />
              <FactorBar 
                label="Awards" 
                score={result.factors.awards.score}
                impact={result.factors.awards.impact}
                details={result.factors.awards.details}
              />
            </div>
          </div>
          
          {/* Improvements */}
          {result.improvements.length > 0 && (
            <div className="bg-surface-tertiary rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <h4 className="font-medium text-text-primary">What Could Help</h4>
              </div>
              
              <div className="space-y-2">
                {result.improvements.map((improvement, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full mt-2",
                      improvement.priority === "high" && "bg-accent-primary",
                      improvement.priority === "medium" && "bg-yellow-400",
                      improvement.priority === "low" && "bg-text-muted"
                    )} />
                    <div className="flex-1">
                      <span className="text-text-primary">{improvement.action}</span>
                      <span className="text-accent-primary text-sm ml-2">
                        {improvement.potentialImpact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-end">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRecalculate();
              }}
            >
              <Sparkles className="w-4 h-4" />
              Recalculate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// FACTOR BAR COMPONENT
// =============================================================================

interface FactorBarProps {
  label: string;
  score: number;
  impact: string;
  details: string;
}

function FactorBar({ label, score, impact, details }: FactorBarProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "strong_positive": return "bg-green-500";
      case "positive": return "bg-emerald-400";
      case "neutral": return "bg-yellow-400";
      case "negative": return "bg-orange-400";
      case "strong_negative": return "bg-red-500";
      default: return "bg-text-muted";
    }
  };
  
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "strong_positive":
      case "positive":
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />;
      case "neutral":
        return <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />;
      case "negative":
      case "strong_negative":
        return <XCircle className="w-3.5 h-3.5 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          {getImpactIcon(impact)}
          <span className="text-sm font-medium text-text-primary">{label}</span>
        </div>
        <span className="text-xs text-text-muted">{score}/100</span>
      </div>
      <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden mb-1">
        <div 
          className={cn("h-full rounded-full transition-all", getImpactColor(impact))}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-text-muted">{details}</p>
    </div>
  );
}
