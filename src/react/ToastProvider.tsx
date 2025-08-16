import React, { createContext, useContext, useEffect, useRef } from 'react';
import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
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

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{
  maxVisible?: number;
  position?: ToastPosition;
  children: ReactNode;
}> = ({ maxVisible = 4, position = 'top-right', children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>(toastStore.getToasts());
  const unsub = useRef<() => void>();

  useEffect(() => {
    toastStore.setMaxVisible(maxVisible);
    unsub.current = toastStore.subscribe(setToasts);
    return () => {
      unsub.current?.();
    };
  }, [maxVisible]);

  const api = {
    show: (message: string, opts: ToastOptions = {}) => toastStore.show(message, { ...opts, position }),
    success: (message: string, opts?: ToastOptions) => toastStore.show(message, { ...opts, variant: 'success', position }),
    info: (message: string, opts?: ToastOptions) => toastStore.show(message, { ...opts, variant: 'info', position }),
    warning: (message: string, opts?: ToastOptions) => toastStore.show(message, { ...opts, variant: 'warning', position }),
    error: (message: string, opts?: ToastOptions) => toastStore.show(message, { ...opts, variant: 'error', position }),
    clear: () => toastStore.clear(),
    remove: (id: string) => toastStore.remove(id),
    toasts
  };

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>;
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
