"use client";

import React, { useState, useCallback } from "react";
import { Upload, FileText, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ExtractedCourse {
  name: string;
  subject: string;
  level: string;
  gradeLevel: string;
  grade?: string;
  credits?: number;
  isDuplicate?: boolean;
  isPotentialDuplicate?: boolean;
  matchType?: "exact" | "similar" | "new";
  existingName?: string;
}

interface ExtractionResult {
  courses: ExtractedCourse[];
  studentName?: string;
  schoolName?: string;
  gpaUnweighted?: number;
  gpaWeighted?: number;
  totalExtracted: number;
  duplicates: number;
  potentialDuplicates: number;
}

interface TranscriptUploaderProps {
  onExtracted: (result: ExtractionResult) => void;
  onCancel: () => void;
}

export function TranscriptUploader({ onExtracted, onCancel }: TranscriptUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);
    
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PNG, JPEG, or WebP image. PDF is not supported yet.");
      return;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/profile/courses/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to extract courses");
      }

      const result: ExtractionResult = await response.json();
      onExtracted(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process transcript");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer",
            isDragging
              ? "border-accent-primary bg-accent-surface/30"
              : "border-border-medium hover:border-accent-primary hover:bg-accent-surface/10"
          )}
        >
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.gif"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
              isDragging ? "bg-accent-primary text-white" : "bg-bg-sidebar text-text-muted"
            )}>
              <Upload className="w-8 h-8" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-text-main mb-1">
                {isDragging ? "Drop your transcript here" : "Drag & drop your transcript"}
              </p>
              <p className="text-sm text-text-muted">
                or click to browse • PNG, JPEG, WebP images supported
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected File */}
      {file && !isUploading && (
        <div className="bg-bg-sidebar rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-surface rounded-lg flex items-center justify-center text-accent-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-text-main">{file.name}</p>
              <p className="text-xs text-text-muted">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Uploading State */}
      {isUploading && (
        <div className="bg-accent-surface/30 rounded-xl p-8 text-center">
          <Loader2 className="w-10 h-10 text-accent-primary animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-text-main mb-1">Analyzing transcript...</p>
          <p className="text-sm text-text-muted">
            This may take a few seconds
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
        <Button variant="ghost" onClick={onCancel} disabled={isUploading}>
          Cancel
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Extract Courses
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

