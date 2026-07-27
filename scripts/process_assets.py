from PIL import Image
import os

# Make logo with title transparent (remove near-white background)
src = r'public/images/logo/logo_with_title.PNG'
img = Image.open(src).convert('RGBA')
pixels = img.load()
w, h = img.size
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r > 245 and g > 245 and b > 245:
            pixels[x, y] = (r, g, b, 0)
        elif r > 235 and g > 235 and b > 235:
            fade = int(255 * (250 - min(r, g, b)) / 15)
            pixels[x, y] = (r, g, b, max(0, min(255, fade)))
out = r'public/images/logo/logo_with_title_transparent.png'
img.save(out, 'PNG')
print('logo saved', out, img.size)

# Also process circular mark
src2 = r'public/images/logo/logo_only_children.JPG'
img2 = Image.open(src2).convert('RGBA')
pixels2 = img2.load()
w2, h2 = img2.size
for y in range(h2):
    for x in range(w2):
        r, g, b, a = pixels2[x, y]
        if r > 245 and g > 245 and b > 245:
            pixels2[x, y] = (r, g, b, 0)
        elif r > 235 and g > 235 and b > 235:
            fade = int(255 * (250 - min(r, g, b)) / 15)
            pixels2[x, y] = (r, g, b, max(0, min(255, fade)))
out2 = r'public/images/logo/logo_mark_transparent.png'
img2.save(out2, 'PNG')
print('mark saved', out2, img2.size)

# Rename/copy team photos to simple ASCII names and resize for web
mapping = {
    'alimova_vazira_usmonovna.JPG': 'alimova.jpg',
    'Servin_Ergin.JPG': 'servin.jpg',
    'Abdullayeva_Durdona_Baxtiyorovna.PNG': 'abdullayeva.jpg',
    'osman_Cingoz.JPG': 'osman.jpg',
    'Mesut_Ceter.JPG': 'mesut.jpg',
    'Gurkan_Yurtdas.png': 'gurkan.jpg',
    'nortojiyeva_tozagul_kuziyevna.JPG': 'nortojiyeva.jpg',
}
team_dir = r'public/images/team'
for src_name, dst_name in mapping.items():
    path = os.path.join(team_dir, src_name)
    im = Image.open(path).convert('RGB')
    max_w = 900
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.Resampling.LANCZOS)
    dest = os.path.join(team_dir, dst_name)
    im.save(dest, 'JPEG', quality=85, optimize=True)
    print('team', dst_name, im.size, os.path.getsize(dest))
print('done')
