#!/usr/bin/expect -f

# GESPERA.com Hızlı Deploy Script (Şifre ile)
set timeout 300

set server "gespera@aymez.com"
set password "D3v!gespera"
set deploy_path "/home/gespera/web/gespera.com"
set app_path "$deploy_path/app"
set public_html "$deploy_path/public_html"

puts "\n🚀 GESPERA.com Deployment Başlıyor...\n"

# Dosyaları rsync ile kopyala
puts "📦 Dosyalar sunucuya kopyalanıyor...\n"
spawn rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.env.local' --exclude '.env*.local' --exclude '*.log' --exclude 'deploy*.sh' ./ $server:$app_path/

expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}

# SSH ile sunucuya bağlan ve deploy işlemlerini yap
puts "\n🔨 Sunucuda build alınıyor...\n"
spawn ssh -p 22 $server

expect {
    "password:" {
        send "$password\r"
    }
    "(yes/no)?" {
        send "yes\r"
        expect "password:"
        send "$password\r"
    }
}

expect "$ "

# Sunucuda deploy işlemleri
send "cd $app_path\r"
expect "$ "

send "echo '📥 Dependencies yükleniyor...'\r"
expect "$ "

send "npm install --production=false\r"
expect {
    "$ " {}
    timeout { puts "⚠️ npm install timeout" }
}

send "echo '🔨 Build alınıyor...'\r"
expect "$ "

send "npm run build\r"
expect {
    "$ " {}
    timeout { puts "⚠️ npm build timeout" }
}

send "echo '🔒 Dosya izinleri ayarlanıyor...'\r"
expect "$ "

send "chmod 600 .env.local 2>/dev/null || true\r"
expect "$ "

send "chmod 700 . 2>/dev/null || true\r"
expect "$ "

# PM2 ile restart
send "if command -v pm2 &> /dev/null; then pm2 restart gespera || pm2 start npm --name 'gespera' -- start; pm2 save; else echo '⚠️ PM2 bulunamadı. Manuel başlatın: npm start'; fi\r"
expect "$ "

send "echo '✅ Deploy tamamlandı!'\r"
expect "$ "

send "exit\r"
expect eof

puts "\n🎉 Deployment başarıyla tamamlandı!\n"
