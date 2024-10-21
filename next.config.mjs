/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    domains: [
      // Uncomment if needed
      // 'admin.upturnist.com',
      'localhost',
      'admin.chuchoterqatar.com',
      'demo.chuchoterqatar.com',
      'chuchoterqatar.com',
      'greenenergyfarm.in',
    ],
  },
  
  i18n: {
    locales: ['en', 'ar'], // Supported locales
    defaultLocale: 'en', // Default locale
  },

  // Uncomment and customize if you need redirects
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
