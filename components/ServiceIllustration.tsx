import Image from "next/image";

type ServiceIllustrationProps = {
  serviceId: string;
  label: string;
  className?: string;
};

const photoByService: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1773525911808-8a2cfd11cbc4?auto=format&fit=crop&q=85&w=1200",
  "2": "https://images.unsplash.com/photo-1773525911808-8a2cfd11cbc4?auto=format&fit=crop&q=85&w=1200",
  "3": "https://images.unsplash.com/photo-1579283268886-824b0d80166a?auto=format&fit=crop&q=85&w=1200",
  "4": "https://images.unsplash.com/photo-1623305463957-df17547327cb?auto=format&fit=crop&q=85&w=1200",
  "5": "https://images.unsplash.com/photo-1770017863955-56a1501a3c93?auto=format&fit=crop&q=85&w=1200",
  "6": "https://images.unsplash.com/photo-1770017863955-56a1501a3c93?auto=format&fit=crop&q=85&w=1200",
};

const categoryByService: Record<string, string> = {
  "1": "Impression textile",
  "2": "Flyers & dépliants",
  "3": "Mugs personnalisés",
  "4": "Cartes de visite",
  "5": "Grand format",
  "6": "Bâches & affiches",
};

export default function ServiceIllustration({ serviceId, label, className = "" }: ServiceIllustrationProps) {
  const image = photoByService[serviceId] ?? photoByService["6"];
  const category = categoryByService[serviceId] ?? "Impression numérique";

  return (
  <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-950 ${className}`} role="img" aria-label={`Illustration : ${label}`}>
    <Image src={image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-slate-950/20" />
    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-slate-950/60 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-white backdrop-blur">PIXEL PRESS</span>
    <span className="absolute bottom-4 left-4 right-4 text-lg font-black text-white drop-shadow-sm">{category}</span>
  </div>
  );
}
