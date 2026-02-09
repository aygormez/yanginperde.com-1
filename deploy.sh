#!/bin/bash

# GESPERA.com Deployment Script
# Kullanım: ./deploy.sh user@server.com /path/to/deploy

set -e

# Renkli output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parametreleri kontrol et
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}Kullanım: ./deploy.sh user@server.com /path/to/deploy${NC}"
    echo "Örnek: ./deploy.sh root@192.168.1.100 /var/www/gespera"
    exit 1
fi

SERVER=$1
DEPLOY_PATH=$2
REPO_URL="git@github.com:aymez/gespera.git"

echo -e "${GREEN}🚀 GESPERA.com Deployment Başlıyor...${NC}"
echo -e "${YELLOW}Server: ${SERVER}${NC}"
echo -e "${YELLOW}Deploy Path: ${DEPLOY_PATH}${NC}"
echo ""

# Sunucuda gerekli dizinleri oluştur
echo -e "${GREEN}📁 Sunucuda dizinler oluşturuluyor...${NC}"
ssh $SERVER "mkdir -p $DEPLOY_PATH && mkdir -p $DEPLOY_PATH/../app"

# Dosyaları sunucuya kopyala (rsync ile)
echo -e "${GREEN}📦 Dosyalar sunucuya kopyalanıyor...${NC}"
rsync -avz --exclude 'node_modules' \
           --exclude '.next' \
           --exclude '.git' \
           --exclude '.env.local' \
           --exclude '.env*.local' \
           --exclude '*.log' \
           ./ $SERVER:$DEPLOY_PATH/

# Sunucuda build ve deploy işlemleri
echo -e "${GREEN}🔨 Sunucuda build alınıyor...${NC}"
ssh $SERVER << EOF
    set -e
    cd $DEPLOY_PATH
    
    # Node.js ve npm kontrolü
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js bulunamadı! Lütfen Node.js 18+ yükleyin.${NC}"
        echo -e "${YELLOW}   Kurulum: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs${NC}"
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
    
    # Dependencies yükle
    echo -e "${YELLOW}📥 Dependencies yükleniyor...${NC}"
    npm install --production=false
    
    # Build al
    echo -e "${YELLOW}🔨 Build alınıyor...${NC}"
    npm run build
    
    # PM2 ile restart (eğer PM2 kuruluysa)
    if command -v pm2 &> /dev/null; then
        echo -e "${YELLOW}🔄 PM2 ile restart ediliyor...${NC}"
        pm2 restart gespera || pm2 start npm --name "gespera" -- start
        pm2 save
    else
        echo -e "${YELLOW}⚠️  PM2 bulunamadı. Manuel olarak 'npm start' çalıştırmanız gerekiyor.${NC}"
        echo -e "${YELLOW}   PM2 kurmak için: npm install -g pm2${NC}"
    fi
    
    echo -e "${GREEN}✅ Deploy tamamlandı!${NC}"
EOF

echo -e "${GREEN}🎉 Deployment başarıyla tamamlandı!${NC}"
