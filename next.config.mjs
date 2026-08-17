import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withPWA(nextConfig);
