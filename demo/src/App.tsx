import React, { useState } from "react";
import { ToastProvider, Toaster } from "../../src";
import "../../src/styles/toast.css";
import "./App.css";
import VariantsDemo from "./components/VariantsDemo";
import PositionsDemo from "./components/PositionsDemo";
import OptionsDemo from "./components/OptionsDemo";
import CodeExample from "./components/CodeExample";
import packageJson from "../../package.json";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("variants");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ToastProvider maxVisible={6}>
      <div className="app" data-theme={theme}>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <h1>@asafarim/toast Demo</h1>
        <p className="intro">
          A React toast notification system for React frontends. This demo
          showcases all the features and usage examples.
        </p>
        <div className="version-info">
          <div className="version">Version: {packageJson.version}</div>
          <div className="github-link">
            <a
              href="https://github.com/AliSafari-IT/toast"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="npm-link">
            <a
              href="https://www.npmjs.com/package/@asafarim/toast"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </div>
        </div>

        <div className="nav-tabs">
          <div
            className={`nav-tab ${activeTab === "variants" ? "active" : ""}`}
            onClick={() => setActiveTab("variants")}
          >
            Toast Variants
          </div>
          <div
            className={`nav-tab ${activeTab === "positions" ? "active" : ""}`}
            onClick={() => setActiveTab("positions")}
          >
            Positions
          </div>
          <div
            className={`nav-tab ${activeTab === "options" ? "active" : ""}`}
            onClick={() => setActiveTab("options")}
          >
            Options
          </div>
        </div>

        {activeTab === "variants" && (
          <section className="demo-section">
            <h2>Toast Variants</h2>
            <p>
              The toast package supports 5 different variants: success, info,
              warning, error, and neutral.
            </p>
            <VariantsDemo />
            <CodeExample
              title="React Usage"
              code={`import { useToast } from '@asafarim/toast';

function MyComponent() {
  const toast = useToast();
  
  return (
    <div>
      <button onClick={() => toast.success('Success message')}>
        Show Success Toast
      </button>
      <button onClick={() => toast.info('Info message')}>
        Show Info Toast
      </button>
      <button onClick={() => toast.warning('Warning message')}>
        Show Warning Toast
      </button>
      <button onClick={() => toast.error('Error message')}>
        Show Error Toast
      </button>
      <button onClick={() => toast.show('Neutral message')}>
        Show Neutral Toast
      </button>
    </div>
  );
}`}
            />
          </section>
        )}

        {activeTab === "positions" && (
          <section className="demo-section">
            <h2>Toast Positions</h2>
            <p>
              Toasts can be positioned in 6 different locations on the screen.
            </p>
            <PositionsDemo />
            <CodeExample
              title="Setting Toast Position"
              code={`// Option 1: Set default position in ToastProvider
<ToastProvider position="top-right">
  {children}
</ToastProvider>

// Option 2: Set position per toast
toast.success('Success message', { position: 'bottom-center' });`}
            />
          </section>
        )}

        {activeTab === "options" && (
          <section className="demo-section">
            <h2>Toast Options</h2>
            <p>
              Customize toasts with various options like duration, description,
              persistence, and more.
            </p>
            <OptionsDemo />
            <CodeExample
              title="Toast Options"
              code={`// All available options
toast.info('Message with options', {
  description: 'Additional details about the toast',
  durationMs: 5000, // 5 seconds (default is 3000ms)
  position: 'top-right',
  canClose: true, // Show close button
  persist: false, // Auto-dismiss after duration
  icon: <CustomIcon />, // Custom icon component
  dedupeKey: 'unique-key', // Prevents duplicate toasts
});

// Persistent toast that won't auto-dismiss
toast.warning('Important notice', { 
  persist: true 
});

// Toast with custom duration
toast.success('Saved successfully', { 
  durationMs: 2000 
});`}
            />
          </section>
        )}

        <Toaster />
      </div>
    </ToastProvider>
  );
};

export default App;
