const path = require('path');

const nextConfig = {
  reactStrictMode: false,
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
  transpilePackages: ['polotno'],
  webpack: (config, { isServer }) => {
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

module.exports = nextConfig;
