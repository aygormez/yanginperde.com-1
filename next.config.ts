import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
    // Image optimization
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },

    // Performance optimizations
    experimental: {
        optimizePackageImports: ["framer-motion"],
    },

    // Strict mode for development
    reactStrictMode: true,

    // Skip proxy URL normalization to prevent redirect loops behind proxy
    skipProxyUrlNormalize: true,

    // Redirects for moved/merged pages
    async redirects() {
        return [
            // Image redirects (Old formats to WebP)
            {
                source: "/images/gespera/:path*(.jpg|.jpeg|.png)",
                destination: "/images/gespera/:path*.webp",
                permanent: true,
            },
            // Product redirects (Turkish / Default)
            {
                source: "/urunler/ahsap-jaluzi-perde",
                destination: "/urunler/jaluzi-perde",
                permanent: true,
            },
            {
                source: "/urunler/aluminyum-jaluzi-perde",
                destination: "/urunler/jaluzi-perde",
                permanent: true,
            },
            // Product redirects (With Locale Prefixes)
            {
                source: "/:locale(tr|en|de|es|fr|ar)/urunler/ahsap-jaluzi-perde",
                destination: "/:locale/urunler/jaluzi-perde",
                permanent: true,
            },
            {
                source: "/:locale(tr|en|de|es|fr|ar)/urunler/aluminyum-jaluzi-perde",
                destination: "/:locale/urunler/jaluzi-perde",
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
