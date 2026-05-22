import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hjn88qj8d6.ufs.sh', // Il tuo hostname specifico di UploadThing
        port: '',
        pathname: '/f/**', // Autorizza tutti i file nella cartella /f/
      },
    ],
  },
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    }
  }
};

const withNextIntl = createNextIntlPlugin();

// export default nextConfig;
export default withNextIntl(nextConfig);
