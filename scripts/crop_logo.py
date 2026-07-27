from PIL import Image

img = Image.open('public/images/logo/logo_with_title_transparent.png')
# Crop to non-transparent content
bbox = img.getbbox()
print('bbox', bbox)
cropped = img.crop(bbox)
# Add small padding
pad = 8
out = Image.new('RGBA', (cropped.width + pad * 2, cropped.height + pad * 2), (0, 0, 0, 0))
out.paste(cropped, (pad, pad))
out.save('public/images/logo/logo_nav.png')
print('nav logo', out.size)

mark = Image.open('public/images/logo/logo_mark_transparent.png')
bbox2 = mark.getbbox()
cropped2 = mark.crop(bbox2)
# Make circular-friendly square crop around content
out2 = Image.new('RGBA', (cropped2.width + 16, cropped2.height + 16), (0, 0, 0, 0))
out2.paste(cropped2, (8, 8))
out2.save('public/images/logo/logo_mark.png')
print('mark', out2.size)
