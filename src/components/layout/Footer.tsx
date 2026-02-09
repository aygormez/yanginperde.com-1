"use client";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { COMPANY_INFO } from "@/lib/constants";
import { getFullAddress, formatPhoneLink } from "@/lib/utils";
import { getOutdoorCategories } from "@/data/products";
import Logo from "./Logo";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    if (typeof obj === 'string') return obj;
    return obj[locale] || obj["tr"] || obj["en"];
}

export default function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("nav");
    const locale = useLocale() as Locale;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0f1115] text-white border-t border-white/5 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="container mx-auto px-4 md:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

                    {/* Brand Column */}
                    <div className="space-y-8">
                        {/* Logo with light variant for dark footer */}
                        <div className="brightness-0 invert filter">
                            <Logo className="h-8" />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
                            {t("description")}
                        </p>
                        <div className="pt-4 border-t border-white/5">
                            <h5 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">CERTIFIED STANDARDS</h5>
                            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                <div className="h-8 w-12 border border-white/20 rounded-sm flex items-center justify-center text-[10px] font-bold">ISO</div>
                                <div className="h-8 w-12 border border-white/20 rounded-sm flex items-center justify-center text-[10px] font-bold">CE</div>
                                <div className="h-8 w-12 border border-white/20 rounded-sm flex items-center justify-center text-[10px] font-bold">EN</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Link Column */}
                    <div>
                        <h4 className="text-sm font-display font-bold uppercase mb-8 text-white tracking-wider">
                            {t("quickLinks")}
                        </h4>
                        <ul className="space-y-4 text-sm font-mono text-gray-500">
                            <li><Link href="/" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{tNav("home")}</Link></li>
                            <li><Link href="/urunler" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{tNav("products")}</Link></li>
                            <li><Link href="/hakkimizda" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{tNav("about")}</Link></li>
                            <li><Link href="/iletisim" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{tNav("contact")}</Link></li>
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="text-sm font-display font-bold uppercase mb-8 text-white tracking-wider">
                            {locale === "tr" ? "SİSTEMLER" : "SYSTEMS"}
                        </h4>
                        <ul className="space-y-4 text-sm font-mono text-gray-500">
                            <li><Link href="/dis-mekan" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{locale === "tr" ? "Yangın Sistemleri" : "Fire Systems"}</Link></li>
                            <li><Link href="/ic-mekan" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{locale === "tr" ? "Duman Sistemleri" : "Smoke Systems"}</Link></li>
                            <li><Link href="/ozel-cozumler" className="hover:text-white transition-colors block border-b border-transparent hover:border-white/20 w-max pb-1">{locale === "tr" ? "Özel Çözümler" : "Custom Solutions"}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-sm font-display font-bold uppercase mb-8 text-white tracking-wider">
                            {locale === "tr" ? "İLETİŞİM" : "CONTACT"}
                        </h4>
                        <ul className="space-y-6 text-sm text-gray-500 font-light">
                            <li className="flex gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white flex-shrink-0 mt-1">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="leading-relaxed">{getFullAddress(COMPANY_INFO.address)}</span>
                            </li>
                            <li className="flex gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white flex-shrink-0 mt-1">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <a href={`tel:${formatPhoneLink(COMPANY_INFO.phone)}`} className="hover:text-white transition-colors">
                                    {COMPANY_INFO.phone}
                                </a>
                            </li>
                            <li className="flex gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white flex-shrink-0 mt-1">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                                    {COMPANY_INFO.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    <p>© {currentYear} YANGIN PERDE. {locale === "tr" ? "BÜTÜN HAKLARI SAKLIDIR." : "ALL RIGHTS RESERVED."}</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">{t("privacy")}</Link>
                        <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">{t("terms")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
