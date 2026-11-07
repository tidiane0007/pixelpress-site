import { siteConfig } from "@/lib/site-config";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  type?: unknown;
  website?: unknown;
  items?: unknown;
};

type ValidContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type?: unknown;
  website?: unknown;
  items: QuoteItem[];
};

type QuoteItem = { name: string; quantity: number; options?: string[] };

const isText = (value: unknown, maxLength: number) =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

const isHoneypotEmpty = (value: unknown) =>
  typeof value !== "string" || value.trim().length === 0;

const isQuoteItem = (value: unknown): value is QuoteItem => {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<QuoteItem>;
  return (
    typeof item.name === "string" &&
    item.name.length <= 180 &&
    Number.isInteger(item.quantity) &&
    (item.quantity as number) > 0 &&
    (item.options === undefined ||
      (item.options.length <= 10 && item.options.every((option) => typeof option === "string" && option.length <= 120)))
  );
};

const hasValidFields = (payload: ContactPayload): payload is ValidContactPayload =>
  isText(payload.name, 120) &&
  isText(payload.email, 254) &&
  isText(payload.phone, 40) &&
  isText(payload.subject, 180) &&
  isText(payload.message, 5000) &&
  (payload.items === undefined || (Array.isArray(payload.items) && payload.items.every(isQuoteItem)));

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

/** Mieux qu'un clapet, pas un barrage : la `Map` vit dans l'instance de la fonction.
    Sur Vercel, chaque région froide repart à zéro et un robot malin qui répartit ses
    requêtes n'est jamais compté ensemble. Ce qui écarte vraiment le spam, c'est le
    honeypot et le contrôle d'origine ci-dessous ; celui-ci ne fait que ralentir
    l'élève qui martèle le même bouton depuis le même téléphone. */
async function isRateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "inconnu";
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

/** Un POST qui ne vient pas d'une page de ce site n'a aucune raison d'être traité :
    ce sont les formulaires copiés-collés et les robots qui tapent l'URL en direct.
    Absence d'en-tête = on laisse passer, `curl` et certains navigateurs en mode strict
    n'en envoient pas — le honeypot reste le premier filtre. */
function sameOrigin(request: Request) {
  const brut = request.headers.get("origin") ?? request.headers.get("referer");
  if (!brut) return true;
  try {
    return new URL(brut).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Une ligne par demande, pour que la question « est-ce que le formulaire travaille ? »
    ait une réponse même sans e-mail. Rien d'identifiant dedans : ni nom, ni adresse, ni
    message. Les journaux d'un hébergeur sont lisibles par tout le projet et survivent au
    dépôt, contrairement à la messagerie d'un particulier. */
function journaliser(issue: string, payload: ContactPayload) {
  console.log(JSON.stringify({
    evt: "contact",
    issue,
    robot: !isHoneypotEmpty(payload.website),
    lignes: Array.isArray(payload.items) ? payload.items.length : 0,
  }));
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    journaliser("origine", {});
    return Response.json({ message: "Requête rejetée : envoyez votre demande depuis le site." }, { status: 403 });
  }

  let payload: ContactPayload;
  try { payload = await request.json(); } catch {
    journaliser("corps invalide", {});
    return Response.json({ message: "Données de formulaire invalides." }, { status: 400 });
  }

  // Un robot qui remplit le champ dissimulé est écarté sans lui révéler qu'il a été détecté.
  if (!isHoneypotEmpty(payload.website)) {
    journaliser("honeypot", payload);
    return Response.json({ message: "Message envoyé." }, { status: 200 });
  }

  if (!hasValidFields(payload)) {
    journaliser("champs", payload);
    return Response.json({ message: "Veuillez remplir tous les champs correctement." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    journaliser("email", payload);
    return Response.json({ message: "Veuillez saisir une adresse e-mail valide." }, { status: 400 });
  }
  if (await isRateLimited(request)) {
    journaliser("limiteur", payload);
    return Response.json({ message: "Trop de demandes d'affilée. Patientez une minute ou écrivez-nous sur WhatsApp." }, { status: 429 });
  }

  const items = (payload.items ?? []).slice(0, 20);
  const emailText = [
    `Type : ${typeof payload.type === "string" ? payload.type : "Message de contact"}`,
    `Nom : ${payload.name.trim()}`,
    `E-mail : ${payload.email.trim()}`,
    `Téléphone : ${payload.phone.trim()}`,
    `Objet : ${payload.subject.trim()}`,
    ...(items.length
      ? [
          "",
          "Prestations sélectionnées :",
          ...items.map((item) => {
            const options = item.options?.filter(Boolean);
            return options?.length
              ? `- ${item.name} × ${item.quantity} (${options.join(", ")})`
              : `- ${item.name} × ${item.quantity}`;
          }),
        ]
      : []),
    "",
    payload.message.trim(),
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    journaliser("503 sans clé", payload);
    return Response.json({ message: "Le service d'e-mail n'est pas encore configuré. Envoyez votre demande sur WhatsApp." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [siteConfig.email], reply_to: payload.email.trim(), subject: `[PIXEL PRESS] ${payload.subject.trim()}`, text: emailText }),
  });
  if (!response.ok) {
    journaliser("502 resend", payload);
    console.error("Resend contact-form error", await response.text());
    return Response.json({ message: "Le message n'a pas pu être envoyé. Réessayez ou contactez-nous sur WhatsApp." }, { status: 502 });
  }
  journaliser("envoyé", payload);
  return Response.json({ message: "Message envoyé." }, { status: 200 });
}
