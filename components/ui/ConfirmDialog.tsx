'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// =============================================================================
// TYPES
// =============================================================================

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

interface UnsavedChangesDialogProps {
  hasUnsavedChanges: boolean;
  onSave?: () => void;
  onDiscard: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

// =============================================================================
// CONFIRM DIALOG
// =============================================================================

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  isLoading = false,
}: ConfirmDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'bg-red-100 text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: 'bg-yellow-100 text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    info: {
      icon: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="p-6">
          {/* Icon */}
          <div className={`w-12 h-12 ${style.icon} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <AlertTriangle className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3
            id="confirm-dialog-title"
            className="text-lg font-bold text-center text-gray-900 mb-2"
          >
            {title}
          </h3>

          {/* Message */}
          <p className="text-center text-gray-600 mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <button
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${style.button} disabled:opacity-50`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// UNSAVED CHANGES DIALOG
// =============================================================================

export function UnsavedChangesDialog({
  hasUnsavedChanges,
  onSave,
  onDiscard,
  onCancel,
  isOpen,
}: UnsavedChangesDialogProps) {
  if (!isOpen || !hasUnsavedChanges) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unsaved-changes-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="p-6">
          {/* Icon */}
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>

          {/* Title */}
          <h3
            id="unsaved-changes-title"
            className="text-lg font-bold text-center text-gray-900 mb-2"
          >
            Unsaved Changes
          </h3>

          {/* Message */}
          <p className="text-center text-gray-600 mb-6">
            You have unsaved changes. Would you like to save them before leaving?
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {onSave && (
              <Button variant="primary" className="w-full" onClick={onSave}>
                Save Changes
              </Button>
            )}
            <Button variant="secondary" className="w-full" onClick={onDiscard}>
              Discard Changes
            </Button>
            <button
              className="w-full px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={onCancel}
            >
              Continue Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// HOOK: useUnsavedChanges
// =============================================================================

export function useUnsavedChanges(initialState: boolean = false) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(initialState);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Warn before leaving page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const markDirty = useCallback(() => setHasUnsavedChanges(true), []);
  const markClean = useCallback(() => setHasUnsavedChanges(false), []);

  const confirmNavigation = useCallback((action: () => void) => {
    if (hasUnsavedChanges) {
      setPendingAction(() => action);
      setShowDialog(true);
    } else {
      action();
    }
  }, [hasUnsavedChanges]);

  const handleDiscard = useCallback(() => {
    setShowDialog(false);
    setHasUnsavedChanges(false);
    pendingAction?.();
    setPendingAction(null);
  }, [pendingAction]);

  const handleCancel = useCallback(() => {
    setShowDialog(false);
    setPendingAction(null);
  }, []);

  return {
    hasUnsavedChanges,
    markDirty,
    markClean,
    confirmNavigation,
    showDialog,
    handleDiscard,
    handleCancel,
  };
}

// =============================================================================
// HOOK: useConfirmDialog
// =============================================================================

export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<Omit<ConfirmDialogProps, 'isOpen' | 'onClose' | 'onConfirm'>>({
    title: '',
    message: '',
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: Omit<ConfirmDialogProps, 'isOpen' | 'onClose' | 'onConfirm'>): Promise<boolean> => {
    setConfig(options);
    setIsOpen(true);

    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    resolver?.(false);
    setResolver(null);
  }, [resolver]);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    resolver?.(true);
    setResolver(null);
  }, [resolver]);

  const Dialog = useCallback(() => (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      {...config}
    />
  ), [isOpen, handleClose, handleConfirm, config]);

  return { confirm, Dialog };
}

export default ConfirmDialog;
