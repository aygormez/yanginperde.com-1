import { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/data/products";
import { getAllProjectSlugs } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yanginperde.com";
    const locales = ["tr", "en"];

    // Static pages
    const staticPages = [
        "",
        "/urunler",
        "/hakkimizda",
        "/projeler",
        "/ozel-cozumler",
        "/iletisim",
        "/gizlilik-politikasi",
        "/kullanim-sartlari",
    ];

    // Generate sitemap entries for static pages
    const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
        locales.map((locale) => ({
            url: locale === "tr" ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: page === "" ? "daily" : "weekly" as const,
            priority: page === "" ? 1 : 0.8,
        }))
    );

    // Generate sitemap entries for product pages
    const productSlugs = getAllProductSlugs();
    const productEntries: MetadataRoute.Sitemap = productSlugs.flatMap((slug) =>
        locales.map((locale) => ({
            url: locale === "tr"
                ? `${baseUrl}/urunler/${slug}`
                : `${baseUrl}/${locale}/urunler/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }))
    );

    return [...staticEntries, ...productEntries];
}
