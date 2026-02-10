"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { COMPANY_INFO } from "@/lib/constants";
import { categories } from "@/data/products";

export function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();

    const fireCategories = categories.filter((c) => c.mainCategory === "yangin-sistemleri");
    const smokeCategories = categories.filter((c) => c.mainCategory === "duman-sistemleri");

    return (
        <footer className="relative bg-carbon overflow-hidden">
            {/* Fire gradient top line */}
            <div className="fire-line-top" />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-50" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 rounded-lg bg-fire-gradient flex items-center justify-center group-hover:glow-fire transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill="currentColor" />
                                </svg>
                            </div>
                            <span className="font-display text-lg font-bold text-foreground tracking-wider">
                                YANGIN<span className="text-primary"> PERDE</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {t("description")}
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                            {t("company")}
                        </p>

                        {/* Social Media */}
                        <div className="flex items-center gap-3 mt-6">
                            {COMPANY_INFO.socialMedia.instagram && (
                                <a href={COMPANY_INFO.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            )}
                            {COMPANY_INFO.socialMedia.facebook && (
                                <a href={COMPANY_INFO.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Fire Systems */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-6 bg-fire-gradient rounded-full" />
                            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                                {t("products")} — Yangın
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {fireCategories.map((cat) => (
                                <li key={cat.slug}>
                                    <Link
                                        href={`/urunler/${cat.slug}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                    </Link>
                                </li>
                            ))}
                            {smokeCategories.map((cat) => (
                                <li key={cat.slug}>
                                    <Link
                                        href={`/urunler/${cat.slug}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-6 bg-smoke rounded-full" />
                            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                                {t("quickLinks")}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            <li><Link href="/hakkimizda" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("quickLinks")}</Link></li>
                            <li><Link href="/projeler" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projeler</Link></li>
                            <li><Link href="/ozel-cozumler" className="text-sm text-muted-foreground hover:text-primary transition-colors">Özel Çözümler</Link></li>
                            <li><Link href="/iletisim" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("contact")}</Link></li>
                            <li><Link href="/teklif-al" className="text-sm text-muted-foreground hover:text-primary transition-colors">Teklif Al</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                                {t("contact")}
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {/* Address */}
                            <div className="flex gap-3">
                                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm text-muted-foreground">
                                    {COMPANY_INFO.address.district}, {COMPANY_INFO.address.city}
                                </span>
                            </div>
                            {/* Email */}
                            <div className="flex gap-3">
                                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {COMPANY_INFO.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground/60">
                        {t("copyright")}
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/gizlilik-politikasi" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">
                            {t("privacy")}
                        </Link>
                        <div className="h-3 w-px bg-border/50" />
                        <Link href="/kullanim-sartlari" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">
                            {t("terms")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
