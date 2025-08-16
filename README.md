# @asafarim/toast

A lightweight, theme-aware toast notification system for all ASafariM frontends (identity-portal, web, blog), with a simple programmatic API and optional React adapter.

## Features

- Theme-aware UI (light/dark, shared tokens)
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

## Usage

See API and integration examples in the spec.
