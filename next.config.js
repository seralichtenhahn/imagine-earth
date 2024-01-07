/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagine-earth.s3.eu-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
