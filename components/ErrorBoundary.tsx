"use client";

import { Component, type ReactNode, ErrorInfo, useState, useCallback } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in the child component tree,
 * logs them, and displays a fallback UI instead of crashing the whole app.
 *
 * Usage:
 * <ErrorBoundary fallback={<CustomFallback />}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console (in production, send to error reporting service)
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call optional onError callback
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, render it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-8 text-center ring-1 ring-ink-200">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-ink-900">Quelque chose s’est mal passé</h2>
            <p className="text-ink-600 max-w-md">
              Nous n’avons pas pu charger ce contenu. Veuillez réessayer ou nous contacter si le problème persiste.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left max-w-md mt-4 p-3 rounded bg-ink-50 text-xs text-ink-600">
                <summary className="cursor-pointer font-semibold text-ink-700">Détails techniques</summary>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap">{this.state.error.stack}</pre>
              </details>
            )}
          </div>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 rounded-lg bg-brand-500 px-5 py-2.5 font-bold text-white transition hover:bg-brand-600"
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap a component with ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Hook to use error boundary state in functional components
 * (Requires the component to be wrapped in an ErrorBoundary)
 */
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((err: Error) => {
    setError(err);
    // The error will be caught by the nearest ErrorBoundary ancestor
    throw err;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}