/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastlane.tools',
        port: '',
        pathname: '/assets/images/**',
      },
    ],
  },
  // ... diğer mevcut konfigürasyonlar
}

module.exports = nextConfig 