import { toastStore } from '../core/toastStore';
import type { ToastOptions, ToastVariant } from '../core/types';

export const toast = {
  show(message: string, opts: ToastOptions & { variant?: ToastVariant } = {}) {
    return toastStore.show(message, opts);
  },
  success(message: string, opts?: ToastOptions) {
    return toastStore.show(message, { ...opts, variant: 'success' });
  },
  info(message: string, opts?: ToastOptions) {
    return toastStore.show(message, { ...opts, variant: 'info' });
  },
  warning(message: string, opts?: ToastOptions) {
    return toastStore.show(message, { ...opts, variant: 'warning' });
  },
  error(message: string, opts?: ToastOptions) {
    return toastStore.show(message, { ...opts, variant: 'error' });
  },
  clear() {
    toastStore.clear();
  },
  remove(id: string) {
    toastStore.remove(id);
  }
  // Listen for CustomEvent for vanilla usage
  if (typeof window !== 'undefined') {
    window.addEventListener('asafarim:toast', (e: any) => {
      const detail = e.detail || {};
      toast.show(detail.message, detail);
    });
  }
};

// Listen for CustomEvent for vanilla usage
if (typeof window !== 'undefined') {
  window.addEventListener('asafarim:toast', (e: any) => {
    const detail = e.detail || {};
    toast.show(detail.message, detail);
  });
}
