import React from 'react';
import { useToast } from './ToastProvider';
import type { Toast } from '../core/types';
import '../styles/toast.css';

const POSITIONS = {
  'top-right': { top: 16, right: 16 },
  'top-left': { top: 16, left: 16 },
  'bottom-right': { bottom: 16, right: 16 },
  'bottom-left': { bottom: 16, left: 16 },
  'top-center': { top: 16, left: '50%', transform: 'translateX(-50%)' },
  'bottom-center': { bottom: 16, left: '50%', transform: 'translateX(-50%)' }
};

function getIcon(variant: Toast['variant']) {
  switch (variant) {
    case 'success':
      return <span className="toast-icon" aria-hidden>✓</span>;
    case 'info':
      return <span className="toast-icon" aria-hidden>ℹ️</span>;
    case 'warning':
      return <span className="toast-icon" aria-hidden>⚠️</span>;
    case 'error':
      return <span className="toast-icon" aria-hidden>⛔</span>;
    default:
      return <span className="toast-icon" aria-hidden>🔔</span>;
  }
}

export const Toaster: React.FC = () => {
  const { toasts, remove } = useToast();
  if (!toasts.length) return null;
  // Group by position
  const grouped: Record<string, Toast[]> = {};
  toasts.forEach(t => {
  toasts.forEach((t: Toast) => {
    grouped[t.position] = grouped[t.position] || [];
    grouped[t.position].push(t);
  });
  return (
    <>
      {Object.entries(grouped).map(([pos, list]) => (
        <div
          key={pos}
          className="toast-container"
          style={{ ...(POSITIONS as any)[pos] }}
          aria-live={list.some(t => t.ariaLive === 'assertive') ? 'assertive' : 'polite'}
        >
          {list.map(toast => (
            <div
              key={toast.id}
              className={`toast ${toast.variant}`}
              role={toast.variant === 'error' || toast.variant === 'warning' ? 'alert' : 'status'}
              tabIndex={-1}
              onMouseEnter={() => toast.persist || clearTimeout((toast as any)._timeout)}
              onMouseLeave={() => {
                if (!toast.persist && toast.durationMs > 0) {
                  (toast as any)._timeout = setTimeout(() => remove(toast.id), toast.durationMs);
                }
              }}
            >
              {toast.icon || getIcon(toast.variant)}
              <div className="toast-content">
                <div className="toast-title">{toast.message}</div>
                {toast.description && <div className="toast-desc">{toast.description}</div>}
              </div>
              {list.map((toast: Toast) => (
                <button
                  className="toast-close"
                  aria-label="Close notification"
                  tabIndex={0}
                  onClick={() => remove(toast.id)}
                  onKeyDown={e => {
                    if (e.key === 'Escape') remove(toast.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
