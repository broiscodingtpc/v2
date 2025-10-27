/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  },
  images: {
    domains: ['localhost', 'api.dexscreener.com', 'pbs.twimg.com'],
  },
  transpilePackages: ['@metapulse/shared', '@metapulse/ui'],
}

module.exports = nextConfig