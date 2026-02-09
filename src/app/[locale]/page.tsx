import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
    Hero,
    ProductCategories,
    WhyYanginPerde,
    TechnicalSpecs,
    HowItWorks,
    References,
    CTASection,
    SEOContent,
} from "@/components/sections";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            type: "website",
            locale: locale === "tr" ? "tr_TR" : "en_US",
            siteName: "YANGIN PERDE",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
        },
        alternates: {
            canonical: locale === "tr" ? "https://yanginperde.com" : "https://yanginperde.com/en",
            languages: {
                tr: "https://yanginperde.com",
                en: "https://yanginperde.com/en",
            },
        },
    };
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Hero />
            <WhyYanginPerde />
            <ProductCategories />
            <TechnicalSpecs />
            <HowItWorks />
            <References />
            <CTASection />
            <SEOContent />
        </>
    );
}
