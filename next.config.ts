import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: false,
  },
  reactStrictMode: false, // React Strict Mode 비활성화
  eslint: {
    // ESLint 규칙 비활성화
    ignoreDuringBuilds: true, // 빌드 시 ESLint 규칙을 무시
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류를 빌드 시 무시 (선택 사항)
  },
};

export default nextConfig;
