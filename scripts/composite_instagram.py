from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps
import os

base_dir = r"c:\Users\Admin\Documents\Projects\lamaggie\web\public\images"
backup = os.path.join(base_dir, "1-original.jpeg")
out_path = os.path.join(base_dir, "1.jpeg")
ig_path = os.path.join(base_dir, "instagram-painted.png")

if not os.path.exists(backup):
    Image.open(out_path).save(backup, quality=95)

im = Image.open(backup).convert("RGBA")

# Full gold frame outer bounds (1600x1200 source)
frame = (275, 575, 405, 735)
# Inner artwork window (inside cream/dark mat)
inner = (297, 603, 383, 713)
iw, ih = inner[2] - inner[0], inner[3] - inner[1]
print("inner", iw, ih, "at", inner)

ig = Image.open(ig_path).convert("RGBA")
ig_fit = ImageOps.fit(ig, (iw, ih), method=Image.Resampling.LANCZOS)
r, g, b, _ = ig_fit.split()
rgb = Image.merge("RGB", (r, g, b))
rgb = ImageEnhance.Color(rgb).enhance(0.9)
rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
rgb = ImageEnhance.Brightness(rgb).enhance(0.93)
ig_fit = rgb.convert("RGBA")

mask = Image.new("L", (iw, ih), 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle((0, 0, iw - 1, ih - 1), radius=3, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(0.8))

shadow = Image.new("RGBA", im.size, (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rectangle(inner, fill=(15, 8, 4, 100))
shadow = shadow.filter(ImageFilter.GaussianBlur(2))
im = Image.alpha_composite(im, shadow)
im.paste(ig_fit, (inner[0], inner[1]), mask)

result = im.convert("RGB")
result.save(out_path, quality=92, optimize=True)
print("saved", out_path)

# also sync project root images copy if present
root = r"c:\Users\Admin\Documents\Projects\lamaggie\images\1.jpeg"
if os.path.isdir(os.path.dirname(root)):
    result.save(root, quality=92, optimize=True)
    print("synced root images/1.jpeg")
