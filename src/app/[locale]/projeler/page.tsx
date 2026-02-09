import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsPageClient from "./ProjectsPageClient";
import { Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: `${t("title")} | GESPERA`,
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")} | GESPERA`,
      description: t("subtitle"),
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPageClient locale={locale as Locale} />;
}
