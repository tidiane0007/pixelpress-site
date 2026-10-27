import { ImageResponse } from "next/og";
import { OgLine } from "@/lib/OgLine";
import { siteConfig } from "@/lib/site-config";

export const alt =
  "PIXEL PRESS — imprimerie numérique et personnalisation d'objets au Sénégal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#020617",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #0891b2, #2563eb)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, letterSpacing: 3, display: "block" }}>
            PIXEL PRESS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Satori ne dispose que d'une seule graisse : la hiérarchie vient de la taille et de la couleur. */}
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.08,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <OgLine gap={21} text="Vos idées" />
            <OgLine gap={21} text="prennent vie" />
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#94a3b8",
              lineHeight: 1.35,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <OgLine gap={8} text="Imprimerie numérique & personnalisation d'objets" />
            <OgLine gap={8} text="au Sénégal" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid #1e293b",
            paddingTop: 28,
            fontSize: 28,
            color: "#67e8f9",
          }}
        >
          <div style={{ display: "block" }}>{siteConfig.phoneDisplay}</div>
          <div style={{ display: "block" }}>Devis gratuit</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
