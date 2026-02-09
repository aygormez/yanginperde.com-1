import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Barlow, Oswald, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header, Footer } from "@/components/layout";
import { COMPANY_INFO } from "@/lib/constants";
import "../globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gespera.com";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/images/gespera/favicon.webp", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-icon.svg",
    },
};

// Organization Schema for SEO
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GESPERA", // TODO: Update to YANGIN PERDE later
    legalName: COMPANY_INFO.legalName,
    url: "https://gespera.com",
    logo: "https://gespera.com/images/logo-gespera.png",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.phone,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["Turkish", "English"],
    },
    address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.district,
        addressRegion: COMPANY_INFO.address.city,
        addressCountry: "TR",
    },
    sameAs: [
        COMPANY_INFO.socialMedia.instagram,
        COMPANY_INFO.socialMedia.facebook,
        COMPANY_INFO.socialMedia.linkedin,
        COMPANY_INFO.socialMedia.youtube,
    ].filter(Boolean),
};

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-barlow",
    display: "swap",
});

const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald",
    display: "swap",
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the locale
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${barlow.variable} ${oswald.variable} ${jetbrains.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className="font-sans antialiased">
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main id="main-content">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
