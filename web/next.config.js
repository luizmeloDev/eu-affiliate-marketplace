/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '**.amazon.com' },
      { hostname: '**.amazon.de' },
      { hostname: '**.amazon.co.uk' },
      { hostname: '**.amazon.fr' },
      { hostname: '**.amazon.it' },
      { hostname: '**.amazon.es' },
      { hostname: '**.amazon.nl' },
      { hostname: '**.media-amazon.com' },
      { hostname: '**.ssl-images-amazon.com' },
      { hostname: '**.ebayimg.com' },
      { hostname: '**.asos-media.com' },
      { hostname: '**.zalando.com' },
      { hostname: '**.zalando.de' },
      { hostname: '**.thomann.de' },
      { hostname: '**.otto.de' },
      { hostname: '**.mediamarkt.de' },
      { hostname: '**.saturn.de' },
      { hostname: '**' }
    ],
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, x-api-key' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
