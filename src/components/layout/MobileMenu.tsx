"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { getOutdoorCategories, getIndoorCategories, getProductSlugByCategory } from "@/data/products";
import { Locale } from "@/i18n/config";

function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

interface MobileMenuProps {
    onClose: () => void;
    onSearch?: () => void;
}

export default function MobileMenu({ onClose, onSearch }: MobileMenuProps) {
    const t = useTranslations("nav");
    const tCat = useTranslations("categories");
    const pathname = usePathname();
    const locale = useLocale() as Locale;
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    const outdoorCategories = getOutdoorCategories();
    const indoorCategories = getIndoorCategories();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const isProductsActive =
        pathname.includes("/urunler") ||
        pathname.includes("/dis-mekan") ||
        pathname.includes("/ic-mekan");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-anthracite/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-border-muted/50">
                        <Logo className="h-9" width={140} height={40} />
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-text-dark hover:text-primary transition-colors rounded-full"
                            aria-label="Close menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation - masaüstü menü ile aynı sıra ve yapı */}
                    <nav className="flex-1 overflow-y-auto p-5 space-y-1">
                        {/* Ana Sayfa */}
                        <Link
                            href="/"
                            onClick={onClose}
                            className={cn(
                                "flex items-center px-4 py-2.5 text-base font-medium rounded-full transition-all duration-200",
                                pathname === "/"
                                    ? "text-primary"
                                    : "text-text-dark/80 hover:text-primary"
                            )}
                        >
                            {t("home")}
                        </Link>

                        {/* Ürünler - açılır bölüm */}
                        <div>
                            <button
                                onClick={() => setIsProductsOpen(!isProductsOpen)}
                                className={cn(
                                    "flex items-center justify-between w-full px-4 py-2.5 text-base font-medium rounded-full transition-all duration-200",
                                    isProductsActive
                                        ? "text-primary"
                                        : "text-text-dark/80 hover:text-primary"
                                )}
                            >
                                <span>{t("products")}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={cn(
                                        "transition-transform duration-200",
                                        isProductsOpen && "rotate-180"
                                    )}
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isProductsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden pl-4 mt-1 space-y-1 border-l-2 border-cream ml-2"
                                    >
                                        {/* Dış Mekan */}
                                        <div className="pt-2">
                                            <Link
                                                href="/dis-mekan"
                                                onClick={onClose}
                                                className="flex items-center gap-2 text-base font-semibold text-primary mb-2 hover:underline"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="4" />
                                                    <path d="M12 2v2" />
                                                    <path d="M12 20v2" />
                                                    <path d="m4.93 4.93 1.41 1.41" />
                                                    <path d="m17.66 17.66 1.41 1.41" />
                                                    <path d="M2 12h2" />
                                                    <path d="M20 12h2" />
                                                    <path d="m6.34 17.66-1.41 1.41" />
                                                    <path d="m19.07 4.93-1.41 1.41" />
                                                </svg>
                                                {tCat("outdoor")}
                                            </Link>
                                            <div className="space-y-0.5">
                                                {outdoorCategories.map((cat) => {
                                                    const productSlug = getProductSlugByCategory(cat.slug);
                                                    return (
                                                        <Link
                                                            key={cat.slug}
                                                            href={`/urunler/${productSlug}`}
                                                            onClick={onClose}
                                                            className="block px-3 py-2 text-base text-text-muted hover:text-primary hover:bg-cream rounded-lg transition-colors"
                                                        >
                                                            {getLocalized(cat.name, locale)}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* İç Mekan */}
                                        <div className="pt-2">
                                            <Link
                                                href="/ic-mekan"
                                                onClick={onClose}
                                                className="flex items-center gap-2 text-base font-semibold text-primary mb-2 hover:underline"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                    <polyline points="9 22 9 12 15 12 15 22" />
                                                </svg>
                                                {tCat("indoor")}
                                            </Link>
                                            <div className="space-y-0.5">
                                                {indoorCategories.map((cat) => {
                                                    const productSlug = getProductSlugByCategory(cat.slug);
                                                    return (
                                                        <Link
                                                            key={cat.slug}
                                                            href={`/urunler/${productSlug}`}
                                                            onClick={onClose}
                                                            className="block px-3 py-2 text-base text-text-muted hover:text-primary hover:bg-cream rounded-lg transition-colors"
                                                        >
                                                            {getLocalized(cat.name, locale)}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Özel Çözümler */}
                                        <div className="pt-2 border-t border-gray-100">
                                            <Link
                                                href="/ozel-cozumler"
                                                onClick={onClose}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                                        <path d="M19 3v4" />
                                                        <path d="M21 5h-4" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="block text-base font-semibold text-text-dark group-hover:text-primary transition-colors">
                                                        {t("customSolutions")}
                                                    </span>
                                                    <span className="block text-sm text-text-muted">
                                                        {locale === "tr" ? "Projenize özel çözümler" : "Tailored solutions for your project"}
                                                    </span>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-primary transition-colors shrink-0">
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>

                                        {/* Tüm Ürünler */}
                                        <div className="py-2">
                                            <Link
                                                href="/urunler"
                                                onClick={onClose}
                                                className="flex items-center justify-center gap-2 py-2 text-base font-medium text-primary hover:underline"
                                            >
                                                {t("allProducts")}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Hakkımızda */}
                        <Link
                            href="/hakkimizda"
                            onClick={onClose}
                            className={cn(
                                "flex items-center px-4 py-2.5 text-base font-medium rounded-full transition-all duration-200",
                                pathname === "/hakkimizda"
                                    ? "text-primary"
                                    : "text-text-dark/80 hover:text-primary"
                            )}
                        >
                            {t("about")}
                        </Link>

                        {/* İletişim */}
                        <Link
                            href="/iletisim"
                            onClick={onClose}
                            className={cn(
                                "flex items-center px-4 py-2.5 text-base font-medium rounded-full transition-all duration-200",
                                pathname === "/iletisim"
                                    ? "text-primary"
                                    : "text-text-dark/80 hover:text-primary"
                            )}
                        >
                            {t("contact")}
                        </Link>

                        {/* Arama */}
                        {onSearch && (
                            <button
                                onClick={() => {
                                    onSearch();
                                    onClose();
                                }}
                                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-base font-medium rounded-full text-text-dark/80 hover:text-primary transition-all duration-200 mt-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                                <span>{t("search")}</span>
                            </button>
                        )}
                    </nav>

                    {/* Footer - Dil + Teklif Alın (masaüstü ile aynı; dil dropdown yukarı açılır, ekran dışına taşmaz) */}
                    <div className="p-5 border-t border-border-muted/50 space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-text-muted">Dil</span>
                            <LanguageSwitcher variant="dark" placement="top" />
                        </div>
                        <Link href="/teklif-al" onClick={onClose} className="block">
                            <button
                                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3.5 text-sm font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                                style={{ backgroundColor: "#8B7355", color: "#FFFFFF" }}
                            >
                                <span>{t("getQuote")}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
