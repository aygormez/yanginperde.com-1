"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function SEOContent() {
    const t = useTranslations("seo");

    return (
        <section className="pt-10 md:pt-14 pb-20 md:pb-28 bg-gradient-to-b from-cream to-white overflow-hidden">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Decorative Line */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full"
                    />

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-text-dark mb-6">
                        {t("title")}
                    </h2>

                    {/* Content */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-text-muted text-lg leading-relaxed"
                    >
                        {t("content")}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
