#!/usr/bin/expect -f

set timeout 600
set server "gespera@gespera.com"
set password "D3v!gespera"
set deploy_path "/home/gespera/web/gespera.com"
set app_path "$deploy_path/app"

puts "\n🚀 GESPERA.com Deployment Başlıyor...\n"

# SSH ile bağlan ve dizinleri oluştur
puts "📁 Dizinler oluşturuluyor...\n"
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

send "mkdir -p $app_path\r"
expect "$ "

send "mkdir -p $deploy_path/public_html\r"
expect "$ "

send "exit\r"
expect eof

# Dosyaları rsync ile kopyala
puts "\n📦 Dosyalar sunucuya kopyalanıyor...\n"
spawn rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.env*.local' --exclude '*.log' --exclude 'deploy*.sh' --exclude '.github' ./ $server:$app_path/

expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}

# SSH ile bağlan ve build al
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

send "cd $app_path\r"
expect "$ "

send "pwd\r"
expect "$ "

send "ls -la | head -10\r"
expect "$ "

send "echo '📥 Dependencies yükleniyor...'\r"
expect "$ "

send "npm install\r"
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
send "if command -v pm2 &> /dev/null; then pm2 restart gespera || pm2 start npm --name 'gespera' -- start; pm2 save; else echo '⚠️ PM2 bulunamadı. Manuel başlatın: cd $app_path && npm start'; fi\r"
expect "$ "

send "echo '✅ Deploy tamamlandı!'\r"
expect "$ "

send "exit\r"
expect eof

puts "\n🎉 Deployment başarıyla tamamlandı!\n"
