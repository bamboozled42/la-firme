/** @type {import('next').NextConfig} */

await import("./env.mjs");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname]
  }
};

export default nextConfig;
