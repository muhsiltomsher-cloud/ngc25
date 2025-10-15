import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Enable React Strict Mode for development
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ngc-gold.vercel.app' },
    ],
  },
  async rewrites() {
    return [
      { source: '/products/:id', destination: '/product/:id' },
      { source: '/product-details/:id', destination: '/product/:id' },
    ];
  },
  webpack: (config, { isServer }) => {
    // Ensure support for ES modules in both client and server environments
    if (!isServer) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
    }
    return config;
  },
};

export default nextConfig;

