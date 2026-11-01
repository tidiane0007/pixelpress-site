"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

// "ToastOptions" n'est pas exporté par react : le contrat d'appel est défini ici.
export interface ToastOptions {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  duration: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (options: ToastOptions) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // Compteur dans un ref : Math.random() au render est une impureté, et un identifiant
  // tiré au sort change d'une passe à l'autre, ce qui casse les clés des toasts.
  const lastIdRef = useRef(0);

  const showToast = (options: ToastOptions) => {
    lastIdRef.current += 1;
    const id = `toast-${lastIdRef.current}`;
    const toast: Toast = {
      id,
      message: options.message,
      type: options.type || "info",
      duration: options.duration ?? 4000,
    };

    setToasts((prev) => [...prev, toast]);

    if (toast.duration > 0) {
      setTimeout(() => dismissToast(id), toast.duration);
    }
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type}`}
          role="alert"
          aria-live="assertive"
        >
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-ink-400 hover:text-ink-600"
            aria-label="Fermer la notification"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}