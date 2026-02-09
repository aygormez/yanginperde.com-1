import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy";

  return {
    title: `${title} | GESPERA`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
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
  title: "Gizlilik Politikası",
  sections: [
    {
      title: "1. Veri Sorumlusu",
      content: [
        "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu: YMA Yapı Sistemleri San. ve Tic. Ltd. Şti. (“GESPERA”), Hamidiye Mah. Kemerburgaz Cad. No: 152/6, Kağıthane, İstanbul adresinde bulunmaktadır.",
        "Bu Gizlilik Politikası, GESPERA’nın gespera.com ve ilgili alt alan adları üzerinden sunulan web sitesi (“Site”) aracılığıyla toplanan kişisel verilerin işlenmesine ilişkin bilgilendirme amacı taşımaktadır.",
      ],
    },
    {
      title: "2. İşlenen Kişisel Veriler ve İşleme Amaçları",
      content: [
        "Site üzerinden iletişim formu doldurulduğunda ad soyad, e-posta adresi, telefon numarası ve mesaj içeriği toplanmaktadır. Bu veriler, talebinizin değerlendirilmesi, size dönüş yapılması ve ticari iletişim süreçlerinin yürütülmesi amacıyla işlenir. Hukuki dayanak: KVKK m. 5/2 – açık rızanız veya hizmetin ifası için zorunluluk.",
        "Site kullanımı sırasında teknik güvenlik ve kullanıcı deneyimi için çerezler ve benzeri teknolojiler kullanılabilir; reCAPTCHA hizmeti nedeniyle Google LLC tarafına sınırlı veri aktarımı söz konusu olabilir. Bu işlemlerin hukuki dayanakları: meşru menfaat (güvenlik, site işleyişi) ve açık rıza (gerektiğinde).",
      ],
    },
    {
      title: "3. Kişisel Verilerin Aktarılması",
      content: [
        "Toplanan kişisel verileriniz, yalnızca yasal zorunluluklar veya hizmetin sunulması (ör. hosting, e-posta servisi, reCAPTCHA ile bot koruması) kapsamında, KVKK’da öngörülen şartlara uygun olarak ve gerekli güvenlik önlemleriyle iş ortaklarına veya yurt dışına aktarılabilir. Ticari amaçla üçüncü taraflara satılmaz veya kiralanmaz.",
      ],
    },
    {
      title: "4. Kişisel Verilerin Saklama Süresi",
      content: [
        "İletişim formu verileri, talebin çözülmesi ve yasal saklama yükümlülükleri dikkate alınarak, işleme amacının gerektirdiği süre boyunca saklanır. Süre sonunda veriler silinir, anonymize edilir veya arşiv amaçlı yalnızca yasal zorunluluk çerçevesinde tutulur.",
      ],
    },
    {
      title: "5. Çerezler (Cookies)",
      content: [
        "Site, zorunlu (güvenlik, oturum) ve işlevsel çerezler kullanabilir. Ayrıca Google reCAPTCHA hizmeti kullanıldığında, Google’ın kendi çerez ve veri işleme politikaları geçerli olup, reCAPTCHA’nın kullanımı bot koruması amacıyla meşru menfaat kapsamındadır.",
        "Tarayıcı ayarlarınızdan çerezleri kısmen veya tamamen devre dışı bırakabilirsiniz; bu durumda sitenin bazı özellikleri (ör. iletişim formu doğrulaması) düzgün çalışmayabilir.",
      ],
    },
    {
      title: "6. Veri Güvenliği",
      content: [
        "Kişisel verileriniz, yetkisiz erişim, kayıp, değişiklik veya ifşayı önlemek amacıyla uygun teknik ve idari tedbirlerle korunmaktadır. Veri işleme faaliyetleri KVKK ve ilgili mevzuata uygun yürütülmektedir.",
      ],
    },
    {
      title: "7. Haklarınız (KVKK m. 11)",
      content: [
        "KVKK’nın 11. maddesi kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK m. 7’deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme, düzeltme ve silme işlemlerinin üçüncü kişilere bildirilmesini isteme, işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
        "Bu haklarınızı kullanmak için veri sorumlusuna (GESPERA) yazılı başvuru yapabilir veya Kişisel Verileri Koruma Kurulu’nun belirlediği usule uygun şekilde talepte bulunabilirsiniz. Başvurularınız, talebin niteliğine göre en geç otuz gün içinde sonuçlandırılacaktır.",
      ],
    },
    {
      title: "8. Politika Değişiklikleri",
      content: [
        "Bu Gizlilik Politikası, yasal düzenlemeler veya şirket politikalarındaki değişiklikler nedeniyle güncellenebilir. Önemli değişiklikler sitede yayımlanarak yürürlüğe girer; gerekirse e-posta veya sitede duyuru ile bilgilendirme yapılabilir.",
      ],
    },
    {
      title: "9. İletişim",
      content: [
        "Gizlilik politikamız veya kişisel verilerinize ilişkin sorularınız için: info@gespera.com adresine e-posta gönderebilir veya veri sorumlusuna yazılı başvuru yapabilirsiniz.",
      ],
    },
  ],
};

