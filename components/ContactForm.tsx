"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = { quote?: boolean };

const initialValues = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm({ quote = false }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: quote ? "Demande de devis" : "Message de contact" }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "L'envoi a échoué.");
      setStatus({ type: "success", message: "Votre message a bien été envoyé. Nous vous répondrons rapidement." });
      setValues(initialValues);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "L'envoi a échoué. Réessayez plus tard." });
    } finally {
      setIsSending(false);
    }
  }

  const update = (key: keyof typeof initialValues, value: string) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Nom complet<input required value={values.name} onChange={(e) => update("name", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Téléphone<input required type="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">E-mail<input required type="email" value={values.email} onChange={(e) => update("email", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">{quote ? "Prestation souhaitée" : "Objet"}<input required value={values.subject} onChange={(e) => update("subject", e.target.value)} placeholder={quote ? "Ex. 500 flyers A5, recto verso" : "Comment pouvons-nous vous aider ?"} className="rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Votre message<textarea required rows={5} value={values.message} onChange={(e) => update("message", e.target.value)} placeholder={quote ? "Quantité, format, délai souhaité, finitions…" : "Écrivez votre message…"} className="rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>
      {status.type !== "idle" && <p role="status" className={status.type === "success" ? "text-sm text-emerald-700" : "text-sm text-red-700"}>{status.message}</p>}
      <button disabled={isSending} type="submit" className="rounded-lg bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">{isSending ? "Envoi en cours…" : quote ? "Envoyer ma demande de devis" : "Envoyer le message"}</button>
    </form>
  );
}
