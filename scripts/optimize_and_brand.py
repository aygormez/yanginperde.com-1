import os
from PIL import Image

BG_COLOR = "#F5F1EB"
LOGO_PATH = "public/images/gespera-logo-full.png"
TARGET_DIR = "public/images/gespera"

# Banner Settings
FOOTER_RATIO = 0.15
MIN_FOOTER_HEIGHT = 100
MAX_FOOTER_HEIGHT = 180

# Optimization Settings
MAX_WIDTH = 1920
JPEG_QUALITY = 85

try:
    logo = Image.open(LOGO_PATH).convert("RGBA")
except Exception as e:
    print(f"Logo açılamadı: {e}")
    exit(1)

def process_image(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        width, height = img.size
        
        # --- STEP 1: OPTIMIZE (RESIZE) ---
        if width > MAX_WIDTH:
            ratio = MAX_WIDTH / width
            new_height = int(height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            # print(f"Resized {width} -> {MAX_WIDTH}: {os.path.basename(img_path)}")
            width, height = MAX_WIDTH, new_height
        
        # Check size again to skip too small images
        if width < 200 or height < 200:
            return

        # --- STEP 2: ADD BRANDING (OVERLAY) ---
        footer_height = int(height * FOOTER_RATIO)
        footer_height = max(MIN_FOOTER_HEIGHT, min(footer_height, MAX_FOOTER_HEIGHT))
        
        footer = Image.new("RGBA", (width, footer_height), BG_COLOR)
        
        logo_w, logo_h = logo.size
        logo_scale_ratio = min(
            (footer_height * 0.6) / logo_h,
            (width * 0.8) / logo_w
        )
        
        new_logo_w = int(logo_w * logo_scale_ratio)
        if new_logo_w < 1: return
        new_logo_h = int(logo_h * logo_scale_ratio)
        
        logo_resized = logo.resize((new_logo_w, new_logo_h), Image.Resampling.LANCZOS)
        
        logo_x = (width - new_logo_w) // 2
        logo_y = (footer_height - new_logo_h) // 2
        
        footer.paste(logo_resized, (logo_x, logo_y), logo_resized)
        
        # Paste footer OVER the image at the bottom
        paste_y = height - footer_height
        img.paste(footer, (0, paste_y), footer)
        
        # --- STEP 3: SAVE ---
        if img_path.lower().endswith(('.jpg', '.jpeg')):
             img.convert("RGB").save(img_path, quality=JPEG_QUALITY, optimize=True)
        else:
             img.save(img_path, optimize=True)
             
        print(f"Processed: {img_path}")
        
    except Exception as e:
        print(f"Error {img_path}: {e}")

counter = 0
for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')) and not file.startswith('.'):
            process_image(os.path.join(root, file))
            counter += 1

print(f"Toplam {counter} resim optimize edildi ve markalandı.")
