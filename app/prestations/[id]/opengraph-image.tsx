import { ImageResponse } from "next/og";
import { OgLine } from "@/lib/OgLine";
import { categoryName, formatPrice, getProduct, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const alt = "Prestation PIXEL PRESS — imprimerie numérique au Sénégal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ id: string }> };

export default async function Image({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id) ?? products[0];

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
              background: "linear-gradient(135deg, #0891b2, #2563eb)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 3, display: "block" }}>
            PIXEL PRESS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 26,
              color: "#67e8f9",
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "block",
            }}
          >
            {categoryName(product.category)}
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.1, display: "flex" }}>
            <OgLine gap={18} text={product.name} />
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: 980,
              display: "flex",
            }}
          >
            <OgLine gap={8} text={product.short} />
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
          <OgLine gap={10} text={`dès ${formatPrice(product.price)}`} />
        </div>
      </div>
    ),
    { ...size }
  );
}
