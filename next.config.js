/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'your-image-domain.com'], // Add any other image domains you use
  },
  typescript: {
    ignoreBuildErrors: true, // Only if you want to deploy with type errors
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
}

module.exports = nextConfig 