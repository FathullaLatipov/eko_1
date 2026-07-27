from PIL import Image

src = Image.open('public/images/logo/logo_with_title.PNG').convert('RGBA')
pixels = src.load()
w, h = src.size
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        brightness = (r + g + b) / 3
        # Keep teal and red logo colors; remove pale backgrounds
        is_teal = b > 140 and g > 120 and r < 120 and (b - r) > 40
        is_red = r > 150 and r > g + 30 and r > b + 30
        is_dark_line = brightness < 80
        if is_teal or is_red or is_dark_line:
            continue
        if brightness > 210:
            pixels[x, y] = (255, 255, 255, 0)
        elif brightness > 180:
            alpha = int(255 * (210 - brightness) / 30)
            pixels[x, y] = (r, g, b, max(0, min(255, alpha)))

bbox = src.getbbox()
cropped = src.crop(bbox)
pad = 12
out = Image.new('RGBA', (cropped.width + pad * 2, cropped.height + pad * 2), (0, 0, 0, 0))
out.paste(cropped, (pad, pad), cropped)
out.save('public/images/logo/logo_nav.png')
print('nav', out.size, 'bbox', bbox)

# mark only
src2 = Image.open('public/images/logo/logo_only_children.JPG').convert('RGBA')
pixels2 = src2.load()
w2, h2 = src2.size
for y in range(h2):
    for x in range(w2):
        r, g, b, a = pixels2[x, y]
        brightness = (r + g + b) / 3
        is_teal = b > 140 and g > 120 and r < 120 and (b - r) > 40
        is_red = r > 150 and r > g + 30 and r > b + 30
        if is_teal or is_red:
            continue
        if brightness > 210:
            pixels2[x, y] = (255, 255, 255, 0)
        elif brightness > 180:
            alpha = int(255 * (210 - brightness) / 30)
            pixels2[x, y] = (r, g, b, max(0, min(255, alpha)))
bbox2 = pixels2 and src2.getbbox()
cropped2 = src2.crop(bbox2)
pad = 12
out2 = Image.new('RGBA', (cropped2.width + pad * 2, cropped2.height + pad * 2), (0, 0, 0, 0))
out2.paste(cropped2, (pad, pad), cropped2)
out2.save('public/images/logo/logo_mark.png')
print('mark', out2.size, 'bbox', bbox2)
