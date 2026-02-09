import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "tr" ? "Kullanım Şartları" : "Terms of Use";

  return {
    title: `${title} | GESPERA`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = locale === "tr" ? trContent : enContent;
  const lastUpdated = locale === "tr" ? "Son güncelleme: 29 Ocak 2025" : "Last updated: January 29, 2025";

  return (
    <div>
      <section className="bg-cream-light pt-32 pb-16">
        <div className="container">
          <h1 className="text-center">{content.title}</h1>
          <p className="text-center text-text-muted mt-4">{lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-text-dark mb-4">
                  {section.title}
                </h2>
                <div className="text-text-muted leading-relaxed space-y-3">
                  {Array.isArray(section.content) ? (
                    section.content.map((p: string, i: number) => (
                      <p key={i}>{p}</p>
                    ))
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const trContent = {
  title: "Kullanım Şartları",
  sections: [
    {
      title: "1. Taraflar ve Tanımlar",
      content: [
        "Bu Kullanım Şartları (“Şartlar”), YMA Yapı Sistemleri San. ve Tic. Ltd. Şti. (“GESPERA”, “şirket”, “biz”) ile gespera.com ve ilgili alt alan adları üzerinden erişilen web sitesini (“Site”) kullanan ziyaretçi/kullanıcı (“siz”, “kullanıcı”) arasındaki ilişkiye uygulanır.",
        "“Site” ifadesi, GESPERA’ya ait bu alan adı altındaki tüm sayfaları, içerikleri ve hizmetleri kapsar. Site üzerinden sunulan bilgi ve hizmetler, genel bilgilendirme ve iletişim amaçlıdır; profesyonel veya hukuki danışmanlık niteliği taşımaz.",
      ],
    },
    {
      title: "2. Şartların Kabulü",
      content: [
        "Siteye erişiminiz veya Siteyi kullanmanız, bu Kullanım Şartlarını okuduğunuzu, anladığınızı ve kabul ettiğinizi kabul ve taahhüt ettiğiniz anlamına gelir. Bu şartları kabul etmiyorsanız, Siteyi kullanmayınız.",
      ],
    },
    {
      title: "3. Hizmetin Kapsamı",
      content: [
        "Site, GESPERA’nın gölgelendirme ve perde sistemleri (zip screen, stor perde, tente, pergola vb.) hakkında bilgi sunmak, ürün ve hizmetleri tanıtmak ve iletişim taleplerini almak amacıyla işletilmektedir. Sitedeki bilgiler genel bilgilendirme amaçlıdır; ürün özellikleri, fiyatlar veya uygulanabilirlik projeye özel teklif ve sözleşmelerle belirlenir.",
      ],
    },
    {
      title: "4. Fikri Mülkiyet",
      content: [
        "Siteye ait tüm içerik, tasarım, metin, görsel, logo, marka ve yazılım unsurları GESPERA veya lisans verenlerine aittir ve Türkiye Cumhuriyeti fikri mülkiyet mevzuatı ve uluslararası sözleşmeler kapsamında korunmaktadır.",
        "İzinsiz kopyalama, çoğaltma, dağıtma, değiştirme, ticari kullanım veya türev çalışma oluşturma yasaktır. Sadece kişisel, ticari olmayan kullanım için sınırlı erişim ve görüntüleme hakkı tanınmaktadır.",
      ],
    },
    {
      title: "5. Kullanıcı Yükümlülükleri ve Yasak Kullanım",
      content: [
        "Siteyi yalnızca yasalara, bu Şartlara ve genel ahlak kurallarına uygun şekilde kullanmayı kabul edersiniz. Aşağıdaki davranışlar yasaktır: Site veya altyapısına yetkisiz müdahale, zararlı yazılım yükleme veya yayma, otomatik veri toplama (scraping/robot) izinsiz kullanım, başkalarının kimlik veya verilerini taklit etme, spam veya yanıltıcı iletişim, Site işleyişini bozucu veya güvenliği tehlikeye atan eylemler.",
        "İhlal tespitinde GESPERA, erişimi kısıtlama, veri silme ve gerekirse hukuki yollara başvurma hakkını saklı tutar.",
      ],
    },
    {
      title: "6. Sorumluluk Reddi",
      content: [
        "Sitedeki bilgiler “olduğu gibi” sunulmaktadır. GESPERA, bilgilerin eksiksiz, güncel veya hatasız olduğu konusunda garanti vermez. Site içeriği, hukuki veya teknik danışmanlık yerine geçmez; proje veya satın alma kararlarınız yalnızca kendi sorumluluğunuzdadır.",
      ],
    },
    {
      title: "7. Sorumluluk Sınırlaması",
      content: [
        "Yürürlükteki yasaların izin verdiği ölçüde, GESPERA Site kullanımından veya kullanılamamasından, Sitedeki bilgilerin kullanılmasından veya üçüncü taraf bağlantılardan doğan doğrudan, dolaylı, özel veya cezai zararlardan sorumlu tutulamaz. Zorunlu yasal sorumluluklar bu sınırlamadan etkilenmez.",
      ],
    },
    {
      title: "8. Üçüncü Taraf Bağlantıları",
      content: [
        "Site, üçüncü taraf web sitelerine (ör. sosyal medya, harita servisleri) bağlantı içerebilir. Bu bağlantılar yalnızca kolaylık amacıyla sunulur; GESPERA, üçüncü taraf sitelerin içeriğinden veya gizlilik uygulamalarından sorumlu değildir. Bu siteleri kullanırken ilgili siteye ait şartları ve gizlilik politikasını inceleyiniz.",
      ],
    },
    {
      title: "9. Değişiklikler",
      content: [
        "GESPERA, bu Kullanım Şartlarını önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar. Değişiklikler, Sitede yayımlanmasıyla yürürlüğe girer. Değişiklikten sonra Siteyi kullanmaya devam etmeniz, güncel şartları kabul ettiğiniz anlamına gelir.",
      ],
    },
    {
      title: "10. Uygulanacak Hukuk ve Yetkili Mahkeme",
      content: [
        "Bu Şartlar, Türkiye Cumhuriyeti kanunlarına tabidir. Bu Şartlardan veya Site kullanımından doğan uyuşmazlıklarda İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.",
      ],
    },
    {
      title: "11. İletişim",
      content: [
        "Bu Kullanım Şartları hakkında sorularınız için: info@gespera.com adresinden veya Sitedeki iletişim bilgilerinden bize ulaşabilirsiniz.",
      ],
    },
  ],
};

const enContent = {
  title: "Terms of Use",
  sections: [
    {
      title: "1. Parties and Definitions",
      content: [
        "These Terms of Use (“Terms”) apply to the relationship between YMA Yapı Sistemleri San. ve Tic. Ltd. Şti. (“GESPERA”, “company”, “we”) and the visitor/user (“you”, “user”) of the website accessible at gespera.com and related subdomains (“Site”).",
        "“Site” means all pages, content and services under this domain. The information and services offered on the Site are for general information and communication purposes only and do not constitute professional or legal advice.",
      ],
    },
    {
      title: "2. Acceptance of Terms",
      content: [
        "By accessing or using the Site, you acknowledge that you have read, understood and agree to these Terms of Use. If you do not agree, do not use the Site.",
      ],
    },
    {
      title: "3. Scope of Service",
      content: [
        "The Site is operated to provide information about GESPERA’s shading and blind systems (zip screen, roller blinds, awnings, pergolas, etc.), to promote products and services, and to receive contact requests. Information on the Site is for general information only; product specifications, prices and applicability are determined by project-specific offers and contracts.",
      ],
    },
    {
      title: "4. Intellectual Property",
      content: [
        "All content, design, text, images, logos, trademarks and software elements of the Site are owned by GESPERA or its licensors and are protected under the laws of the Republic of Turkey and international conventions.",
        "Unauthorised copying, reproduction, distribution, modification, commercial use or creation of derivative works is prohibited. Only limited access and viewing for personal, non-commercial use is permitted.",
      ],
    },
    {
      title: "5. User Obligations and Prohibited Use",
      content: [
        "You agree to use the Site only in accordance with applicable laws, these Terms and generally accepted standards. The following are prohibited: unauthorised interference with the Site or its infrastructure, uploading or distributing malicious software, unauthorised automated data collection (scraping/robots), impersonation of others, spam or misleading communication, and any action that disrupts the Site or compromises security.",
        "GESPERA reserves the right to restrict access, delete data and take legal action where an infringement is detected.",
      ],
    },
    {
      title: "6. Disclaimer",
      content: [
        "Information on the Site is provided “as is”. GESPERA does not warrant that it is complete, current or error-free. Site content does not replace legal or technical advice; project or purchasing decisions are your sole responsibility.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "To the extent permitted by applicable law, GESPERA shall not be liable for any direct, indirect, special or consequential damages arising from the use or inability to use the Site, from the use of information on the Site, or from third-party links. Mandatory legal liability remains unaffected.",
      ],
    },
    {
      title: "8. Third-Party Links",
      content: [
        "The Site may contain links to third-party websites (e.g. social media, map services). These links are provided for convenience only; GESPERA is not responsible for the content or privacy practices of third-party sites. When using such sites, please review their terms and privacy policy.",
      ],
    },
    {
      title: "9. Changes",
      content: [
        "GESPERA reserves the right to modify these Terms at any time without prior notice. Changes take effect upon publication on the Site. Continued use of the Site after changes constitutes acceptance of the updated Terms.",
      ],
    },
    {
      title: "10. Governing Law and Jurisdiction",
      content: [
        "These Terms are governed by the laws of the Republic of Turkey. Istanbul (Çağlayan) Courts and Execution Offices have exclusive jurisdiction over any dispute arising from these Terms or the use of the Site.",
      ],
    },
    {
      title: "11. Contact",
      content: [
        "For questions about these Terms of Use: you may contact us at info@gespera.com or via the contact details on the Site.",
      ],
    },
  ],
};
