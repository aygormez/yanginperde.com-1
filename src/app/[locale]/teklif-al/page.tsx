import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { QuoteForm } from "@/components/shared";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "quote.meta" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function QuotePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("quote");

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section - İletişim sayfası ile aynı yapı */}
            <section className="relative min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
                {/* Full Width Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/gespera/teklif-hero.webp"
                        alt={`${t("title")} - GESPERA`}
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full">
                    <div className="container h-full">
                        <div className="flex items-center min-h-[65vh] lg:min-h-[70vh] py-20 lg:py-24">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-anthracite-dark leading-tight mb-6">
                                    {t("title")}
                                </h1>
                                <p className="text-lg md:text-xl text-anthracite leading-relaxed">
                                    {t("subtitle")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modern Wave - Diğer sayfalardaki gibi */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        className="w-full h-20 md:h-28 lg:h-36"
                    >
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F5F1EB" />
                                <stop offset="50%" stopColor="#EDE8E0" />
                                <stop offset="100%" stopColor="#F5F1EB" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,70 Q360,30 720,50 T1440,40 L1440,120 L0,120 Z"
                            fill="#E8E3DB"
                            opacity="0.6"
                        />
                        <path
                            d="M0,60 Q280,90 560,50 Q840,10 1120,50 Q1280,70 1440,45 L1440,120 L0,120 Z"
                            fill="#EDE8E0"
                            opacity="0.8"
                        />
                        <path
                            d="M0,80 Q200,60 400,70 Q600,80 800,55 Q1000,30 1200,60 Q1320,75 1440,50 L1440,120 L0,120 Z"
                            fill="#F5F1EB"
                        />
                    </svg>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <QuoteForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
