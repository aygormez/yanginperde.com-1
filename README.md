# YANGIN PERDE - Premium Gölgelendirme Sistemleri

Premium kurumsal web sitesi - Yangın perdesi, duman perdesi ve konveyör sistemleri.

## 🚀 Teknolojiler

- **Framework:** Next.js 14+ (App Router)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **Animasyonlar:** Framer Motion
- **i18n:** next-intl (Türkçe/İngilizce)
- **Optimizasyon:** next/image, next/font

## 📁 Proje Yapısı

\`\`\`
src/
├── app/
│   ├── [locale]/          # Dil bazlı sayfalar
│   │   ├── urunler/       # Ürünler
│   │   ├── hakkimizda/    # Hakkımızda
│   │   ├── projeler/      # Projeler
│   │   ├── iletisim/      # İletişim
│   │   └── ...
│   ├── robots.ts
│   ├── sitemap.ts
│   └── globals.css
├── components/
│   ├── layout/            # Header, Footer, vb.
│   ├── ui/                # Reusable UI bileşenleri
│   ├── sections/          # Sayfa sectionları
│   └── shared/            # Ortak bileşenler
├── data/                  # Statik veri dosyaları
├── i18n/                  # Çeviri dosyaları
├── lib/                   # Utility fonksiyonlar
└── types/                 # TypeScript tipleri
\`\`\`

## 🛠️ Kurulum

\`\`\`bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start
\`\`\`

## 🌐 Dil Desteği

- Türkçe (varsayılan): \`/\`
- İngilizce: \`/en\`

## 📱 Sayfalar

| Sayfa | TR URL | EN URL |
|-------|--------|--------|
| Ana Sayfa | \`/\` | \`/en\` |
| Ürünler | \`/urunler\` | \`/en/urunler\` |
| Ürün Detay | \`/urunler/[slug]\` | \`/en/urunler/[slug]\` |
| Hakkımızda | \`/hakkimizda\` | \`/en/hakkimizda\` |
| Projeler | \`/projeler\` | \`/en/projeler\` |
| İletişim | \`/iletisim\` | \`/en/iletisim\` |
| Gizlilik | \`/gizlilik-politikasi\` | \`/en/gizlilik-politikasi\` |
| Şartlar | \`/kullanim-sartlari\` | \`/en/kullanim-sartlari\` |

## 🎨 Renk Paleti

\`\`\`css
/* Ana Renkler */
--gold-primary: #C4A35A;    /* Altın/Bronz */
--cream: #F5F0E8;           /* Krem */
--anthracite: #2D2D2D;      /* Antrasit */
\`\`\`

## ⚡ Performans Hedefleri

- Lighthouse Performance: 90+
- Lighthouse SEO: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## 📧 İletişim

- **Website:** [yanginperde.com](https://yanginperde.com)
- **Email:** info@yanginperde.com

## 🤖 Otomatik Deploy (CI/CD)

Bu proje **GitHub Actions** kullanarak otomatik deploy yapar:

- ✅ **main** branch'e commit push edildiğinde
- ✅ **main** branch'e merge edilen Pull Request'lerde

### Kurulum

Detaylı kurulum rehberi için: [\`.github/DEPLOY_SETUP.md\`](.github/DEPLOY_SETUP.md)

**Hızlı Başlangıç:**
1. GitHub repository > Settings > Secrets and variables > Actions
2. Gerekli secret'ları ekleyin (SSH_PRIVATE_KEY, SSH_USER, SSH_HOST, DEPLOY_PATH, vb.)
3. **main** branch'e push yapın → Otomatik deploy başlar! 🚀

## 🚀 Production Deployment (Manuel)

### Sunucu Gereksinimleri

- **Node.js:** 18+ 
- **npm:** 9+
- **PM2:** (Önerilir) Process manager için

### Hızlı Deploy

1. **Deploy script'ini çalıştırın:**
\`\`\`bash
./deploy.sh user@server.com /path/to/deploy
\`\`\`

Örnek:
\`\`\`bash
./deploy.sh root@192.168.1.100 /var/www/yanginperde
\`\`\`

### Manuel Deploy

1. **Sunucuya bağlanın:**
\`\`\`bash
ssh user@server.com
\`\`\`

2. **Repository'yi klonlayın:**
\`\`\`bash
cd /var/www
git clone git@github.com:aymez/yanginperde.com.git yanginperde
cd yanginperde
\`\`\`

3. **Environment variables oluşturun:**
\`\`\`bash
nano .env.local
\`\`\`

Gerekli değişkenler:
\`\`\`env
NEXT_PUBLIC_SITE_URL=https://yanginperde.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
\`\`\`

4. **Dependencies yükleyin ve build alın:**
\`\`\`bash
npm install
npm run build
\`\`\`

5. **PM2 ile başlatın:**
\`\`\`bash
pm2 start npm --name "yanginperde" -- start
pm2 save
pm2 startup  # Sistem açılışında otomatik başlatma için
\`\`\`

### Nginx Reverse Proxy Örneği

\`\`\`nginx
server {
    listen 80;
    server_name yanginperde.com www.yanginperde.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

### SSL Sertifikası (Let's Encrypt)

\`\`\`bash
sudo certbot --nginx -d yanginperde.com -d www.yanginperde.com
\`\`\`

## 📝 Lisans

© 2024 YMA Yapı Sistemleri San. ve Tic. Ltd. Şti. Tüm hakları saklıdır.
