/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Configuración para desactivar las advertencias en modo desarrollo
      config.devServer = {
        compress: true,
        clientLogLevel: 'none',
      };
    }
    return config;
  },
};

module.exports = nextConfig;