import * as React from 'react';
import { toastStore } from '../core/toastStore';
import type { Toast, ToastOptions, ToastVariant, ToastPosition } from '../core/types';

interface ToastContextValue {
  show: (message: string, opts?: ToastOptions & { variant?: ToastVariant }) => string;
  success: (message: string, opts?: ToastOptions) => string;
  info: (message: string, opts?: ToastOptions) => string;
  warning: (message: string, opts?: ToastOptions) => string;
  error: (message: string, opts?: ToastOptions) => string;
  clear: () => void;
  remove: (id: string) => void;
  toasts: Toast[];
}

interface ToastProviderProps {
  maxVisible?: number;
  position?: ToastPosition;
  children: React.ReactNode;
}

export const ToastContext = React.createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ maxVisible = 4, position = 'top-right', children }: ToastProviderProps) => {
  const [toasts, setToasts] = React.useState<Toast[]>(toastStore.getToasts());
  const unsub = React.useRef<() => void>();

  React.useEffect(() => {
    toastStore.setMaxVisible(maxVisible);
    unsub.current = toastStore.subscribe(setToasts);
    return () => {
      unsub.current?.();
    };
  }, [maxVisible]);

  const api = {
    show: (message: string, opts: ToastOptions = {}) => toastStore.show(message, { ...opts, position: (opts.position || position) as ToastPosition }),
    success: (message: string, opts: ToastOptions = {}) => toastStore.show(message, { ...opts, variant: 'success', position: (opts.position || position) as ToastPosition }),
    info: (message: string, opts: ToastOptions = {}) => toastStore.show(message, { ...opts, variant: 'info', position: (opts.position || position) as ToastPosition }),
    warning: (message: string, opts: ToastOptions = {}) => toastStore.show(message, { ...opts, variant: 'warning', position: (opts.position || position) as ToastPosition }),
    error: (message: string, opts: ToastOptions = {}) => toastStore.show(message, { ...opts, variant: 'error', position: (opts.position || position) as ToastPosition }),
    clear: () => toastStore.clear(),
    remove: (id: string) => toastStore.remove(id),
    toasts,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
