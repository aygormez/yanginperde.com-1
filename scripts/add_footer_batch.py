import os
from PIL import Image

BG_COLOR = "#F5F1EB"
LOGO_PATH = "public/images/gespera-logo-full.png"
TARGET_DIR = "public/images/gespera"
FOOTER_RATIO = 0.15
MIN_FOOTER_HEIGHT = 100
MAX_FOOTER_HEIGHT = 180

try:
    logo = Image.open(LOGO_PATH).convert("RGBA")
except Exception as e:
    print(f"Logo açılamadı: {e}")
    exit(1)

def process_image(img_path):
    try:
        # Check image dimensions first to avoid reprocessing processed images if possible
        # (A simple check isn't foolproof without metadata, so we just overwrite)
        
        img = Image.open(img_path).convert("RGBA")
        width, height = img.size
        
        # Skip small images (icons etc)
        if width < 200 or height < 200:
            print(f"Atlandı (çok küçük): {img_path}")
            return

        footer_height = int(height * FOOTER_RATIO)
        footer_height = max(MIN_FOOTER_HEIGHT, min(footer_height, MAX_FOOTER_HEIGHT))
        
        footer = Image.new("RGBA", (width, footer_height), BG_COLOR)
        
        logo_w, logo_h = logo.size
        # Scale logo to fit footer with padding
        ratio = min(
            (footer_height * 0.6) / logo_h, # 0.6 to leave vertical padding
            (width * 0.8) / logo_w          # 0.8 to leave horizontal padding
        )
        
        new_logo_w = int(logo_w * ratio)
        new_logo_h = int(logo_h * ratio)
        
        if new_logo_w < 1 or new_logo_h < 1:
            print(f"Atlandı (logo sığmadı): {img_path}")
            return

        logo_resized = logo.resize((new_logo_w, new_logo_h), Image.Resampling.LANCZOS)
        
        logo_x = (width - new_logo_w) // 2
        logo_y = (footer_height - new_logo_h) // 2
        
        footer.paste(logo_resized, (logo_x, logo_y), logo_resized)
        
        new_img = Image.new("RGB", (width, height + footer_height), BG_COLOR)
        new_img.paste(img, (0, 0), img if img.mode == 'RGBA' else None)
        new_img.paste(footer, (0, height))
        
        # Overwrite
        if img_path.lower().endswith(('.jpg', '.jpeg')):
             new_img.save(img_path, quality=95)
        else:
             new_img.save(img_path)
             
        print(f"İşlendi: {img_path}")
    except Exception as e:
        print(f"Hata {img_path}: {e}")

counter = 0
for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')) and not file.startswith('.'):
            process_image(os.path.join(root, file))
            counter += 1

print(f"Toplam {counter} resim başarıyla güncellendi.")
