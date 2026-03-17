import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
    return [
      // Auth for frontend
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },

      // Logic requests to the backend
      // {
      //   source: '/api/:path*',
      //   destination: `${process.env.BACKEND_URL}/:path*`,
      // },
    ]
  },
}

export default nextConfig;
