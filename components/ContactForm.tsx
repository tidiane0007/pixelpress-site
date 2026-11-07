"use client";

import { FormEvent, useState, useRef, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { buildWhatsAppUrl } from "@/lib/site-config";

type ContactFormProps = { quote?: boolean };

const initialValues = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

type Status =
  | { type: "idle" }
  | { type: "success" }
  | { type: "error"; message: string; errors?: Record<string, string> };

const fieldClass =
  "rounded-lg border border-ink-200 px-3 py-2.5 font-normal outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100";
const fieldErrorClass =
  "rounded-lg border border-red-500 px-3 py-2.5 font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";
const labelClass = "grid gap-2 text-sm font-semibold text-ink-700";

// Validation functions
const validators = {
  name: (value: string) => (value.trim().length < 2 ? "Le nom doit contenir au moins 2 caractères" : ""),
  email: (value: string) => {
    if (!value.trim()) return "L'e-mail est requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'e-mail invalide";
    return "";
  },
  phone: (value: string) => {
    if (!value.trim()) return "Le téléphone est requis";
    if (!/^[\d\s\-\+\(\)]{8,}$/.test(value)) return "Numéro de téléphone invalide";
    return "";
  },
  subject: (value: string) => (value.trim().length < 5 ? "L'objet doit contenir au moins 5 caractères" : ""),
  message: (value: string) => (value.trim().length < 10 ? "Le message doit contenir au moins 10 caractères" : ""),
};

type FormErrors = Record<keyof typeof initialValues, string>;

export default function ContactForm({ quote = false }: ContactFormProps) {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({
    name: "", email: "", phone: "", subject: "", message: "", website: ""
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Validate a single field
  const validateField = useCallback((name: keyof typeof validators, value: string) => {
    const error = validators[name](value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }, []);

  // Validate all fields
  const validateAll = useCallback((): FormErrors => {
    const newErrors: FormErrors = {} as FormErrors;
    (Object.keys(validators) as Array<keyof typeof validators>).forEach((key) => {
      const error = validators[key](values[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    // Marquer tout touché : sans ça, un clic sur « Envoyer » sans avoir posé le
    // curseur dans un champ affiche le résumé mais laisse aria-invalid faux et le
    // message d'erreur masqué — un lecteur d'écran ne peut pas relier le champ à
    // son défaut.
    setTouched(Object.fromEntries((Object.keys(validators) as Array<keyof typeof validators>).map((k) => [k, true])));
    return newErrors;
  }, [values]);

  // Handle blur for inline validation
  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name in validators) {
      validateField(name as keyof typeof validators, value);
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  }, [validateField]);

  // Handle input change
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on input if field was touched
    if (touched[name]) {
      validateField(name as keyof typeof validators, value);
    }
  }, [touched, validateField]);

  const selectionLines = cartItems.map((item) => {
    const options = item.selections.length ? ` (${item.selections.join(", ")})` : "";
    return `- ${item.product.name} × ${item.quantity}${options}`;
  });

  const whatsAppHref = buildWhatsAppUrl(
    [
      quote ? "Demande de devis — PIXEL PRESS" : "Message — PIXEL PRESS",
      `Nom : ${values.name || "—"}`,
      `Téléphone : ${values.phone || "—"}`,
      `E-mail : ${values.email || "—"}`,
      `${quote ? "Prestation" : "Objet"} : ${values.subject || "—"}`,
      ...(quote && selectionLines.length ? ["", "Prestations sélectionnées :", ...selectionLines] : []),
      "",
      values.message || "—",
    ].join("\n")
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate all fields
    const validationErrors = validateAll();
    const hasErrors = Object.values(validationErrors).some((error) => error.length > 0);

    if (hasErrors) {
      // Focus the error summary for accessibility
      setTimeout(() => errorSummaryRef.current?.focus(), 0);
      setStatus({ type: "error", message: "Veuillez corriger les erreurs ci-dessous", errors: validationErrors });
      return;
    }

    setIsSending(true);
    setStatus({ type: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          type: quote ? "Demande de devis" : "Message de contact",
          items: quote
            ? cartItems.map(({ product, quantity, selections }) => ({
                name: product.name,
                quantity,
                options: selections,
              }))
            : [],
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "L'envoi a échoué.");

      setStatus({ type: "success" });
      setValues(initialValues);
      setTouched({});
      setErrors({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
      if (quote) clearCart();

      showToast({
        message: quote ? "Votre demande de devis a été envoyée avec succès !" : "Votre message a été envoyé avec succès !",
        type: "success",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "L'envoi a échoué. Réessayez plus tard.";
      setStatus({ type: "error", message });
      showToast({ message, type: "error" });
    } finally {
      setIsSending(false);
    }
  }

  const update = (key: keyof typeof initialValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  // Helper to get field labels for error summary
  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      name: "Nom complet",
      email: "E-mail",
      phone: "Téléphone",
      subject: quote ? "Prestation souhaitée" : "Objet",
      message: "Votre message",
    };
    return labels[field] || field;
  };

  if (status.type === "success") {
    return (
      <div
        role="status"
        className="grid gap-4 rounded-2xl bg-primary-50 p-6 ring-1 ring-primary-200 sm:p-8"
      >
        <p className="text-lg font-black text-primary-700">
          {quote ? "Votre demande de devis est bien partie." : "Votre message est bien envoyé."}
        </p>
        <p className="text-sm leading-6 text-ink-700">
          Nous répondons sous 24 h ouvrées. Pour une réponse immédiate, reprenez la conversation sur
          WhatsApp avec les mêmes éléments.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-primary-600 px-5 py-3 font-bold text-ink-950 transition hover:bg-primary-700"
          >
            Suivre sur WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus({ type: "idle" })}
            className="rounded-lg bg-white px-5 py-3 font-bold text-ink-800 ring-1 ring-ink-200 transition hover:bg-ink-50"
          >
            Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-200 sm:p-8"
      noValidate
    >
      {/* Error Summary - accessible focus target */}
      {status.type === "error" && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          className="error-message"
        >
          <p className="font-bold text-red-800">{status.message}</p>
          {status.errors && (
            <ul className="mt-2 space-y-1">
              {Object.entries(status.errors)
                .filter(([, error]) => error)
                .map(([field, error]) => (
                  <li key={field}>
                    <a href={`#${field}`} className="text-red-700 underline hover:text-red-800">
                      {getFieldLabel(field)} : {error}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}

      {quote && cartItems.length > 0 && (
        <div className="rounded-xl bg-ink-50 p-4 ring-1 ring-ink-200">
          <p className="text-sm font-bold text-ink-900">
            Votre sélection ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} unité
            {cartItems.length > 1 ? "s" : ""} sur {cartItems.length} prestation
            {cartItems.length > 1 ? "s" : ""})
          </p>
          <ul className="mt-2 grid gap-2">
            {cartItems.map((item) => (
              <li
                key={item.key}
                className="flex items-start justify-between gap-3 text-sm text-ink-700"
              >
                <span>
                  <span className="font-semibold text-ink-900">{item.product.name}</span> ×{" "}
                  {item.quantity}
                  {item.selections.length > 0 && (
                    <span className="block text-xs text-ink-500">{item.selections.join(" · ")}</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.key)}
                  className="shrink-0 font-semibold text-ink-500 transition hover:text-red-700"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Nom complet
          <input
            required
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            className={touched.name && errors.name ? fieldErrorClass : fieldClass}
          />
          {touched.name && errors.name && (
            <p id="name-error" className="error-message" role="alert" aria-live="polite">
              {errors.name}
            </p>
          )}
        </label>
        <label className={labelClass}>
          Téléphone
          <input
            required
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
            className={touched.phone && errors.phone ? fieldErrorClass : fieldClass}
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" className="error-message" role="alert" aria-live="polite">
              {errors.phone}
            </p>
          )}
        </label>
      </div>
      <label className={labelClass}>
        E-mail
        <input
          required
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? "email-error" : undefined}
          className={touched.email && errors.email ? fieldErrorClass : fieldClass}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="error-message" role="alert" aria-live="polite">
            {errors.email}
          </p>
        )}
      </label>
      <label className={labelClass}>
        {quote ? "Prestation souhaitée" : "Objet"}
        <input
          required
          id="subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={quote ? "Ex. 500 flyers A5, recto verso" : "Comment pouvons-nous vous aider ?"}
          aria-invalid={touched.subject && !!errors.subject}
          aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
          className={touched.subject && errors.subject ? fieldErrorClass : fieldClass}
        />
        {touched.subject && errors.subject && (
          <p id="subject-error" className="error-message" role="alert" aria-live="polite">
            {errors.subject}
          </p>
        )}
      </label>
      <label className={labelClass}>
        Votre message
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={quote ? "Quantité, format, délai souhaité, finitions…" : "Écrivez votre message…"}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
          className={touched.message && errors.message ? fieldErrorClass : fieldClass}
        />
        {touched.message && errors.message && (
          <p id="message-error" className="error-message" role="alert" aria-live="polite">
            {errors.message}
          </p>
        )}
      </label>

      <label
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
      >
        Ne pas remplir
        <input
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </label>

      {status.type === "error" && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm ring-1 ring-red-200">
          <p className="font-bold text-red-800">{status.message}</p>
          <p className="mt-1 text-red-700">
            Votre demande n’est pas perdue : envoyez-la directement sur WhatsApp.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          disabled={isSending}
          type="submit"
          className="rounded-lg bg-brand-500 px-5 py-3 font-bold text-ink-950 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending
            ? "Envoi en cours…"
            : quote
              ? "Envoyer ma demande de devis"
              : "Envoyer le message"}
        </button>
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-leaf-500 px-5 py-3 font-bold text-ink-950 transition hover:bg-leaf-600"
        >
          Envoyer sur WhatsApp
        </a>
      </div>
    </form>
  );
}
