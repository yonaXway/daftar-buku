/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Pastikan file SQLite ikut terbawa ke serverless function di Vercel
    outputFileTracingIncludes: {
      "/**": ["./prisma/dev.db"],
    },
  },
};

export default nextConfig;
