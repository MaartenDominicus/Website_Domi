from pathlib import Path
from PIL import Image, ImageEnhance
import math

root = Path(__file__).resolve().parents[1]
source = Image.open(root / "public" / "domi-logo.jpg").convert("RGB")
canvas_size = 320
frames = []
durations = []

for index in range(24):
    progress = index / 23
    eased = 1 - (1 - progress) ** 3
    overshoot = math.sin(progress * math.pi) * (1 - progress) * 0.055
    scale = 0.76 + 0.24 * eased + overshoot
    alpha = min(1, progress / 0.3)
    y_offset = round((1 - eased) * 16)

    frame = Image.new("RGB", (canvas_size, canvas_size), "white")
    logo_size = max(1, round(canvas_size * scale))
    logo = source.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    logo = ImageEnhance.Contrast(logo).enhance(1.02)

    if alpha < 1:
        white = Image.new("RGB", logo.size, "white")
        logo = Image.blend(white, logo, alpha)

    position = ((canvas_size - logo_size) // 2, (canvas_size - logo_size) // 2 + y_offset)
    frame.paste(logo, position)
    frames.append(frame.quantize(colors=128, method=Image.Quantize.MEDIANCUT))
    durations.append(38)

durations[-1] = 900
frames[0].save(
    root / "public" / "domi-logo-intro.gif",
    save_all=True,
    append_images=frames[1:],
    duration=durations,
    disposal=2,
    optimize=True,
)
