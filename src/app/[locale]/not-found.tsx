import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
    const t = useTranslations("common"); // Eğer common yoksa 'Index' veya hata mesajlarına uygun namespace

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-cream-light relative overflow-hidden">
            {/* Arkaplan Deseni */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A1A1A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-10 max-w-2xl">
                <h1 className="text-[120px] md:text-[180px] font-display font-light leading-none text-anthracite-dark/10 select-none">
                    404
                </h1>

                <div className="-mt-12 mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-medium text-text-dark mb-4">
                        Sayfa Bulunamadı
                    </h2>
                    <p className="text-text-muted text-lg">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-4 bg-anthracite-dark text-white rounded-full font-medium transition-all duration-300 hover:bg-primary hover:shadow-lg hover:-translate-y-1"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
