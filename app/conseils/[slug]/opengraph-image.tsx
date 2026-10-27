import { ImageResponse } from "next/og";
import { articles, getArticle } from "@/lib/articles";
import { OgLine } from "@/lib/OgLine";
import { siteConfig } from "@/lib/site-config";

export const alt = "Conseils d’impression — PIXEL PRESS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug) ?? articles[0];

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
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #0891b2, #20c0e0)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 3, display: "block" }}>PIXEL PRESS</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 24,
              color: "#67e8f9",
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "block",
            }}
          >
            {article.category}
          </div>
          {/* Satori ne rend qu'une graisse : la hiérarchie se fait par la taille et la couleur. */}
          <div style={{ fontSize: 58, lineHeight: 1.15, maxWidth: 1000, display: "flex" }}>
            <OgLine gap={15} text={article.title} />
          </div>
          <div style={{ fontSize: 28, color: "#94a3b8", lineHeight: 1.4, maxWidth: 1000, display: "flex" }}>
            <OgLine gap={8} text="Les repères de l’atelier avant de commander" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid #1e293b",
            paddingTop: 28,
            fontSize: 26,
            color: "#67e8f9",
          }}
        >
          <div style={{ display: "block" }}>{siteConfig.phoneDisplay}</div>
          <div style={{ display: "block" }}>{`${article.minutes} min de lecture`}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
