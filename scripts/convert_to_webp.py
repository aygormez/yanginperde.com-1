import os
from PIL import Image

TARGET_DIR = "public/images/gespera"
SOURCE_CODE_DIR = "src"

# Dosya referanslarını güncelleyecek fonksiyon
def replace_in_files(old_path, new_path):
    # Kodda geçen yol formatını bul (public kısmını atarak)
    # Örn: public/images/gespera/x.png -> /images/gespera/x.png
    old_str = old_path.replace("public", "") 
    new_str = new_path.replace("public", "")
    
    for root, dirs, files in os.walk(SOURCE_CODE_DIR):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if old_str in content:
                        new_content = content.replace(old_str, new_str)
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    pass

def convert_to_webp(img_path):
    try:
        if img_path.lower().endswith('.webp'):
            return

        # Resmi aç
        img = Image.open(img_path)
        
        # Eğer RGBA ise (transparan) ve JPG dönüşümü yapılacaksa sorun olur ama WebP destekler.
        # Yine de photos için RGB daha iyi olabilir ama transparency varsa koruyalım.
        
        new_path = os.path.splitext(img_path)[0] + ".webp"
        
        # WebP olarak kaydet
        img.save(new_path, "WEBP", quality=80, method=6) # method=6 en yavaş ama en iyi sıkıştırma
        
        print(f"Converted: {img_path} -> {new_path}")
        
        # Koddaki referansları güncelle
        replace_in_files(img_path, new_path)
        
        # Orijinali sil
        os.remove(img_path)
        
    except Exception as e:
        print(f"Error {img_path}: {e}")

counter = 0
for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')) and not file.startswith('.'):
            convert_to_webp(os.path.join(root, file))
            counter += 1

print(f"Toplam {counter} görsel WebP formatına dönüştürüldü ve kod güncellendi.")
