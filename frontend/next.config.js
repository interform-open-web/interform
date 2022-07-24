/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  resolve: {
    fallback: {
      "fs": false
    },
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  exportTrailingSlash: true,
};

module.exports = nextConfig;
