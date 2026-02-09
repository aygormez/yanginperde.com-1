"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function CTASection() {
    const t = useTranslations("cta");

    return (
        <section className="relative py-24 md:py-32 bg-slate-50 text-foreground overflow-hidden border-t border-slate-200">

            <div className="container relative z-10 px-4 md:px-8 mx-auto text-center flex flex-col items-center">

                {/* Status Indicator */}
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-10 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-slate-600 font-bold text-xs uppercase tracking-wider">{t("acceptingProjects")}</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
                    {t("title") || "Ready to secure your architecture?"}
                </h2>

                <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
                    {t("subtitle") || "Get a technical consultation and quote for your fire safety requirements today."}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <Link href="/iletisim" className="w-full sm:w-auto">
                        <button className="px-10 py-5 bg-primary text-white rounded-xl font-bold text-lg tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 w-full sm:min-w-[200px]">
                            {t("button") || "Get a Quote"}
                        </button>
                    </Link>
                    <Link href="/urunler" className="w-full sm:w-auto">
                        <button className="px-10 py-5 bg-white text-slate-700 rounded-xl font-bold text-lg tracking-wide border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm w-full sm:min-w-[200px]">
                            {t("secondaryButton") || "View Systems"}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
