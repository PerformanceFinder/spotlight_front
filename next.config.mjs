/** @type {import('next').NextConfig} */
const nextConfig = {
    // Netlify에서 사용할 수 있도록 출력 설정
    output: 'export',
    images: {
        unoptimized: true,
      },
    assetPrefix: '/',
    // API 라우트를 위한 리워이트 설정
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: 'https://artause-spotlight.netlify.app/.netlify/functions/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;