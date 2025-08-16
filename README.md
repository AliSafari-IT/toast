# @asafarim/toast

A lightweight, theme-aware toast notification system for React applications with a simple programmatic API.

## Links & Info

[![npm version](https://img.shields.io/npm/v/@asafarim/toast.svg)](https://www.npmjs.com/package/@asafarim/toast)
[![GitHub](https://img.shields.io/github/stars/AliSafari-IT/toast?style=social)](https://github.com/AliSafari-IT/toast)

- **Version**: 1.2.0
- **GitHub**: [github.com/AliSafari-IT/toast](https://github.com/AliSafari-IT/toast)
- **npm**: [npmjs.com/package/@asafarim/toast](https://www.npmjs.com/package/@asafarim/toast)
- **Demo**: [alisafari-it.github.io/toast](https://alisafari-it.github.io/toast/)

## Features

- Theme-aware UI (light/dark mode support)
- Simple React API: `useToast().success/info/warning/error(message, options)`
- React components: `<ToastProvider>`, `<Toaster />`
- Queue & limits: max concurrent, FIFO
- Auto-dismiss, pause on hover, closable
- Accessible: roles, aria-live, focusable close, reduced-motion
- Premium design: glassy, gradient, shadow, icons
- Multiple positions: top/bottom, left/right/center
- Deduping: prevent duplicate toast notifications
- TypeScript support with full type definitions
- ESM/CJS builds
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

```tsx
// App.tsx or root component
import { ToastProvider, Toaster } from '@asafarim/toast';
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
import { useToast } from '@asafarim/toast';

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

## API Reference

### Components

#### ToastProvider

```tsx
<ToastProvider maxVisible={6} position="top-right">
  {children}
</ToastProvider>
```

**Props:**

- `maxVisible`: Maximum number of toasts visible at once (default: 5)
- `position`: Default position for all toasts (default: 'top-right')
- `children`: React children

#### Toaster

```tsx
<Toaster />
```

The visual component that renders the toast notifications. Should be placed once in your app, typically at the root level.

### useToast Hook

```tsx
const toast = useToast();

// Methods
toast.show(message, options);  // Show a toast with custom variant
toast.success(message, options); // Show a success toast
toast.info(message, options);    // Show an info toast
toast.warning(message, options); // Show a warning toast
toast.error(message, options);   // Show an error toast
toast.clear();                   // Remove all toasts
toast.remove(id);                // Remove a specific toast

// Properties
toast.toasts;                    // Array of current toast objects
```

### Toast Options

```ts
interface ToastOptions {
  id?: string;              // Custom ID (auto-generated if not provided)
  description?: string;     // Additional details
  durationMs?: number;      // Duration in ms (default: 3000)
  position?: ToastPosition; // Position on screen
  canClose?: boolean;       // Show close button (default: true)
  persist?: boolean;        // Prevent auto-dismiss (default: false)
  icon?: React.ReactNode;   // Custom icon
  dedupeKey?: string;       // Prevents duplicate toasts
  variant?: ToastVariant;   // Toast style variant
  ariaLive?: 'polite' | 'assertive'; // Accessibility setting
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

```tsx
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Example with a theme toggle button
const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
};
```

## Examples

### Different Toast Variants

```tsx
import { useToast } from '@asafarim/toast';

function VariantsDemo() {
  const toast = useToast();
  
  return (
    <div className="variants-demo">
      <button onClick={() => toast.success('Success message')}>Success</button>
      <button onClick={() => toast.info('Information message')}>Info</button>
      <button onClick={() => toast.warning('Warning message')}>Warning</button>
      <button onClick={() => toast.error('Error message')}>Error</button>
      <button onClick={() => toast.show('Neutral message', { variant: 'neutral' })}>Neutral</button>
    </div>
  );
}
```

### Custom Toast Options

```tsx
import { useToast } from '@asafarim/toast';

function OptionsDemo() {
  const toast = useToast();
  
  const showCustomToast = () => {
    toast.show('Custom toast message', {
      description: 'This is a detailed description',
      durationMs: 5000,
      variant: 'info',
      position: 'top-center',
      persist: false,
      canClose: true
    });
  };
  
  return <button onClick={showCustomToast}>Show Custom Toast</button>;
}
```

### Different Positions

```tsx
import { useToast, ToastPosition } from '@asafarim/toast';

function PositionsDemo() {
  const toast = useToast();
  
  const positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ];
  
  return (
    <div className="positions-demo">
      {positions.map(position => (
        <button
          key={position}
          onClick={() => toast.info(`Toast at ${position}`, { position })}
        >
          {position}
        </button>
      ))}
    </div>
  );
}
```

## License

MIT
