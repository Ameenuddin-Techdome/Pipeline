/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVED: output: 'standalone' - This is causing the SSR issue
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: false,
  },
}

module.exports = nextConfig
