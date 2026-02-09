import { Metadata } from "next";
import { COMPANY_INFO } from "./constants";

export const DEFAULT_SEO_CONFIG = {
    siteName: "YANGIN PERDE",
    siteUrl: "https://yanginperde.com",
    twitterHandle: "@gespera",
    defaultOgImage: "/images/og-default.jpg",
};

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: COMPANY_INFO.name,
        legalName: COMPANY_INFO.legalName,
        url: COMPANY_INFO.website,
        logo: `${DEFAULT_SEO_CONFIG.siteUrl}/images/logo-gespera.png`,
        contactPoint: {
            "@type": "ContactPoint",
            telephone: COMPANY_INFO.phone,
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: COMPANY_INFO.address.street,
            addressLocality: COMPANY_INFO.address.district,
            addressRegion: COMPANY_INFO.address.city,
            addressCountry: COMPANY_INFO.address.country,
        },
        sameAs: [
            COMPANY_INFO.socialMedia.instagram,
            COMPANY_INFO.socialMedia.facebook,
            COMPANY_INFO.socialMedia.linkedin,
            COMPANY_INFO.socialMedia.youtube,
        ].filter(Boolean),
    };
}

export function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: COMPANY_INFO.name,
        image: `${DEFAULT_SEO_CONFIG.siteUrl}/images/logo-gespera.png`,
        "@id": COMPANY_INFO.website,
        url: COMPANY_INFO.website,
        telephone: COMPANY_INFO.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: COMPANY_INFO.address.street,
            addressLocality: COMPANY_INFO.address.district,
            addressRegion: COMPANY_INFO.address.city,
            addressCountry: COMPANY_INFO.address.country,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: COMPANY_INFO.coordinates.lat,
            longitude: COMPANY_INFO.coordinates.lng,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
            },
        ],
        priceRange: "$$",
    };
}

export function generateProductSchema(product: {
    name: string;
    description: string;
    images: string[];
    category: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images.map((img) => `${DEFAULT_SEO_CONFIG.siteUrl}${img}`),
        category: product.category,
        brand: {
            "@type": "Brand",
            name: "YANGIN PERDE",
        },
        manufacturer: {
            "@type": "Organization",
            name: COMPANY_INFO.legalName,
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "TRY",
            seller: {
                "@type": "Organization",
                name: COMPANY_INFO.name,
            },
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${DEFAULT_SEO_CONFIG.siteUrl}${item.url}`,
        })),
    };
}
