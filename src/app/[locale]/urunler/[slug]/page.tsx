import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProductBySlug, getAllProductSlugs, getProductsByCategory } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { Locale, locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: string): T | undefined {
  if (!obj) return undefined;
  return obj[locale] || obj["tr"] || obj["en"];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const name = getLocalized(product.name, locale) || product.name.tr;
  const description = getLocalized(product.description, locale) || product.description.tr;

  return {
    title: `${name} | GESPERA`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${name} | GESPERA`,
      description: description.slice(0, 160),
      type: "website",
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // JSON-LD Schemas
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getLocalized(product.name, locale) || product.name.tr,
    description: getLocalized(product.description, locale) || product.description.tr,
    image: product.images.map((img) => `https://gespera.com${img}`),
    brand: {
      "@type": "Brand",
      name: "GESPERA",
    },
    manufacturer: {
      "@type": "Organization",
      name: "YMA Yapı Sistemleri San. ve Tic. Ltd. Şti.",
    },
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient 
        product={product} 
        relatedProducts={relatedProducts} 
        locale={locale as Locale} 
      />
    </>
  );
}
