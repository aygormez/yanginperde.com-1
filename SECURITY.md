# 🔒 Güvenlik Dokümantasyonu

## Uygulanan Güvenlik Önlemleri

### 1. Node.js Uygulaması Güvenliği

✅ **Sadece localhost'ta dinleme:**
- `npm start` komutu `-H 127.0.0.1` parametresi ile sadece localhost'ta dinler
- Dış arayüzlerden erişim engellenir
- Sadece reverse proxy (Apache/Nginx) üzerinden erişilebilir

### 2. Apache .htaccess Güvenlik Ayarları

✅ **Güvenlik başlıkları:**
- `X-Content-Type-Options: nosniff` - MIME type sniffing engelleme
- `X-Frame-Options: SAMEORIGIN` - Clickjacking koruması
- `X-XSS-Protection` - XSS koruması
- `Referrer-Policy` - Referrer bilgisi kontrolü
- `Permissions-Policy` - Tarayıcı özelliklerini kısıtlama

✅ **Dosya erişim kısıtlamaları:**
- `.env` dosyalarına erişim engellendi
- Gizli dosyalara (`.` ile başlayan) erişim engellendi

✅ **Proxy güvenliği:**
- Sadece localhost'tan (127.0.0.1) proxy kabul edilir
- Dış IP'lerden doğrudan Node.js portuna erişim engellenir

### 3. Dosya İzinleri

✅ **Güvenli dosya izinleri:**
- `.env.local`: `600` (sadece sahibi okuyabilir/yazabilir)
- `app/` dizini: `700` (sadece sahibi erişebilir)
- `public_html/`: Standart web sunucu izinleri

### 4. Environment Variables

✅ **Güvenli saklama:**
- `.env.local` dosyası `.gitignore` içinde
- Production'da `.env.local` dosyası `600` izni ile korunur
- Hassas bilgiler (API keys, secrets) environment variables'da saklanır

### 5. Deploy Güvenliği

✅ **Deploy script güvenlik önlemleri:**
- `.env.local` dosyası deploy edilmez
- `.git` klasörü deploy edilmez
- Log dosyaları deploy edilmez
- `node_modules` deploy edilmez (sunucuda yeniden yüklenir)

## ⚠️ Güvenlik Kontrol Listesi

### Deploy Öncesi

- [ ] `.env.local` dosyasında gerçek production değerleri var mı?
- [ ] reCAPTCHA site key doğru mu?
- [ ] `NEXT_PUBLIC_SITE_URL` doğru domain'e ayarlı mı?
- [ ] Node.js uygulaması sadece localhost'ta mı dinliyor?

### Deploy Sonrası

- [ ] `.env.local` dosyası `600` izni ile korunuyor mu?
- [ ] `app/` dizini `700` izni ile korunuyor mu?
- [ ] Node.js uygulaması sadece `127.0.0.1:3000` adresinde mi çalışıyor?
- [ ] `.htaccess` dosyası doğru şekilde yapılandırılmış mı?
- [ ] Güvenlik başlıkları tarayıcıda görünüyor mu? (Developer Tools > Network > Headers)

### Düzenli Kontroller

- [ ] Node.js ve npm güncel versiyonlarda mı?
- [ ] Bağımlılıklar güvenlik açıkları için kontrol edildi mi? (`npm audit`)
- [ ] Log dosyaları düzenli olarak temizleniyor mu?
- [ ] Yedeklemeler düzenli olarak alınıyor mu?

## 🔍 Güvenlik Testleri

### 1. Port Kontrolü

```bash
# Node.js uygulamasının sadece localhost'ta dinlediğini kontrol et
netstat -tlnp | grep 3000
# Çıktı: tcp 127.0.0.1:3000 olmalı (0.0.0.0:3000 OLMAMALI)
```

### 2. Dosya İzinleri Kontrolü

```bash
# .env.local dosyası kontrolü
ls -la ~/web/gespera.com/app/.env.local
# Çıktı: -rw------- (600) olmalı

# app dizini kontrolü
ls -ld ~/web/gespera.com/app
# Çıktı: drwx------ (700) olmalı
```

### 3. Güvenlik Başlıkları Kontrolü

Tarayıcı Developer Tools'da:
1. Network sekmesine git
2. Herhangi bir istek seç
3. Headers sekmesinde güvenlik başlıklarını kontrol et

### 4. .env Dosyası Erişim Testi

Tarayıcıda şu URL'yi deneyin (erişim engellenmeli):
```
https://gespera.com/.env.local
https://gespera.com/app/.env.local
```

## 🚨 Güvenlik Açığı Bulunursa

1. **Hemen Node.js uygulamasını durdurun:**
   ```bash
   pm2 stop gespera
   # veya
   pkill -f "next start"
   ```

2. **Güvenlik açığını tespit edin ve düzeltin**

3. **Gerekirse tüm şifreleri ve API key'leri değiştirin**

4. **Uygulamayı güvenli şekilde yeniden başlatın**

## 📚 Ek Kaynaklar

- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## 🔐 İletişim

Güvenlik açığı bulursanız lütfen hemen bildirin:
- Email: info@gespera.com
