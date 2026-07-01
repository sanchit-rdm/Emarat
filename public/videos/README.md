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

## Re-create `home2-scrub.mp4` (e.g. after swapping the source)

```bash
# Video — native resolution, all keyframes (buttery scrub), CRF 18 (high quality):
ffmpeg -y -i "source.mp4" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -crf 18 -preset slow -movflags +faststart home2-scrub.mp4

# Poster — first frame as webp (matches source resolution):
ffmpeg -y -i "source.mp4" -frames:v 1 -c:v libwebp -quality 85 home2-poster.webp
```

Current asset is 3840×2160, 73 MB (all-keyframe at native 4K). To reduce page-load
weight at the cost of minor sharpness, add `-vf "scale=1920:1080:flags=lanczos"`.
To point the hero at a different file, edit the `<source>` in `ScrollVideoHero.tsx`.

## Tuning (in ScrollVideoHero.tsx)

- `TRACK_VH` — how far you scroll through the hero (default 350vh).
- `SCRUB` — catch-up smoothing in seconds (default 0.6).
- `TEXT_BLOCKS` — overlay copy, screen `anchor`, and `enterAt`/`exitAt` timing
  (each a 0..1 fraction of the scroll).
