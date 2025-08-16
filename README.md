# @asafarim/toast

A lightweight, theme-aware toast notification system for React applications with a simple programmatic API and optional vanilla JavaScript adapter.

## Features

- Theme-aware UI (light/dark mode support)
- Simple API: `toast.success/info/warning/error(message, options)`
- React adapter: `<ToastProvider>`, `useToast()`, `<Toaster />`
- Vanilla API: global singleton `toast` + CustomEvent hook
- Queue & limits: max concurrent, FIFO
- Auto-dismiss, pause on hover, closable, swipe-to-dismiss
- Accessible: roles, aria-live, focusable close, reduced-motion
- Premium design: glassy, gradient, shadow, icons
- Positions: top/bottom, left/right/center
- Deduping: prevent duplicate spam
- TypeScript, ESM/CJS builds
- Zero external dependencies

## Installation

```bash
npm install @asafarim/toast
# or
yarn add @asafarim/toast
# or
pnpm add @asafarim/toast
```

## Usage

### React Usage

```tsx
// App.tsx or root component
import { ToastProvider, Toaster } from '@asafarim/toast/react';
import '@asafarim/toast/styles.css';

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
      <Toaster />
    </ToastProvider>
  );
}
```

```tsx
// Any component
import { useToast } from '@asafarim/toast/react';

function MyComponent() {
  const toast = useToast();
  
  const handleClick = () => {
    toast.success('Operation successful!', {
      description: 'Your changes have been saved.',
      durationMs: 5000
    });
  };
  
  return <button onClick={handleClick}>Save Changes</button>;
}
```

### Vanilla JavaScript Usage

```js
import { toast } from '@asafarim/toast';
import '@asafarim/toast/styles.css';

// Initialize toast container
toast.init();

// Show toast notifications
toast.success('Operation successful!');
toast.error('Something went wrong', { 
  description: 'Please try again later.'
});
```

## API Reference

### Toast Options

```ts
interface ToastOptions {
  description?: string;        // Additional details
  durationMs?: number;         // Duration in ms (default: 3000)
  position?: ToastPosition;    // Position on screen
  canClose?: boolean;          // Show close button (default: true)
  persist?: boolean;           // Prevent auto-dismiss (default: false)
  icon?: React.ReactNode;      // Custom icon
  dedupeKey?: string;          // Prevents duplicate toasts
}
```

### Toast Positions

```ts
type ToastPosition = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
```

### Toast Variants

```ts
type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'neutral';
```

## Theme Support

The toast package automatically adapts to light and dark themes. To enable dark mode, add the `data-theme="dark"` attribute to your HTML element:

```js
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');
```
