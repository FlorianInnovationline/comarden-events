/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Event photos live in public/images/events/ — they are static files served
  // by Vercel's CDN and must not be bundled into serverless functions.
  // outputFileTracingExcludes is placed under experimental for Next.js 14.2.x
  // compatibility. With photos compressed to <1 MB each (9 MB total) this is
  // mostly belt-and-suspenders — the bundle is well under the 300 MB limit.
  experimental: {
    outputFileTracingExcludes: {
      "*": ["./public/images/events/**/*"],
    },
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
