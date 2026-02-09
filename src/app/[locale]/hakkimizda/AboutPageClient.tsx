"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@/lib/constants";
import { Locale } from "@/i18n/config";

interface AboutPageClientProps {
    locale: Locale;
}

const VALUE_KEYS = [
    "architectural",
    "projectSpecific",
    "qualityStandard",
    "collaboration",
    "sustainability",
    "afterDelivery",
] as const;

export default function AboutPageClient({ locale }: AboutPageClientProps) {
    const t = useTranslations("about");

    return (
        <div className="bg-cream">
            {/* Hero - diğer sayfalardaki gibi dalgalı yapı */}
            <section className="relative min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/gespera/products.webp"
                        alt="Hakkımızda"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
                </div>
                <div className="relative z-10 h-full">
                    <div className="container h-full">
                        <div className="flex items-center min-h-[65vh] lg:min-h-[70vh] py-20 lg:py-24">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-3xl"
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-anthracite-dark leading-tight mb-6">
                                    {t("title")}
                                </h1>
                                <p className="text-lg md:text-xl text-anthracite leading-relaxed">
                                    {t("subtitle")}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Dalga - İletişim / İç Mekan ile aynı */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        className="w-full h-20 md:h-28 lg:h-36"
                    >
                        <defs>
                            <linearGradient id="aboutWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

            {/* 25 yıl tecrübe vurgusu */}
            <section className="bg-cream border-y border-anthracite/10">
                <div className="container py-8 md:py-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center sm:text-left"
                    >
                        <span className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-anthracite-dark tabular-nums tracking-tight">
                            {t("experienceYears")}
                        </span>
                        <span className="text-lg md:text-xl lg:text-2xl text-anthracite font-medium">
                            {t("experienceLabel")}
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Ana içerik - metin paragrafları (cream ile dalgadan yumuşak geçiş) */}
            <section className="py-16 md:py-24 bg-cream">
                <div className="container max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 text-anthracite leading-relaxed text-base md:text-lg"
                    >
                        {([1, 2, 3, 4, 5, 6] as const).map((i) => (
                            <p key={i}>{t(`story.p${i}`)}</p>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Değerler & Çalışma Prensiplerimiz - 6 kart */}
            <section className="py-16 md:py-24 bg-cream">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-anthracite-dark mb-2">
                            {t("valuesSection.title")}
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    >
                        {VALUE_KEYS.map((key) => (
                            <motion.div
                                key={key}
                                variants={FADE_IN_UP}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border-muted/50 hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-xl font-display font-medium text-anthracite-dark mb-4">
                                    {t(`valuesSection.${key}.title`)}
                                </h3>
                                <p className="text-text-muted leading-relaxed text-sm md:text-base">
                                    {t(`valuesSection.${key}.content`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
