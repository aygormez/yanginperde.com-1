#!/bin/bash

# GESPERA.com Shared Hosting Deployment Script
# Kullanım: ./deploy-shared.sh gespera@aymez /home/gespera/web/gespera.com

set -e

# Renkli output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parametreleri kontrol et
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}Kullanım: ./deploy-shared.sh user@server.com /path/to/web/gespera.com${NC}"
    echo "Örnek: ./deploy-shared.sh gespera@aymez /home/gespera/web/gespera.com"
    exit 1
fi

SERVER=$1
WEB_PATH=$2
APP_PATH="$WEB_PATH/app"
PUBLIC_HTML="$WEB_PATH/public_html"

echo -e "${GREEN}🚀 GESPERA.com Shared Hosting Deployment Başlıyor...${NC}"
echo -e "${YELLOW}Server: ${SERVER}${NC}"
echo -e "${YELLOW}Web Path: ${WEB_PATH}${NC}"
echo -e "${YELLOW}App Path: ${APP_PATH}${NC}"
echo -e "${YELLOW}Public HTML: ${PUBLIC_HTML}${NC}"
echo ""

# Sunucuda gerekli dizinleri oluştur
echo -e "${GREEN}📁 Sunucuda dizinler oluşturuluyor...${NC}"
ssh $SERVER "mkdir -p $APP_PATH && mkdir -p $PUBLIC_HTML"

# Dosyaları sunucuya kopyala (rsync ile)
echo -e "${GREEN}📦 Dosyalar sunucuya kopyalanıyor...${NC}"
rsync -avz --exclude 'node_modules' \
           --exclude '.next' \
           --exclude '.git' \
           --exclude '.env.local' \
           --exclude '.env*.local' \
           --exclude '*.log' \
           --exclude 'deploy*.sh' \
           ./ $SERVER:$APP_PATH/

# Sunucuda build ve deploy işlemleri
echo -e "${GREEN}🔨 Sunucuda build alınıyor...${NC}"
ssh $SERVER << EOF
    set -e
    cd $APP_PATH
    
    # Node.js ve npm kontrolü
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js bulunamadı! Lütfen Node.js 18+ yükleyin.${NC}"
        exit 1
    fi
    
    # Node.js versiyon kontrolü (18+ gerekli)
    NODE_VERSION=\$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "\$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js versiyonu çok eski! Node.js 18+ gerekli. Mevcut versiyon: \$(node -v)${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Node.js versiyonu: \$(node -v)${NC}"
    echo -e "${GREEN}✅ npm versiyonu: \$(npm -v)${NC}"
    
    # Environment variables kontrolü
    if [ ! -f .env.local ]; then
        echo -e "${YELLOW}⚠️  .env.local dosyası bulunamadı. Oluşturuluyor...${NC}"
        cat > .env.local << ENVFILE
NEXT_PUBLIC_SITE_URL=https://gespera.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
ENVFILE
        echo -e "${YELLOW}⚠️  Lütfen .env.local dosyasını düzenleyin: nano $APP_PATH/.env.local${NC}"
    fi
    
    # Dependencies yükle
    echo -e "${YELLOW}📥 Dependencies yükleniyor...${NC}"
    npm install --production=false
    
    # Build al (static export)
    echo -e "${YELLOW}🔨 Build alınıyor (static export)...${NC}"
    npm run build
    
    # Static export kontrolü
    if [ -d "out" ]; then
        echo -e "${GREEN}✅ Static export başarılı! out/ klasörü oluşturuldu.${NC}"
        
        # public_html'e static dosyaları kopyala
        echo -e "${YELLOW}📤 Static dosyalar public_html'e kopyalanıyor...${NC}"
        rsync -av --delete out/ $PUBLIC_HTML/
        
        # Root index.html oluştur (next-intl root'ta index.html oluşturmaz)
        echo -e "${YELLOW}📝 Root index.html oluşturuluyor...${NC}"
        cat > $PUBLIC_HTML/index.html << 'INDEXHTML'
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GESPERA - Yönlendiriliyor...</title>
    <script>
        const lang = navigator.language || navigator.userLanguage;
        const preferredLang = lang.startsWith('tr') ? 'tr' : 'en';
        window.location.href = '/' + preferredLang;
    </script>
    <meta http-equiv="refresh" content="0; url=/tr">
