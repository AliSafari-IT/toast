// React exports
import React from 'react';

// Core types
export interface ToastOptions {
  id?: string;
  position?: ToastPosition;
  durationMs?: number;
  canClose?: boolean;
  persist?: boolean;
  icon?: React.ReactNode;
  description?: string;
  ariaLive?: 'polite' | 'assertive';
  dedupeKey?: string;
  variant?: ToastVariant;
}

export type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'neutral';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  position: ToastPosition;
  durationMs: number;
  canClose: boolean;
  persist: boolean;
  icon?: React.ReactNode;
  description?: string;
  ariaLive: 'polite' | 'assertive';
  dedupeKey?: string;
  createdAt: number;
}

// Vanilla exports
export const toast: {
  show: (message: string, opts?: ToastOptions & { variant?: ToastVariant }) => string;
  success: (message: string, opts?: ToastOptions) => string;
  info: (message: string, opts?: ToastOptions) => string;
  warning: (message: string, opts?: ToastOptions) => string;
  error: (message: string, opts?: ToastOptions) => string;
  clear: () => void;
  remove: (id: string) => void;
  getToasts: () => Toast[];
};

export interface ToastProviderProps {
  maxVisible?: number;
  position?: ToastPosition;
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps>;
export const Toaster: React.FC;
export function useToast(): {
  show: (message: string, opts?: ToastOptions & { variant?: ToastVariant }) => string;
  success: (message: string, opts?: ToastOptions) => string;
  info: (message: string, opts?: ToastOptions) => string;
  warning: (message: string, opts?: ToastOptions) => string;
  error: (message: string, opts?: ToastOptions) => string;
  clear: () => void;
  remove: (id: string) => void;
  toasts: Toast[];
};
