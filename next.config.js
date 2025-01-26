/** @type {import('next').NextConfig} */
import "./env.mjs";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
};

export default nextConfig;
