"""Paint the Instagram artwork into the deer shadow-box frame on the wall."""
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps
import os

base_dir = r"c:\Users\Admin\Documents\Projects\lamaggie\web\public\images"
backup = os.path.join(base_dir, "1-original.jpeg")
out_path = os.path.join(base_dir, "1.jpeg")
ig_path = os.path.join(base_dir, "instagram-painted.png")

GOLD_OUTER = (275, 575, 405, 735)

# Deer shadow box — keep the dark moulding, fill the full recess
FRAME_OUTER = (1100, 735, 1290, 945)
FRAME_INNER = (1118, 742, 1272, 932)

im = Image.open(out_path).convert("RGBA")
orig = Image.open(backup).convert("RGBA")

# Restore gold frame (previous composites sometimes spilled onto it)
im.paste(orig.crop(GOLD_OUTER), (GOLD_OUTER[0], GOLD_OUTER[1]))

inner = FRAME_INNER
iw, ih = inner[2] - inner[0], inner[3] - inner[1]
print("inner", iw, ih, "at", inner)

# Flat dark mat first so nothing from the old contents shows through
mat = Image.new("RGBA", im.size, (0, 0, 0, 0))
ImageDraw.Draw(mat).rectangle(inner, fill=(12, 8, 6, 255))
im = Image.alpha_composite(im, mat)

ig = Image.open(ig_path).convert("RGBA")
trim = int(min(ig.size) * 0.05)
ig = ig.crop((trim, trim, ig.width - trim, ig.height - trim))
ig_fit = ImageOps.fit(ig, (iw, ih), method=Image.Resampling.LANCZOS)
r, g, b, _ = ig_fit.split()
rgb = Image.merge("RGB", (r, g, b))
rgb = ImageEnhance.Color(rgb).enhance(0.92)
rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
rgb = ImageEnhance.Brightness(rgb).enhance(0.88)
ig_fit = rgb.convert("RGBA")

mask = Image.new("L", (iw, ih), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, iw - 1, ih - 1), radius=2, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(0.5))

shadow = Image.new("RGBA", im.size, (0, 0, 0, 0))
ImageDraw.Draw(shadow).rectangle(inner, fill=(0, 0, 0, 90))
shadow = shadow.filter(ImageFilter.GaussianBlur(2))
im = Image.alpha_composite(im, shadow)
im.paste(ig_fit, (inner[0], inner[1]), mask)

# Inner edge vignette so art sits in the recess
edge = Image.new("L", (iw, ih), 255)
ImageDraw.Draw(edge).rectangle((0, 0, iw - 1, ih - 1), outline=0, width=max(4, iw // 24))
edge = edge.filter(ImageFilter.GaussianBlur(5))
dark = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
dark.putalpha(Image.eval(edge, lambda p: min(160, 255 - p)))
layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
layer.paste(dark, (inner[0], inner[1]))
im = Image.alpha_composite(im, layer)

result = im.convert("RGB")
result.save(out_path, quality=92, optimize=True)
print("saved", out_path)

result.crop((1040, 700, 1320, 980)).save(
    os.path.join(base_dir, "_preview_wide.jpg"), quality=92
)
print("preview updated")

root = r"c:\Users\Admin\Documents\Projects\lamaggie\images\1.jpeg"
if os.path.isdir(os.path.dirname(root)):
    result.save(root, quality=92, optimize=True)
