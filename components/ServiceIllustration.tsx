import type { ReactNode } from "react";

type ServiceIllustrationProps = {
  serviceId: string;
  label: string;
  className?: string;
};

type IllustrationFrameProps = Omit<ServiceIllustrationProps, "serviceId"> & {
  children: ReactNode;
};

const IllustrationFrame = ({ children, label, className = "" }: IllustrationFrameProps) => (
  <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-950 ${className}`} role="img" aria-label={`Illustration : ${label}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(34,211,238,0.35),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(74,222,128,0.24),transparent_36%)]" />
    {children}
    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/45 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-white backdrop-blur">PIXEL PRESS</span>
  </div>
);

export default function ServiceIllustration({ serviceId, label, className }: ServiceIllustrationProps) {
  const common = { label, className };

  switch (serviceId) {
    case "1":
      return <IllustrationFrame {...common}><svg viewBox="0 0 240 180" className="relative h-[84%] w-[84%]" aria-hidden="true"><path d="M78 37 103 23h34l25 14 28 34-24 20-16-16v75H110V75L94 91 68 71z" fill="#22d3ee"/><path d="M104 24h32l13 9-13 21h-32L91 33z" fill="#4ade80"/><path d="M111 80h18v32h-18z" fill="#082f49"/><circle cx="148" cy="104" r="16" fill="#f8fafc" opacity=".9"/><path d="m141 104 5 5 10-12" fill="none" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg></IllustrationFrame>;
    case "2":
      return <IllustrationFrame {...common}><svg viewBox="0 0 240 180" className="relative h-[84%] w-[84%]" aria-hidden="true"><rect x="68" y="30" width="92" height="122" rx="7" fill="#f8fafc" transform="rotate(-8 114 91)"/><rect x="85" y="26" width="92" height="122" rx="7" fill="#22d3ee" transform="rotate(8 131 87)"/><rect x="103" y="54" width="56" height="12" rx="6" fill="#082f49"/><rect x="103" y="75" width="40" height="7" rx="3.5" fill="#f8fafc"/><rect x="103" y="91" width="51" height="7" rx="3.5" fill="#f8fafc"/><circle cx="145" cy="122" r="17" fill="#4ade80"/></svg></IllustrationFrame>;
    case "3":
      return <IllustrationFrame {...common}><svg viewBox="0 0 240 180" className="relative h-[84%] w-[84%]" aria-hidden="true"><path d="M75 48h83v83c0 14-11 25-25 25h-33c-14 0-25-11-25-25z" fill="#f8fafc"/><path d="M158 70h15c18 0 27 12 27 28s-9 28-27 28h-15" fill="none" stroke="#f8fafc" strokeWidth="12"/><path d="M87 59h60v14H87z" fill="#22d3ee"/><circle cx="117" cy="106" r="20" fill="#4ade80"/><path d="M108 106h18M117 97v18" stroke="#082f49" strokeWidth="5" strokeLinecap="round"/></svg></IllustrationFrame>;
    case "4":
      return <IllustrationFrame {...common}><svg viewBox="0 0 240 180" className="relative h-[84%] w-[84%]" aria-hidden="true"><rect x="55" y="62" width="128" height="76" rx="9" fill="#f8fafc" transform="rotate(-7 119 100)"/><rect x="63" y="43" width="128" height="76" rx="9" fill="#22d3ee" transform="rotate(8 127 81)"/><rect x="91" y="62" width="63" height="12" rx="6" fill="#082f49"/><rect x="91" y="83" width="45" height="7" rx="3.5" fill="#f8fafc"/><rect x="91" y="98" width="57" height="7" rx="3.5" fill="#f8fafc"/><circle cx="171" cy="110" r="15" fill="#4ade80"/></svg></IllustrationFrame>;
    case "5":
      return <IllustrationFrame {...common}><svg viewBox="0 0 240 180" className="relative h-[84%] w-[84%]" aria-hidden="true"><path d="M97 24h68v110H97z" fill="#22d3ee"/><path d="M105 35h52v33h-52z" fill="#082f49"/><path d="M105 78h52v44h-52z" fill="#4ade80"/><path d="M87 145h88l-12-15h-64z" fill="#f8fafc"/><path d="M120 47h23M112 91h38M112 103h29" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round"/></svg></IllustrationFrame>;
    default:
      return <IllustrationFrame {...common}><svg viewBox="0 0 240 180" className="relative h-[84%] w-[84%]" aria-hidden="true"><path d="M33 48h174v88H33z" fill="#22d3ee"/><path d="M47 63h146v58H47z" fill="#082f49"/><circle cx="76" cy="92" r="16" fill="#4ade80"/><path d="M106 79h61M106 94h48M106 109h56" stroke="#f8fafc" strokeWidth="7" strokeLinecap="round"/><path d="M22 145h196" stroke="#f8fafc" strokeWidth="9" strokeLinecap="round"/></svg></IllustrationFrame>;
  }
}
