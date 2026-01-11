import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CORS headers for mobile app API access
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            // In production, restrict to specific mobile app origins/deep links
            // For development, allow all origins
            value: process.env.NODE_ENV === "production"
              ? (process.env.ALLOWED_ORIGINS || "*")
              : "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization, Content-Type, X-Client-Type, X-App-Version, X-Device-Id",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400", // 24 hours preflight cache
          },
        ],
      },
    ];
  },
};

export default nextConfig;
