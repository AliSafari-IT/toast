export type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'neutral';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastOptions {
  id?: string;
  description?: string;
  durationMs?: number; // default 3000
  position?: ToastPosition; // default top-right
  canClose?: boolean; // default true
  ariaLive?: 'polite' | 'assertive'; // default based on variant
  persist?: boolean; // if true, no auto-dismiss
  icon?: any; // React component or element
  dedupeKey?: string;
  variant?: ToastVariant;
}

export interface Toast {
  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
  position: ToastPosition;
  durationMs: number;
  canClose: boolean;
  ariaLive: 'polite' | 'assertive';
  persist: boolean;
  icon?: any; // React component or element
  dedupeKey?: string;
  createdAt: number;
}
