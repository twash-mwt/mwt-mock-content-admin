/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      typedRoutes: true,
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    }
}

module.exports = nextConfig
