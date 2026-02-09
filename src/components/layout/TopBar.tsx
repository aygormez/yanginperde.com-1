"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopBar() {
    const t = useTranslations("contact.info");

    return (
        <div className="bg-slate-900 text-slate-300 text-xs py-2 hidden lg:block border-b border-white/10">
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Left: Contact Info */}
                <div className="flex items-center gap-6">
                    <a href={`tel:${t("phone")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span className="font-mono tracking-wide">{t("phone")}</span>
                    </a>
                    <a href={`mailto:${t("email")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        <span className="font-mono tracking-wide">{t("email")}</span>
                    </a>
                </div>

                {/* Right: Language & Quick Links */}
                <div className="flex items-center gap-6">
                    <Link href="/teklif-al" className="hover:text-white transition-colors font-medium">
                        {t("getQuote") || "Teklif Alın"}
                    </Link>
                    <div className="w-[1px] h-3 bg-white/20"></div>
                    <LanguageSwitcher variant="light" />
                </div>
            </div>
        </div>
    );
}
