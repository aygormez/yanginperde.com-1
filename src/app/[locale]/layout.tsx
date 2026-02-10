import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header, Footer } from "@/components/layout";
import { COMPANY_INFO } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yanginperde.com";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-icon.svg",
    },
};

// Organization Schema for SEO
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YANGIN PERDE",
    legalName: COMPANY_INFO.legalName,
    url: "https://yanginperde.com",
    logo: "https://yanginperde.com/images/logo.svg",
    contactPoint: {
        "@type": "ContactPoint",
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
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <NextIntlClientProvider messages={messages}>
                <Header />
                <main id="main-content">{children}</main>
                <Footer />
            </NextIntlClientProvider>
        </>
    );
}