</head>
<body>
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
        <h1>GESPERA</h1>
        <p>Yönlendiriliyor...</p>
        <p><a href="/tr">Türkçe</a> | <a href="/en">English</a></p>
    </div>
</body>
</html>
INDEXHTML

        # tr/ ve en/ klasörlerine index.html kopyala
        echo -e "${YELLOW}📝 Dil klasörlerine index.html oluşturuluyor...${NC}"
        cp $PUBLIC_HTML/tr.html $PUBLIC_HTML/tr/index.html 2>/dev/null || true
        cp $PUBLIC_HTML/en.html $PUBLIC_HTML/en/index.html 2>/dev/null || true
        
        # Tüm .html dosyalarını ilgili klasör/index.html olarak kopyala
        echo -e "${YELLOW}📝 Alt sayfa index.html dosyaları oluşturuluyor...${NC}"
        for locale in tr en; do
            cd $PUBLIC_HTML/$locale
            for f in *.html; do
                name="\${f%.html}"
                if [ -d "\$name" ] && [ ! -f "\$name/index.html" ]; then
                    cp "\$f" "\$name/index.html"
                fi
            done
            # Ürün detay sayfaları
            if [ -d "urunler" ]; then
                cd urunler
                for f in *.html; do
                    name="\${f%.html}"
                    if [ -d "\$name" ] && [ ! -f "\$name/index.html" ]; then
                        cp "\$f" "\$name/index.html"
                    fi
                done
                cd ..
            fi
            cd $PUBLIC_HTML
        done
        
        # Root seviye yönlendirme sayfaları oluştur
        echo -e "${YELLOW}📝 Root seviye yönlendirme sayfaları oluşturuluyor...${NC}"
        for page in urunler hakkimizda iletisim projeler gizlilik-politikasi kullanim-sartlari; do
            mkdir -p $PUBLIC_HTML/\$page
            cat > $PUBLIC_HTML/\$page/index.html << REDIRECTHTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>GESPERA - Yönlendiriliyor</title>
<script>
const lang = (navigator.language || 'tr').startsWith('en') ? 'en' : 'tr';
window.location.href = '/' + lang + '/\$page';
</script>
<meta http-equiv="refresh" content="0; url=/tr/\$page">
</head>
<body><p>Yönlendiriliyor...</p></body>
</html>
REDIRECTHTML
        done
        
        # Dosya izinlerini düzelt
        echo -e "${YELLOW}🔒 Dosya izinleri ayarlanıyor...${NC}"
        find $PUBLIC_HTML -type d -exec chmod 755 {} \;
        find $PUBLIC_HTML -type f -exec chmod 644 {} \;
        
        echo -e "${GREEN}✅ Static dosyalar public_html'e kopyalandı!${NC}"
    else
        echo -e "${YELLOW}⚠️  Static export kullanılmıyor. Node.js server modu.${NC}"
        
        # Mevcut Node.js process'i durdur
        echo -e "${YELLOW}🛑 Mevcut Node.js process durduruluyor...${NC}"
        pkill -f "node.*next" 2>/dev/null || true
        pkill -f "npm.*start" 2>/dev/null || true
        fuser -k 3000/tcp 2>/dev/null || true
        sleep 2
        
        # PM2 ile restart (eğer PM2 kuruluysa)
        if command -v pm2 &> /dev/null; then
            echo -e "${YELLOW}🔄 PM2 ile başlatılıyor...${NC}"
            pm2 delete gespera 2>/dev/null || true
            pm2 start npm --name "gespera" -- start
            pm2 save
            echo -e "${GREEN}✅ PM2 ile başlatıldı${NC}"
        else
            # PM2 yoksa nohup ile başlat
            echo -e "${YELLOW}⚠️  PM2 bulunamadı. nohup ile başlatılıyor...${NC}"
            cd $APP_PATH
            nohup npm start > /tmp/gespera.log 2>&1 &
            sleep 3
            
            # Başarılı mı kontrol et
            if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000 | grep -q "200\|302\|301"; then
                echo -e "${GREEN}✅ Node.js başarıyla başlatıldı (port 3000)${NC}"
            else
                echo -e "${YELLOW}⚠️  Node.js başlatılıyor, birkaç saniye bekleyin...${NC}"
            fi
            
            echo -e "${BLUE}📋 Log dosyası: /tmp/gespera.log${NC}"
        fi
    fi
    
    # public_html içine güvenli .htaccess oluştur
    echo -e "${YELLOW}📝 Güvenli .htaccess dosyası oluşturuluyor...${NC}"
    cat > $PUBLIC_HTML/.htaccess << HTACCESS
