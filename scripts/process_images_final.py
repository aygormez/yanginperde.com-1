import os
from PIL import Image

TARGET_DIR = "public/images/gespera"
LOGO_PATH = "public/images/gespera-logo-full.png"
BG_COLOR = "#F5F1EB"

# Optimization
MAX_WIDTH = 1920

try:
    logo = Image.open(LOGO_PATH).convert("RGBA")
except:
    print("Logo not found")
    exit(1)

def process_image(img_path):
    try:
        # Check if file exists
        if not os.path.exists(img_path): return

        img = Image.open(img_path).convert("RGBA")
        width, height = img.size

        # 1. Optimize Scale
        if width > MAX_WIDTH:
            ratio = MAX_WIDTH / width
            new_height = int(height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            width, height = MAX_WIDTH, new_height
        
        if width < 200: return

        # 2. Create Right-Bottom Badge
        # Badge height logic: proportional to image height but limited
        badge_height = int(height * 0.12) 
        badge_height = max(70, min(badge_height, 140)) # Min 70px, Max 140px

        # Logo scaling inside badge
        target_logo_h = int(badge_height * 0.65)
        
        logo_aspect = logo.width / logo.height
        target_logo_w = int(target_logo_h * logo_aspect)
        
        logo_resized = logo.resize((target_logo_w, target_logo_h), Image.Resampling.LANCZOS)
        
        # Badge Width: Logo width + padding horizontal
        padding_h = int(target_logo_w * 0.4) 
        badge_width = target_logo_w + padding_h
        
        # Create Badge Background
        badge = Image.new("RGBA", (badge_width, badge_height), BG_COLOR)
        
        # Paste Logo Centered in Badge
        lx = (badge_width - target_logo_w) // 2
        ly = (badge_height - target_logo_h) // 2
        badge.paste(logo_resized, (lx, ly), logo_resized)
        
        # Paste Badge to Image (Right Bottom Alignment)
        paste_x = width - badge_width
        paste_y = height - badge_height
        
        img.paste(badge, (paste_x, paste_y), badge)
        
        # 3. Save as WebP
        new_path = os.path.splitext(img_path)[0] + ".webp"
        img.save(new_path, "WEBP", quality=80)
        
        print(f"Processed: {os.path.basename(new_path)}")
        
        # 4. Remove Original
        if new_path != img_path:
            try:
                os.remove(img_path)
            except: pass
            
    except Exception as e:
        print(f"Error {img_path}: {e}")

# Run
counter = 0
for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')) and not file.startswith('.'):
            process_image(os.path.join(root, file))
            counter += 1
            
print(f"Done. Processed {counter} images.")
