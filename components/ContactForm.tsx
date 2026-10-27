"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppUrl } from "@/lib/site-config";

type ContactFormProps = { quote?: boolean };

const initialValues = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

type Status =
  | { type: "idle" }
  | { type: "success" }
  | { type: "error"; message: string };

const fieldClass =
  "rounded-lg border border-ink-200 px-3 py-2.5 font-normal outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100";
const labelClass = "grid gap-2 text-sm font-semibold text-ink-700";

export default function ContactForm({ quote = false }: ContactFormProps) {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [isSending, setIsSending] = useState(false);

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
      if (quote) clearCart();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "L'envoi a échoué. Réessayez plus tard.",
      });
    } finally {
      setIsSending(false);
    }
  }

  const update = (key: keyof typeof initialValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  if (status.type === "success") {
    return (
      <div
        role="status"
        className="grid gap-4 rounded-2xl bg-leaf-500/10 p-6 ring-1 ring-leaf-400/40 sm:p-8"
      >
        <p className="text-lg font-black text-leaf-600">
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
            className="rounded-lg bg-leaf-500 px-5 py-3 font-bold text-white transition hover:bg-leaf-600"
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
      onSubmit={handleSubmit}
      className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-200 sm:p-8"
    >
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
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Téléphone
          <input
            required
            type="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </label>
      </div>
      <label className={labelClass}>
        E-mail
        <input
          required
          type="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className={labelClass}>
        {quote ? "Prestation souhaitée" : "Objet"}
        <input
          required
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          placeholder={quote ? "Ex. 500 flyers A5, recto verso" : "Comment pouvons-nous vous aider ?"}
          className={fieldClass}
        />
      </label>
      <label className={labelClass}>
        Votre message
        <textarea
          required
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={quote ? "Quantité, format, délai souhaité, finitions…" : "Écrivez votre message…"}
          className={fieldClass}
        />
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
          className="rounded-lg bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
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
          className="rounded-lg bg-leaf-500 px-5 py-3 font-bold text-white transition hover:bg-leaf-600"
        >
          Envoyer sur WhatsApp
        </a>
      </div>
    </form>
  );
}
