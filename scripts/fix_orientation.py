from PIL import Image, ImageOps
import os

src_dir = 'images/team'
out_dir = 'public/images/team'

mapping = {
    'alimova': 'alimova.jpg',
    'servin': 'servin.jpg',
    'abdullayeva': 'abdullayeva.jpg',
    'abdullaeva': 'abdullayeva.jpg',
    'osman': 'osman.jpg',
    'mesut': 'mesut.jpg',
    'gurkan': 'gurkan.jpg',
    'yurtd': 'gurkan.jpg',
    'nortojiyeva': 'nortojiyeva.jpg',
}

os.makedirs(out_dir, exist_ok=True)

for name in os.listdir(src_dir):
    low = name.lower()
    dest = None
    for key, out_name in mapping.items():
        if key in low:
            dest = out_name
            break
    if not dest:
        continue

    path = os.path.join(src_dir, name)
    im = Image.open(path)
    # Fix EXIF orientation so people stand upright
    im = ImageOps.exif_transpose(im)
    im = im.convert('RGB')

    # Resize for web, keep aspect
    max_side = 1200
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    dest_path = os.path.join(out_dir, dest)
    im.save(dest_path, 'JPEG', quality=90, optimize=True)

    log = f'{name!r} -> {dest} size={im.size} orientation_fixed\n'
    with open('scripts/orient_log.txt', 'a', encoding='utf-8') as f:
        f.write(log)

print('done')