const enContent = {
  title: "Privacy Policy",
  sections: [
    {
      title: "1. Data Controller",
      content: [
        "Under the Turkish Law on Protection of Personal Data No. 6698 (“KVKK”), the data controller is YMA Yapı Sistemleri San. ve Tic. Ltd. Şti. (“GESPERA”), located at Hamidiye Mah. Kemerburgaz Cad. No: 152/6, Kağıthane, Istanbul.",
        "This Privacy Policy describes how GESPERA processes personal data collected through the website gespera.com and related subdomains (“Site”).",
      ],
    },
    {
      title: "2. Personal Data Processed and Purposes",
      content: [
        "When you submit the contact form on the Site, we collect your name, email address, phone number, and message content. This data is processed to evaluate your request, respond to you, and conduct commercial communication. Legal basis: KVKK Art. 5/2 – your explicit consent or necessity for the performance of the service.",
        "Cookies and similar technologies may be used for technical security and user experience; use of reCAPTCHA may involve limited data transfer to Google LLC. Legal bases: legitimate interest (security, site operation) and, where required, explicit consent.",
      ],
    },
    {
      title: "3. Transfer of Personal Data",
      content: [
        "Your personal data may be transferred to business partners or abroad only to the extent required by law or for the provision of the service (e.g. hosting, email service, reCAPTCHA for bot protection), in compliance with KVKK and with appropriate safeguards. It is not sold or rented to third parties for commercial purposes.",
      ],
    },
    {
      title: "4. Retention Period",
      content: [
        "Contact form data is retained for as long as necessary to fulfil the purpose of processing and any legal retention obligations. After that period, data is deleted, anonymised, or retained only for archival purposes where required by law.",
      ],
    },
    {
      title: "5. Cookies",
      content: [
        "The Site may use necessary (security, session) and functional cookies. Where Google reCAPTCHA is used, Google’s own cookie and data processing policies apply; use of reCAPTCHA is based on legitimate interest for bot protection.",
        "You may disable cookies in whole or in part in your browser settings; some features (e.g. contact form verification) may then not work properly.",
      ],
    },
    {
      title: "6. Data Security",
      content: [
        "Your personal data is protected by appropriate technical and organisational measures against unauthorised access, loss, alteration, or disclosure. Processing is carried out in accordance with KVKK and applicable law.",
      ],
    },
    {
      title: "7. Your Rights (KVKK Art. 11)",
      content: [
        "Under KVKK Art. 11, you have the right to learn whether your personal data is processed, to request information if it has been processed, to learn the purpose of processing and whether it is used accordingly, to know the third parties to whom it is transferred (in Turkey or abroad), to request rectification if incomplete or incorrect, to request deletion or destruction where the conditions in KVKK Art. 7 are met, to request that rectification or deletion be notified to third parties, to object to any result to your detriment arising from analysis by solely automated means, and to claim compensation for damage arising from unlawful processing.",
        "You may exercise these rights by submitting a written request to the data controller (GESPERA) or in the manner prescribed by the Turkish Personal Data Protection Board. Requests will be concluded within thirty days at the latest.",
      ],
    },
    {
      title: "8. Changes to This Policy",
      content: [
        "This Privacy Policy may be updated due to legal changes or company policy. Material changes will be published on the Site and may be communicated by email or notice on the Site where appropriate.",
      ],
    },
    {
      title: "9. Contact",
      content: [
        "For questions about this policy or your personal data: you may email info@gespera.com or submit a written request to the data controller.",
      ],
    },
  ],
};
