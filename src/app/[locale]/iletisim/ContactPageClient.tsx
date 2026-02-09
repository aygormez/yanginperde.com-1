"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { COMPANY_INFO, FADE_IN_UP, STAGGER_CONTAINER } from "@/lib/constants";
import { getFullAddress, formatPhoneLink } from "@/lib/utils";
import { ContactForm } from "@/components/shared";
import { Locale } from "@/i18n/config";

interface ContactPageClientProps {
    locale: Locale;
}

const contactMethods = [
    {
        key: "address",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
    {
        key: "phone",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
    },
    {
        key: "email",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

export default function ContactPageClient({ locale }: ContactPageClientProps) {
    const t = useTranslations("contact");

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section - Anasayfa gibi dalgalı yapı */}
            <section className="relative min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
                {/* Full Width Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/gespera/stor-perdeler.webp"
                        alt="Bize ulaşın - GESPERA stor perde çözümleri, gölgelendirme sistemleri"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
                </div>

                {/* Content - solda, Hakkımızda hero ile aynı düzen */}
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

                {/* Modern Wave - Anasayfa gibi */}
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

            {/* Contact Info Strip */}
            <section className="relative z-10 pt-8 lg:pt-12">
                <div className="container">
                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {/* Address */}
                        <motion.div
                            variants={FADE_IN_UP}
                            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-muted/50"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary" style={{ color: '#8B7355' }}>
                                {contactMethods[0].icon}
                            </div>
                            <h4 className="font-semibold text-text-dark mb-2">
                                {locale === "tr" ? "Adres" : "Address"}
                            </h4>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {getFullAddress(COMPANY_INFO.address)}
                            </p>
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                            variants={FADE_IN_UP}
                            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-muted/50"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary" style={{ color: '#8B7355' }}>
                                {contactMethods[1].icon}
                            </div>
                            <h4 className="font-semibold text-text-dark mb-2">
                                {locale === "tr" ? "Telefon" : "Phone"}
                            </h4>
                            <p className="text-sm text-text-muted">
                                <a href={`tel:${formatPhoneLink(COMPANY_INFO.phone)}`} className="hover:opacity-80 transition-colors block" style={{ color: '#8B7355' }}>
                                    {COMPANY_INFO.phone}
                                </a>
                            </p>
                            <p className="text-sm text-text-muted">
                                <a href={`tel:${formatPhoneLink(COMPANY_INFO.mobile)}`} className="hover:opacity-80 transition-colors block" style={{ color: '#8B7355' }}>
                                    {COMPANY_INFO.mobile}
                                </a>
                            </p>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            variants={FADE_IN_UP}
                            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-muted/50"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary" style={{ color: '#8B7355' }}>
                                {contactMethods[2].icon}
                            </div>
                            <h4 className="font-semibold text-text-dark mb-2">
                                {locale === "tr" ? "E-posta" : "Email"}
                            </h4>
                            <p className="text-sm text-text-muted">
                                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:opacity-80 transition-colors" style={{ color: '#8B7355' }}>
                                    {COMPANY_INFO.email}
                                </a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col"
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark mb-4">
                                {t("getInTouch")}
                            </h2>
                            <p className="text-text-muted mb-8">
                                {locale === "tr"
                                    ? "Sorularınız için formu doldurun, en kısa sürede size dönüş yapalım."
                                    : "Fill out the form with your questions and we'll get back to you as soon as possible."}
                            </p>

                            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border-muted/50 flex-1 min-h-0">
                                <ContactForm />
                            </div>
                        </motion.div>

                        {/* Bizi Ziyaret Edin + Google Maps (form ile aynı yükseklikte) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col min-h-[400px] lg:min-h-0"
                        >
                            <div className="mb-4">
                                <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark">
                                    {locale === "tr" ? "Bizi Ziyaret Edin" : "Visit Us"}
                                </h2>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-sm border border-border-muted/50 bg-white flex-1 min-h-[320px] relative">
                                <iframe
                                    src={`https://www.google.com/maps?q=${COMPANY_INFO.coordinates.lat},${COMPANY_INFO.coordinates.lng}&z=16&output=embed`}
                                    width="100%"
                                    height="100%"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0, minHeight: "320px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="GESPERA Konum"
                                />
                                {/* Sol üstte GESPERA Showroom kartı */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-4 right-4 left-4 md:left-auto md:max-w-xs z-10"
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-border-muted/50">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#8B7355" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-lg font-semibold text-text-dark mb-2">GESPERA</h4>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${COMPANY_INFO.coordinates.lat},${COMPANY_INFO.coordinates.lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-colors"
                                                    style={{ color: "#8B7355" }}
                                                >
                                                    <span>{locale === "tr" ? "Yol Tarifi Al" : "Get Directions"}</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="5" y1="12" x2="19" y2="12" />
                                                        <polyline points="12 5 19 12 12 19" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
