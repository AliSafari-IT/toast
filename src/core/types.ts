export type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'neutral';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

  id?: string;
  description?: string;
  durationMs?: number; // default 3000
  position?: ToastPosition; // default top-right
  canClose?: boolean; // default true
  ariaLive?: 'polite' | 'assertive'; // default based on variant
  persist?: boolean; // if true, no auto-dismiss
  icon?: string | any; // Use string for vanilla, any for React
  dedupeKey?: string;
  variant?: ToastVariant;
}

  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
  position: ToastPosition;
  durationMs: number;
  canClose: boolean;
  ariaLive: 'polite' | 'assertive';
  persist: boolean;
  icon?: string | any;
  dedupeKey?: string;
  createdAt: number;
}
