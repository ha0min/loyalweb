const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'https://mock.apifox.com/m1/3497852-0-default/',
      },
    ]
  },
});
