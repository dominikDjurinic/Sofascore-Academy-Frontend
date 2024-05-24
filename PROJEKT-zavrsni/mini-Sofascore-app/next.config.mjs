import { withKumaUI } from '@kuma-ui/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [{ source: '/api/:path*', destination: 'https://academy-backend.sofascore.dev/:path*' }]
  },
  images: {
    //images load optimization
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'academy-backend.sofascore.dev',
        port: '',
      },
    ],
  },
}

export default withKumaUI(nextConfig)
