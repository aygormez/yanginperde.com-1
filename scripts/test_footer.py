import os
from PIL import Image

BG_COLOR = "#F5F1EB"
LOGO_PATH = "public/images/gespera-logo-full.png"
TARGET_IMAGE = "public/images/test_footer_demo.png"
FOOTER_RATIO = 0.15
MIN_FOOTER_HEIGHT = 80
MAX_FOOTER_HEIGHT = 150

try:
    img = Image.open(TARGET_IMAGE).convert("RGBA")
    logo = Image.open(LOGO_PATH).convert("RGBA")

    width, height = img.size

    # Footer height
    footer_height = int(height * FOOTER_RATIO)
    footer_height = max(MIN_FOOTER_HEIGHT, min(footer_height, MAX_FOOTER_HEIGHT))

    # Create footer
    footer = Image.new("RGBA", (width, footer_height), BG_COLOR)

    # Resize logo
    logo_w, logo_h = logo.size
    ratio = min(
        (footer_height * 0.7) / logo_h,
        (width * 0.8) / logo_w
    )

    new_logo_w = int(logo_w * ratio)
    new_logo_h = int(logo_h * ratio)

    logo_resized = logo.resize((new_logo_w, new_logo_h), Image.Resampling.LANCZOS)

    # Center logo
    logo_x = (width - new_logo_w) // 2
    logo_y = (footer_height - new_logo_h) // 2

    footer.paste(logo_resized, (logo_x, logo_y), logo_resized)

    # Combine
    new_img = Image.new("RGB", (width, height + footer_height), BG_COLOR)
    new_img.paste(img, (0, 0), img if img.mode == 'RGBA' else None)
    new_img.paste(footer, (0, height))

    new_img.save(TARGET_IMAGE)
    print(f"Processed {TARGET_IMAGE}")
except Exception as e:
    print(f"Error: {e}")
