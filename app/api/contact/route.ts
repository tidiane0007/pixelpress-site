import { siteConfig } from "@/lib/site-config";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  type?: unknown;
};

type ValidContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type?: unknown;
};

const isText = (value: unknown, maxLength: number) => typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
const hasValidFields = (payload: ContactPayload): payload is ValidContactPayload =>
  isText(payload.name, 120) && isText(payload.email, 254) && isText(payload.phone, 40) && isText(payload.subject, 180) && isText(payload.message, 5000);

export async function POST(request: Request) {
  let payload: ContactPayload;
  try { payload = await request.json(); } catch { return Response.json({ message: "Données de formulaire invalides." }, { status: 400 }); }

  if (!hasValidFields(payload)) {
    return Response.json({ message: "Veuillez remplir tous les champs correctement." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    return Response.json({ message: "Veuillez saisir une adresse e-mail valide." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ message: "Le service d'e-mail n'est pas encore configuré. Contactez PIXEL PRESS par WhatsApp ou téléphone." }, { status: 503 });
  }

  const emailText = [
    `Type : ${typeof payload.type === "string" ? payload.type : "Message de contact"}`,
    `Nom : ${payload.name.trim()}`,
    `E-mail : ${payload.email.trim()}`,
    `Téléphone : ${payload.phone.trim()}`,
    `Objet : ${payload.subject.trim()}`,
    "",
    payload.message.trim(),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [siteConfig.email], reply_to: payload.email.trim(), subject: `[PIXEL PRESS] ${payload.subject.trim()}`, text: emailText }),
  });
  if (!response.ok) {
    console.error("Resend contact-form error", await response.text());
    return Response.json({ message: "Le message n'a pas pu être envoyé. Réessayez ou contactez-nous sur WhatsApp." }, { status: 502 });
  }
  return Response.json({ message: "Message envoyé." }, { status: 200 });
}
