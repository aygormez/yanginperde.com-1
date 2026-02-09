"use client";

import { NextIntlClientProvider } from "next-intl";
import { Header, Footer } from "@/components/layout";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

// Font Tanımları
const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-montserrat",
    display: "swap",
});

// Tam TR çevirileri (Header/Footer için gerekli tüm mesajlar)
const messages = {
    "nav": {
        "home": "Ana Sayfa",
        "products": "Ürünler",
        "allProducts": "Tüm Ürünleri Gör",
        "outdoor": "Dış Mekan",
        "indoor": "İç Mekan",
        "customSolutions": "Özel Çözümler",
        "about": "Hakkımızda",
        "projects": "Projeler",
        "contact": "İletişim",
        "login": "Giriş",
        "getQuote": "Teklif Alın",
        "search": "Ara"
    },
    "footer": {
        "description": "Gölgelendirme sistemlerinde Türkiye'nin güvenilir markası.",
        "quickLinks": "Hızlı Linkler",
        "products": "Ürünler",
        "contact": "İletişim",
        "address": "Adres",
        "phone": "Telefon",
        "email": "E-posta",
        "copyright": "© 2024 GESPERA. Tüm hakları saklıdır.",
        "privacy": "Gizlilik Politikası",
        "terms": "Kullanım Şartları",
        "company": "YMA Yapı Sistemleri San. ve Tic. Ltd. Şti."
    },
    "common": {
        "loading": "Yükleniyor...",
        "error": "Bir hata oluştu",
        "backToHome": "Ana Sayfaya Dön",
        "learnMore": "Daha Fazla",
        "seeAll": "Tümünü Gör",
        "readMore": "Devamını Oku"
    }
};

export default function NotFound() {
    return (
        <html lang="tr" className={`${plusJakarta.variable} ${cormorant.variable} ${montserrat.variable}`}>
            <body className="font-sans antialiased m-0 p-0 bg-cream-light text-text-dark flex flex-col min-h-screen">
                <NextIntlClientProvider locale="tr" messages={messages}>
                    <Header />

                    <main className="flex-grow flex items-center justify-center relative px-4 py-20">
                        {/* Arkaplan Deseni */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A1A1A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        <div className="text-center max-w-2xl relative z-10 w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-[120px] md:text-[200px] font-display font-light leading-none text-anthracite-dark/5 select-none mb-8">
                                    404
                                </h1>

                                <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-white/40 shadow-xl">
                                    <div className="w-16 h-1 bg-primary mx-auto mb-6" />
                                    <h2 className="text-3xl md:text-5xl font-display font-medium text-anthracite-dark mb-4">
                                        Sayfa Bulunamadı
                                    </h2>
                                    <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
                                        Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
                                    </p>

                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <Link
                                            href="/"
                                            className="inline-flex items-center justify-center px-8 py-3 bg-anthracite-dark text-white rounded-full font-medium transition-all duration-300 hover:bg-primary hover:shadow-lg shadow-anthracite-dark/20"
                                        >
                                            Ana Sayfa
                                        </Link>
                                        <Link
                                            href="/tr/iletisim"
                                            className="inline-flex items-center justify-center px-8 py-3 border border-anthracite-dark/20 bg-white text-anthracite-dark rounded-full font-medium transition-all duration-300 hover:border-primary hover:text-primary"
                                        >
                                            Bize Ulaşın
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </main>

                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
