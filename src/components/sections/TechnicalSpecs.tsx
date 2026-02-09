"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function TechnicalSpecs() {
    const t = useTranslations("specs");

    const specs = [
        { label: t("items.fireIntegrity.label"), value: t("items.fireIntegrity.value"), standard: t("items.fireIntegrity.standard") },
        { label: t("items.radiation.label"), value: t("items.radiation.value"), standard: t("items.radiation.standard") },
        { label: t("items.insulation.label"), value: t("items.insulation.value"), standard: t("items.insulation.standard") },
        { label: t("items.smokeLeakage.label"), value: t("items.smokeLeakage.value"), standard: t("items.smokeLeakage.standard") },
        { label: t("items.reactionToFire.label"), value: t("items.reactionToFire.value"), standard: t("items.reactionToFire.standard") },
        { label: t("items.closingSpeed.label"), value: t("items.closingSpeed.value"), standard: t("items.closingSpeed.standard") },
    ];

    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase mb-4 block text-sm">
                            {t("technicalCompliance")}
                        </span>
                        <h2 className="text-4xl font-display font-bold text-slate-900 leading-tight">
                            {t("certified")} <span className="text-slate-400">{t("performance")}</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:bg-white hover:border-slate-200 hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">{spec.standard}</span>
                                <div className="h-2 w-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="mb-2">
                                <h3 className="text-slate-900 font-display text-2xl font-bold">{spec.value}</h3>
                            </div>
                            <div className="text-slate-500 text-sm font-medium">
                                {spec.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:justify-end">
                    <button className="text-slate-700 text-sm font-bold border-b-2 border-slate-200 pb-1 hover:text-primary hover:border-primary transition-colors">
                        {t("downloadDatasheets")}
                    </button>
                </div>

            </div>
        </section>
    );
}
