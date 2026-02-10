"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { COMPANY_INFO } from "@/lib/constants";
import { ContactForm } from "@/components/shared";

export default function ContactPageClient({ locale }: { locale: Locale }) {
    const t = useTranslations("contact");

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-28 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-grid-fire opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">{t("badge")}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">{t("title")}</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("subtitle")}</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Address */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 hover-glow transition-all duration-300">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-2">{t("info.address")}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {COMPANY_INFO.address.district}, {COMPANY_INFO.address.city}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Phone */}

                            {/* Email */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 hover-glow transition-all duration-300">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-2">{t("info.email")}</h3>
                                        <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{COMPANY_INFO.email}</a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map */}
                            <div className="glass rounded-xl overflow-hidden h-64">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.5!2d28.97!3d41.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${COMPANY_INFO.address.street}!5e0!3m2!1str!2str!4v1`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8">
                                <h2 className="font-display text-xl font-bold text-foreground mb-6">{t("form.title")}</h2>
                                <ContactForm />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
