"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSwitcherProps {
    variant?: "light" | "dark";
    /** "top" = dropdown açılırken yukarı açılır (mobil menüde ekran dışına taşmayı önler) */
    placement?: "bottom" | "top";
}

export default function LanguageSwitcher({ variant = "dark", placement = "bottom" }: LanguageSwitcherProps) {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLocaleChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "group inline-flex items-center gap-2 font-medium px-3 py-2 sm:px-3.5 sm:py-2 rounded-full text-sm transition-all duration-300 hover:shadow-lg",
                    variant === "light"
                        ? "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
                        : "bg-white text-text-dark hover:shadow-md shadow-sm border border-border-muted/50"
                )}
                aria-label="Select language"
            >
                <span className="font-medium hidden sm:inline tracking-wide text-sm">
                    {localeNames[locale]}
                </span>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                >
                    <path d="m6 9 6 6 6-6" />
                </motion.svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Dropdown - placement="top" ile yukarı açılır (mobil menüde ekran altına taşmayı önler) */}
                        <motion.div
                            initial={{ opacity: 0, y: placement === "top" ? -8 : 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: placement === "top" ? -8 : 8, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                                "absolute right-0 w-56 bg-white rounded-2xl shadow-2xl border border-border-muted/50 overflow-hidden z-50 backdrop-blur-xl",
                                placement === "top" ? "bottom-full mb-3" : "top-full mt-3"
                            )}
                        >
                            <div className="p-2">
                                {locales.map((loc, index) => (
                                    <motion.button
                                        key={loc}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03, duration: 0.2 }}
                                        onClick={() => handleLocaleChange(loc)}
                                        whileHover={{ x: 4 }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group",
                                            locale === loc
                                                ? "shadow-sm"
                                                : "text-text-dark hover:bg-cream/50"
                                        )}
                                        style={locale === loc ? { 
                                            backgroundColor: '#8B7355',
                                            color: '#FFFFFF'
                                        } : undefined}
                                        aria-label={`Switch to ${localeNames[loc]}`}
                                    >
                                        <span 
                                            className={cn(
                                                "flex-1 text-left font-medium text-sm",
                                                locale === loc ? "text-white" : "text-text-dark"
                                            )}
                                        >
                                            {localeNames[loc]}
                                        </span>
                                        {locale === loc && (
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#FFFFFF"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </motion.svg>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
