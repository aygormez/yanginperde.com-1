# 🚀 Otomatik Deploy Kurulum Rehberi

## 📋 Genel Bakış

Bu proje, GitHub Actions kullanarak **main** branch'e commit veya merge olduğunda otomatik olarak production sunucusuna deploy yapar.

## 🔧 Kurulum Adımları

### 1. SSH Key Oluşturma

Sunucuda SSH key oluşturun (eğer yoksa):

```bash
# Lokal makinenizde
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Public key'i sunucuya kopyalayın
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub gespera@aymez
```

**VEYA** sunucuda manuel olarak:

```bash
# Sunucuda
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Public key'i buraya yapıştırın
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### 2. GitHub Secrets Ayarlama

GitHub repository'nize gidin:
1. **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** butonuna tıklayın
3. Aşağıdaki secret'ları ekleyin:

#### Gerekli Secrets:

| Secret Adı | Açıklama | Örnek Değer |
|------------|----------|-------------|
| `SSH_PRIVATE_KEY` | SSH private key (tam içerik) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SSH_USER` | SSH kullanıcı adı | `gespera` |
| `SSH_HOST` | Sunucu adresi/IP | `aymez` veya `192.168.1.100` |
| `DEPLOY_PATH` | Deploy path | `/home/gespera/web/gespera.com` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `https://gespera.com` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key | `6LfXFmQsAAAAACfYiYNA4zSDPU2IhdpZmczqSY8_` |

### 3. SSH Private Key'i GitHub'a Ekleme

**ÖNEMLİ:** Private key'i **ASLA** commit etmeyin!

```bash
# Private key'i kopyalayın (tam içerik)
cat ~/.ssh/github_actions_deploy

# Çıktıyı GitHub Secrets > SSH_PRIVATE_KEY'e yapıştırın
```

### 4. Test Etme

1. **main** branch'e bir commit push edin:
   ```bash
   git add .
   git commit -m "test: GitHub Actions deploy test"
   git push origin main
   ```

2. GitHub'da **Actions** sekmesine gidin
3. Workflow'un çalıştığını kontrol edin
4. Yeşil tik görürseniz deploy başarılı! ✅

## 🔍 Troubleshooting

### SSH Bağlantı Hatası

```
Error: Permission denied (publickey)
```

**Çözüm:**
- SSH key'in doğru olduğundan emin olun
- `SSH_USER` ve `SSH_HOST` değerlerini kontrol edin
- Sunucuda `~/.ssh/authorized_keys` dosyasını kontrol edin

### Build Hatası

```
Error: npm run build failed
```

**Çözüm:**
- `NEXT_PUBLIC_SITE_URL` ve `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` secret'larını kontrol edin
- Lokal olarak `npm run build` çalıştırıp hataları kontrol edin

### Deploy Path Hatası

```
Error: No such file or directory
```

**Çözüm:**
- `DEPLOY_PATH` değerini kontrol edin
- Sunucuda path'in var olduğundan emin olun: `ssh gespera@aymez "ls -la /home/gespera/web/gespera.com"`

## 📝 Workflow Detayları

### Ne Zaman Çalışır?

- ✅ **main** branch'e direkt push
- ✅ **main** branch'e merge edilen Pull Request
- ❌ Sadece açılan PR (merge edilmeden)

### Ne Yapar?

1. ✅ Kodu checkout eder
2. ✅ Node.js 20 kurar
3. ✅ Dependencies yükler (`npm ci`)
4. ✅ Build alır (`npm run build`)
5. ✅ SSH ile sunucuya bağlanır
6. ✅ Deploy script'ini çalıştırır
7. ✅ Deployment'ı doğrular

## 🔒 Güvenlik

- ✅ SSH key'ler GitHub Secrets'ta güvenli saklanır
- ✅ Private key asla commit edilmez
- ✅ Environment variables secrets'ta saklanır
- ✅ Sadece main branch'e deploy yapılır

## 🎯 İleri Seviye

### Farklı Branch'ler İçin Farklı Sunucular

`.github/workflows/deploy.yml` dosyasını düzenleyerek:
- `staging` branch → staging sunucusu
- `main` branch → production sunucusu

### Slack/Discord Bildirimleri

Workflow'a bildirim adımları ekleyebilirsiniz.

## 📚 Kaynaklar

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SSH Key Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
