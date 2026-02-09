import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProductBySlug, getProductSlugByCategory } from "@/data/products";
import ProductsPageClient from "./ProductsPageClient";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kategori?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: `${t("title")} | GESPERA`,
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")} | GESPERA`,
      description: t("subtitle"),
    },
  };
}

function ProductsLoading() {
  return (
    <div className="pt-24">
      <section className="bg-cream-light py-16">
        <div className="container">
          <div className="text-center">
            <div className="h-10 w-64 mx-auto bg-cream-dark rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-96 mx-auto bg-cream-dark rounded-lg animate-pulse" />
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-cream-light rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-cream-dark" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-cream-dark rounded" />
                  <div className="h-6 w-3/4 bg-cream-dark rounded" />
                  <div className="h-4 w-full bg-cream-dark rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { kategori } = await searchParams;
  if (kategori) {
    const productSlug = getProductSlugByCategory(kategori);
    const product = getProductBySlug(productSlug);
    if (product) {
      redirect(`/${locale}/urunler/${productSlug}`);
    }
  }

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageClient />
    </Suspense>
  );
}
