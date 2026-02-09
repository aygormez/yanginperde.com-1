"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { getOutdoorCategories, getIndoorCategories, getProductSlugByCategory, searchProducts } from "@/data/products";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

export default function Header() {
    const t = useTranslations("nav");
    const tCat = useTranslations("categories");
    const pathname = usePathname();
    const locale = useLocale();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Refs for click outside
    const navRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const outdoorCategories = getOutdoorCategories();
    const indoorCategories = getIndoorCategories();

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsProductsOpen(false);
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Search focus
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [isSearchOpen]);

    // Close on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProductsOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === "Escape") {
                setIsSearchOpen(false);
                setIsProductsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const searchResults = searchQuery.trim() ? searchProducts(searchQuery, locale) : [];

    return (
        <header
            ref={navRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-2" : "bg-white border-b border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex-shrink-0 z-50">
                    {/* Logo component already contains a Link, so we don't wrap it */}
                    <Logo className="h-8 md:h-9" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link
                        href="/"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            pathname === "/" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        {t("home")}
                    </Link>

                    {/* Products Dropdown */}
                    <div className="relative group">
                        <button
                            onClick={() => setIsProductsOpen(!isProductsOpen)}
                            className={cn(
                                "flex items-center gap-1 text-sm font-medium transition-colors outline-none",
                                pathname.includes("/urunler") || isProductsOpen ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            {t("products")}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-200", isProductsOpen ? "rotate-180" : "")}>
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isProductsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-6 grid grid-cols-2 gap-8"
                                >
                                    {/* Outdoor */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-50">
                                            <span className="font-semibold text-slate-900 text-sm tracking-wide">{tCat("outdoor")}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {outdoorCategories.map((cat) => (
                                                <Link
                                                    key={cat.slug}
                                                    href={`/urunler/${getProductSlugByCategory(cat.slug)}`}
                                                    onClick={() => setIsProductsOpen(false)}
                                                    className="px-3 py-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors block text-left"
                                                >
                                                    {getLocalized(cat.name, locale as Locale)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Indoor */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-50">
                                            <span className="font-semibold text-slate-900 text-sm tracking-wide">{tCat("indoor")}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {indoorCategories.map((cat) => (
                                                <Link
                                                    key={cat.slug}
                                                    href={`/urunler/${getProductSlugByCategory(cat.slug)}`}
                                                    onClick={() => setIsProductsOpen(false)}
                                                    className="px-3 py-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors block text-left"
                                                >
                                                    {getLocalized(cat.name, locale as Locale)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Link */}
                                    <div className="col-span-2 pt-2 border-t border-slate-50">
                                        <Link
                                            href="/ozel-cozumler"
                                            onClick={() => setIsProductsOpen(false)}
                                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                                        >
                                            <div>
                                                <span className="block text-sm font-semibold text-slate-900">{t("customSolutions")}</span>
                                                <span className="text-xs text-slate-500">Özel projeleriniz için mühendislik desteği</span>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-900 transition-colors"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        href="/referanslar"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            pathname === "/referanslar" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        {t("projects")}
                    </Link>

                    <Link
                        href="/hakkimizda"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            pathname === "/hakkimizda" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        {t("about")}
                    </Link>

                    <Link
                        href="/iletisim"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            pathname === "/iletisim" ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        {t("contact")}
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Search Trigger */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                        aria-label="Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200"></div>

                    <LanguageSwitcher variant="dark" />

                    <Link href="/teklif-al">
                        <button className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md shadow-sm hover:bg-slate-800 transition-colors">
                            {t("getQuote")}
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 text-slate-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        onClose={() => setIsMobileMenuOpen(false)}
                        onSearch={() => setIsSearchOpen(true)}
                    />
                )}
            </AnimatePresence>

            {/* Search Modal */}
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5"
                        >
                            <div className="flex items-center p-4 border-b border-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mr-3"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={locale === "tr" ? "Aramak için yazın..." : "Type to search..."}
                                    className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-lg"
                                />
                                <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                                    <span className="text-xs font-mono border border-slate-200 rounded px-1.5 py-0.5">ESC</span>
                                </button>
                            </div>

                            {searchQuery && (
                                <div className="max-h-[60vh] overflow-y-auto p-2 bg-slate-50/50">
                                    {searchResults.length > 0 ? (
                                        <div className="space-y-1">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/urunler/${product.slug}`}
                                                    onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100"
                                                >
                                                    <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900">{getLocalized(product.name, locale as Locale)}</h4>
                                                        <p className="text-xs text-slate-500">{getLocalized(product.shortDescription, locale as Locale)}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-slate-400">
                                            {locale === "tr" ? "Sonuç bulunamadı." : "No results found."}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
}
