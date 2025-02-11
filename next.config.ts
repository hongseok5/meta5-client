import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: false,
  },
  reactStrictMode: false, // React Strict Mode 비활성화
};

export default nextConfig;
