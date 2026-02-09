import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutPageClient from "./AboutPageClient";
import { Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: `${t("title")} | GESPERA`,
    description: t("story.content").slice(0, 160),
    openGraph: {
      title: `${t("title")} | GESPERA`,
      description: t("story.content").slice(0, 160),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageClient locale={locale as Locale} />;
}
