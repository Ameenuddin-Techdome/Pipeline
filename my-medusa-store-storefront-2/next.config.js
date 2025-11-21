const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "uplifting-diamond-cb9dfdd08c.strapiapp.com",
      "medusa.test.techdomeaks.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "uplifting-diamond-cb9dfdd08c.media.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "uplifting-diamond-cb9dfdd08c.strapiapp.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa.test.techdomeaks.com", 
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL,
    NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION || "us",
  },
}

module.exports = nextConfig
