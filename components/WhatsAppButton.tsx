import { siteConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire à PIXEL PRESS sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
    >
      <span aria-hidden="true" className="text-lg">◉</span> WhatsApp
    </a>
  );
}
