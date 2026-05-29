/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude the event photo folders from serverless function bundles.
  // These are static files served directly from public/ — they must NOT be
  // traced into the 300 MB Vercel function limit.
  outputFileTracingExcludes: {
    "*": ["./public/images/events/**/*"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" }
    ]
  }
};

module.exports = nextConfig;
