import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — gym in ${siteConfig.area}, ${siteConfig.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0d0d0d",
          color: "#f4f1ea",
          borderLeft: `24px solid ${siteConfig.brand.accent}`,
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: 12 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 56, marginTop: 24, color: siteConfig.brand.accent, fontWeight: 800 }}>{siteConfig.headline.join(" ")}</div>
        <div style={{ fontSize: 32, marginTop: 36, color: "#a1a1a1" }}>
          Gym in {siteConfig.area}, {siteConfig.city} · Book a free trial
        </div>
      </div>
    ),
    size,
  );
}
