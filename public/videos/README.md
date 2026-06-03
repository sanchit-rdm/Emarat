# Home hero video assets

Used by `ScrollVideoHero` (src/components/sections/ScrollVideoHero.tsx), which
scrubs the video by scroll position (down = forward, up = reverse).

| File               | Role                                                            |
| ------------------ | --------------------------------------------------------------- |
| `hero-scrub.mp4`   | **What the hero scrubs.** 720p, keyframe-dense — see below.      |
| `hero-poster.webp` | First-frame still (poster + reduced-motion / load-failure fallback). |

## Why the source is re-encoded

Scroll-scrubbing repeatedly **seeks** the video, and every seek must decode
from the nearest keyframe. A normal clip keyframes ~every 1–2s, so seeks
(especially reverse) stutter. `hero-scrub.mp4` fixes this: a **keyframe every 6
frames**, so any seek decodes ≤6 frames — smooth in both directions.

## Re-create `hero-scrub.mp4` (e.g. after swapping the source)

```bash
ffmpeg -y -i "source.mp4" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -vf "scale=1280:720:flags=lanczos" -g 6 -keyint_min 6 -sc_threshold 0 \
  -crf 23 -preset slow -movflags +faststart hero-scrub.mp4

# Poster from ~1s in, compressed to webp:
ffmpeg -y -ss 1 -i "source.mp4" -frames:v 1 -vf "scale=1280:720:flags=lanczos" hero-frame.png
node -e "require('sharp')('hero-frame.png').webp({quality:68,effort:6}).toFile('hero-poster.webp')"
```

For maximum reverse-scrub smoothness use `-g 1 -keyint_min 1` (every frame a
keyframe) — buttery but a larger file. To point the hero at a different file,
edit the `<source>` in `ScrollVideoHero.tsx`.

## Tuning (in ScrollVideoHero.tsx)

- `TRACK_VH` — how far you scroll through the hero (default 350vh).
- `SCRUB` — catch-up smoothing in seconds (default 0.6).
- `TEXT_BLOCKS` — overlay copy, screen `anchor`, and `enterAt`/`exitAt` timing
  (each a 0..1 fraction of the scroll).
