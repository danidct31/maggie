"""
Cut key wall objects out of pic 1, fill their holes with wall color,
paint Instagram into the gold frame, and export transparent cutout PNGs.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps
from rembg import remove

ROOT = Path(r"c:\Users\Admin\Documents\Projects\lamaggie")
IMG = ROOT / "web" / "public" / "images"
BACKUP = IMG / "1-original.jpeg"
OUT_WALL = IMG / "1.jpeg"
CUTOUT_DIR = IMG / "cutouts"
IG = IMG / "instagram-painted.png"

# Crops in source coords (1600x1200). padding included for rembg.
OBJECTS = [
    {
        "id": "skull",
        "box": (380, 200, 760, 580),  # cow/horse skull left of neon
        "href": "/shop?category=vales",
        "labelKey": "wallVouchers",
    },
    {
        "id": "make-art",
        "box": (70, 680, 330, 1120),
        "href": "/shop",
        "labelKey": "wallShop",
    },
    {
        "id": "heart",
        "box": (680, 600, 920, 850),
        "href": "/shop?category=aftercare",
        "labelKey": "wallAftercare",
    },
    {
        "id": "patent",
        "box": (900, 250, 1200, 740),
        "href": "/shop?category=supplies",
        "labelKey": "wallSupplies",
    },
    {
        "id": "leopard",
        "box": (1210, 340, 1520, 670),
        "href": "/shop?category=merch",
        "labelKey": "wallMerch",
    },
    {
        "id": "roses",
        "box": (720, 10, 1080, 360),
        "href": "#bio",
        "labelKey": "wallBio",
    },
    {
        "id": "botanical",
        "box": (660, 850, 940, 1185),
        "href": "mailto:hello@maggiestudio.shop",
        "labelKey": "wallContact",
        "external": True,
    },
]

# Deer shadow box for Instagram (inner artwork window)
IG_FRAME_INNER = (1118, 742, 1272, 932)
IG_FRAME_OUTER = (1100, 735, 1290, 945)


def sample_wall_color(im: Image.Image, box: tuple[int, int, int, int]) -> tuple[int, int, int]:
    """Sample terracotta wall just outside the object crop."""
    l, t, r, b = box
    pts = [
        (max(0, l - 8), max(0, t + 20)),
        (min(im.width - 1, r + 8), max(0, t + 40)),
        (max(0, l + 20), max(0, t - 8)),
        (min(im.width - 1, r - 20), min(im.height - 1, b + 8)),
    ]
    colors = []
    for x, y in pts:
        colors.append(im.getpixel((x, y))[:3])
    return tuple(sum(c[i] for c in colors) // len(colors) for i in range(3))  # type: ignore


def fill_region(
    im: Image.Image,
    mask: Image.Image,
    origin: tuple[int, int],
    color: tuple[int, int, int],
) -> Image.Image:
    """Paint wall color where cutout alpha is opaque, with soft edge."""
    ox, oy = origin
    m = mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(3))
    patch = Image.new("RGBA", m.size, (*color, 255))
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    layer.paste(patch, (ox, oy), m)
    base = im.convert("RGBA")
    return Image.alpha_composite(base, layer).convert("RGB")


def main() -> None:
    CUTOUT_DIR.mkdir(parents=True, exist_ok=True)
    if not BACKUP.exists():
        raise SystemExit(f"Missing {BACKUP}")

    wall = Image.open(BACKUP).convert("RGB")
    meta = []

    for obj in OBJECTS:
        box = obj["box"]
        crop = wall.crop(box)
        print(f"cutting {obj['id']} {box} ...")
        cut = remove(crop.convert("RGBA"))
        bbox = cut.getbbox()
        if not bbox:
            print(f"  skip {obj['id']} — empty mask")
            continue
        trimmed = cut.crop(bbox)
        abs_box = (
            box[0] + bbox[0],
            box[1] + bbox[1],
            box[0] + bbox[2],
            box[1] + bbox[3],
        )
        out_name = f"{obj['id']}.png"
        trimmed.save(CUTOUT_DIR / out_name)
        print(f"  saved {out_name} at {abs_box}")

        color = sample_wall_color(wall, box)
        wall = fill_region(wall, cut.split()[-1], (box[0], box[1]), color)

        meta.append(
            {
                "id": obj["id"],
                "file": f"/images/cutouts/{out_name}",
                "href": obj["href"],
                "labelKey": obj["labelKey"],
                "external": bool(obj.get("external")),
                "leftPct": round(abs_box[0] / 1600 * 100, 3),
                "topPct": round(abs_box[1] / 1200 * 100, 3),
                "widthPct": round((abs_box[2] - abs_box[0]) / 1600 * 100, 3),
                "heightPct": round((abs_box[3] - abs_box[1]) / 1200 * 100, 3),
            }
        )

    print("painting Instagram into deer shadow-box frame...")
    ig = Image.open(IG).convert("RGBA")
    trim = int(min(ig.size) * 0.05)
    ig = ig.crop((trim, trim, ig.width - trim, ig.height - trim))
    inner = IG_FRAME_INNER
    iw, ih = inner[2] - inner[0], inner[3] - inner[1]
    wall_rgba = wall.convert("RGBA")
    mat = Image.new("RGBA", wall.size, (0, 0, 0, 0))
    ImageDraw.Draw(mat).rectangle(inner, fill=(12, 8, 6, 255))
    wall_rgba = Image.alpha_composite(wall_rgba, mat)
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
    shadow = Image.new("RGBA", wall.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle(inner, fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(2))
    wall_rgba = Image.alpha_composite(wall_rgba, shadow)
    wall_rgba.paste(ig_fit, (inner[0], inner[1]), mask)
    wall = wall_rgba.convert("RGB")

    meta.append(
        {
            "id": "instagram",
            "file": None,
            "href": "https://www.instagram.com/lamaggietattoo_studio/",
            "labelKey": "wallInstagram",
            "external": True,
            "leftPct": round(IG_FRAME_OUTER[0] / 1600 * 100, 3),
            "topPct": round(IG_FRAME_OUTER[1] / 1200 * 100, 3),
            "widthPct": round((IG_FRAME_OUTER[2] - IG_FRAME_OUTER[0]) / 1600 * 100, 3),
            "heightPct": round((IG_FRAME_OUTER[3] - IG_FRAME_OUTER[1]) / 1200 * 100, 3),
            "bakedIn": True,
        }
    )

    wall.save(OUT_WALL, quality=92, optimize=True)
    meta_path = CUTOUT_DIR / "manifest.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    ts_path = ROOT / "web" / "src" / "lib" / "wall-cutouts.ts"
    ts_path.write_text(
        "export type WallCutout = {\n"
        "  id: string;\n"
        "  file: string | null;\n"
        "  href: string;\n"
        "  labelKey:\n"
        "    | 'wallShop'\n"
        "    | 'wallVouchers'\n"
        "    | 'wallAftercare'\n"
        "    | 'wallSupplies'\n"
        "    | 'wallMerch'\n"
        "    | 'wallBio'\n"
        "    | 'wallContact'\n"
        "    | 'wallInstagram';\n"
        "  external?: boolean;\n"
        "  leftPct: number;\n"
        "  topPct: number;\n"
        "  widthPct: number;\n"
        "  heightPct: number;\n"
        "  bakedIn?: boolean;\n"
        "};\n\n"
        f"export const wallCutouts: WallCutout[] = {json.dumps(meta, indent=2)};\n",
        encoding="utf-8",
    )
    print("wrote", OUT_WALL)
    print("wrote", meta_path)
    print("wrote", ts_path)


if __name__ == "__main__":
    main()