# Güvenlik başlıkları
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Dosya erişimlerini kısıtla
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# .env dosyalarına erişimi engelle
<FilesMatch "\.env">
    Order allow,deny
    Deny from all
</FilesMatch>

# Next.js Node.js uygulamasına güvenli proxy
RewriteEngine On
RewriteBase /

# Sadece localhost'tan proxy kabul et (güvenlik)
RewriteCond %{REMOTE_ADDR} ^127\.0\.0\.1$ [OR]
RewriteCond %{REMOTE_ADDR} ^::1$

# Statik dosyalar için doğrudan servis et
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Tüm istekleri Node.js uygulamasına yönlendir (sadece localhost)
RewriteRule ^(.*)$ http://127.0.0.1:3000/\$1 [P,L]

# Veya eğer hosting sağlayıcınız farklı bir port kullanıyorsa:
# RewriteRule ^(.*)$ http://127.0.0.1:PORT_NUMBER/\$1 [P,L]
HTACCESS
    
    # Güvenlik: .env dosyalarının izinlerini kısıtla
    echo -e "${YELLOW}🔒 Dosya izinleri ayarlanıyor...${NC}"
    chmod 600 $APP_PATH/.env.local 2>/dev/null || true
    chmod 700 $APP_PATH 2>/dev/null || true
    
    # Güvenlik: Hassas dosyaları kontrol et
    echo -e "${YELLOW}🔍 Güvenlik kontrolleri yapılıyor...${NC}"
    
    # .env.local dosyasının varlığını kontrol et
    if [ -f $APP_PATH/.env.local ]; then
        # Dosya izinlerini kontrol et
        PERMS=\$(stat -c "%a" $APP_PATH/.env.local 2>/dev/null || stat -f "%OLp" $APP_PATH/.env.local 2>/dev/null)
        if [ "\$PERMS" != "600" ]; then
            echo -e "${YELLOW}⚠️  .env.local dosyası izinleri güvenli değil. Düzeltiliyor...${NC}"
            chmod 600 $APP_PATH/.env.local
        fi
        echo -e "${GREEN}✅ .env.local dosyası güvenli${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.local dosyası bulunamadı. Oluşturuldu.${NC}"
    fi
    
    # Node.js uygulamasının sadece localhost'ta dinlediğini kontrol et
    echo -e "${YELLOW}🔍 Node.js güvenlik kontrolü...${NC}"
    echo -e "${GREEN}✅ Node.js uygulaması 'npm start' ile sadece 127.0.0.1:3000'de dinleyecek${NC}"
    
    echo -e "${GREEN}✅ Deploy tamamlandı!${NC}"
    echo -e "${BLUE}📋 Sonraki adımlar:${NC}"
    echo -e "${BLUE}   1. .env.local dosyasını düzenleyin: nano $APP_PATH/.env.local${NC}"
    echo -e "${BLUE}   2. Node.js uygulamasını başlatın: cd $APP_PATH && npm start${NC}"
    echo -e "${BLUE}   3. Veya PM2 ile: pm2 start npm --name 'gespera' -- start${NC}"
    echo -e "${BLUE}   4. Hosting panelinden Node.js uygulamasını aktif edin (eğer varsa)${NC}"
EOF

echo -e "${GREEN}🎉 Deployment başarıyla tamamlandı!${NC}"
