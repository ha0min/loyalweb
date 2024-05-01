const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages:[
    "antd",
    "@ant-design/plots",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-list",
    "@ant-design/pro-descriptions",
    "@ant-design/pro-form",
    "@ant-design/pro-skeleton",
    "@ant-design/pro-field",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "@ant-design/pro-card",
    "@ant-design/pro-table",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-tooltip"
  ],
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'https://mock.apifox.com/m1/3497852-0-default'}/:path*`,
      },
    ]
  },
});
