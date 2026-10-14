/** Prefix for assets when the site is served from a sub-path (e.g. GitHub Pages). Empty otherwise. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Static-export builds have no server, so /api routes are unavailable. */
export const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

export const withBase = (path: string): string => `${BASE_PATH}${path}`;

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}
