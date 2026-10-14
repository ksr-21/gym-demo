const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three"],
  images: { formats: ["image/avif", "image/webp"], unoptimized: isStaticExport },
  // Static export (GitHub Pages): enabled only via env, Vercel keeps the full server build.
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  }),
};

export default nextConfig;
