/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    domains: [
      //'admin.upturnist.com',
      'localhost',
      'admin.chuchoterqatar.com',
      'demo.chuchoterqatar.com',
      'chuchoterqatar.com',
      'greenenergyfarm.in',
    ],
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
