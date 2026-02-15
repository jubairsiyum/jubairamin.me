/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      { hostname: "icons.duckduckgo.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "www.google.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "cdn.jsdelivr.net" },
      { hostname: "cdn.simpleicons.org" },
    ],
  },
  async headers() {
    return [
      {
        source: '/resume.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Content-Disposition',
            value: 'inline; filename="Jubair-Siyum-Resume.pdf"',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
