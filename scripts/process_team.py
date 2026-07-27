import os
from PIL import Image

team_dir = 'public/images/team'
src_dir = 'images/team'

with open('scripts/names.txt', 'w', encoding='utf-8') as f:
    f.write('PUBLIC:\n')
    for name in os.listdir(team_dir):
        f.write(repr(name) + '\n')
    f.write('\nSOURCE:\n')
    for name in os.listdir(src_dir):
        f.write(repr(name) + '\n')

# Build mapping by matching case-insensitive prefixes
wanted = {
    'alimova': 'alimova.jpg',
    'servin': 'servin.jpg',
    'abdullayeva': 'abdullayeva.jpg',
    'osman': 'osman.jpg',
    'mesut': 'mesut.jpg',
    'gurkan': 'gurkan.jpg',
    'nortojiyeva': 'nortojiyeva.jpg',
}

# Prefer source originals
for name in os.listdir(src_dir):
    low = name.lower()
    for key, dest_name in wanted.items():
        if key in low and not name.lower().endswith(('.jpg',)) or True:
            pass

for name in os.listdir(src_dir):
    low = name.lower()
    dest = None
    if 'alimova' in low:
        dest = 'alimova.jpg'
    elif 'servin' in low:
        dest = 'servin.jpg'
    elif 'abdullayeva' in low or 'abdullaeva' in low:
        dest = 'abdullayeva.jpg'
    elif 'osman' in low:
        dest = 'osman.jpg'
    elif 'mesut' in low:
        dest = 'mesut.jpg'
    elif 'gurkan' in low or 'yurtd' in low:
        dest = 'gurkan.jpg'
    elif 'nortojiyeva' in low:
        dest = 'nortojiyeva.jpg'
    if not dest:
        continue
    path = os.path.join(src_dir, name)
    im = Image.open(path).convert('RGB')
    max_w = 1000
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.Resampling.LANCZOS)
    dest_path = os.path.join(team_dir, dest)
    im.save(dest_path, 'JPEG', quality=88, optimize=True)
    with open('scripts/names.txt', 'a', encoding='utf-8') as f:
        f.write(f'OK {name!r} -> {dest} {im.size} {os.path.getsize(dest_path)}\n')

print('ok')
