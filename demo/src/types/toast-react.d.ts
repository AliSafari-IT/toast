declare module '@asafarim/toast/react' {
  import React from 'react';
  import { Toast, ToastOptions, ToastVariant, ToastPosition } from '@asafarim/toast';

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
}
