import type { Toast, ToastOptions, ToastVariant, ToastPosition } from './types';

export type ToastListener = (toasts: Toast[]) => void;

const MAX_VISIBLE = 4;
let toastId = 0;

class ToastStore {
  private toasts: Toast[] = [];
  private queue: Toast[] = [];
  private listeners: ToastListener[] = [];
  private maxVisible: number = MAX_VISIBLE;

  subscribe(listener: ToastListener) {
    this.listeners.push(listener);
    listener(this.toasts);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.toasts));
  }

  show(message: string, opts: ToastOptions = {}) {
    const variant: ToastVariant = (opts as any).variant || 'neutral';
    const position: ToastPosition = opts.position || 'top-right';
    const durationMs = opts.persist ? 0 : opts.durationMs ?? 3000;
    const id = opts.id || `toast-${++toastId}`;
    const ariaLive = opts.ariaLive || (variant === 'error' || variant === 'warning' ? 'assertive' : 'polite');
    const canClose = opts.canClose !== false;
    const toast: Toast = {
      id,
      message,
      description: opts.description,
      variant,
      position,
      durationMs,
      canClose,
      ariaLive,
      persist: !!opts.persist,
      icon: opts.icon,
      dedupeKey: opts.dedupeKey,
      createdAt: Date.now()
    };
    // Deduping
    if (toast.dedupeKey) {
      const idx = this.toasts.findIndex(t => t.dedupeKey === toast.dedupeKey);
      if (idx !== -1) {
        this.toasts[idx] = toast;
        this.notify();
        return toast.id;
      }
    }
    if (this.toasts.length < this.maxVisible) {
      this.toasts = [...this.toasts, toast]; // Create a new array to ensure state update
    } else {
      this.queue = [...this.queue, toast]; // Create a new array to ensure state update
    }
    
    // Ensure notification happens after state update
    setTimeout(() => this.notify(), 0);
    
    if (durationMs > 0) {
      setTimeout(() => this.remove(id), durationMs);
    }
    return toast.id;
  }

  remove(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    if (this.queue.length > 0 && this.toasts.length < this.maxVisible) {
      const nextToast = this.queue.shift()!;
      this.toasts = [...this.toasts, nextToast];
    }
    // Ensure notification happens after state update
    setTimeout(() => this.notify(), 0);
  }

  clear() {
    this.toasts = [];
    this.queue = [];
    // Ensure notification happens after state update
    setTimeout(() => this.notify(), 0);
  }

  setMaxVisible(n: number) {
    this.maxVisible = n;
  }

  getToasts() {
    return this.toasts;
  }
}

export const toastStore = new ToastStore();
