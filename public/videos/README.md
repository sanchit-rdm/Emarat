# Home hero video assets

Used by `ScrollVideoHero` (src/components/sections/ScrollVideoHero.tsx), which
scrubs the video by scroll position (down = forward, up = reverse).

| File              | Role                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `Sample 1.mp4`    | Original source from the team (4K, ~19.5s, ~36 MB). Kept for re-encoding. |
| `hero-scrub.mp4`  | **What the hero plays.** Optimized for scrubbing — see below.        |
| `hero-poster.jpg` | First-frame still (poster + reduced-motion / load-failure fallback). |

## Why the source is re-encoded

Scroll-scrubbing repeatedly **seeks** the video, and every seek must decode
from the nearest keyframe. The source is 4K with keyframes ~29 frames apart, so
seeks (especially reverse) stutter. `hero-scrub.mp4` fixes this: **1920×1080**
(cheaper to decode) with a **keyframe every 6 frames**, so any seek decodes ≤6
frames. Result: ~17 MB, smooth both directions.

## Re-create `hero-scrub.mp4` (e.g. after swapping the source)

```bash
ffmpeg -y -i "Sample 1.mp4" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -vf "scale=1920:1080:flags=lanczos" -g 6 -keyint_min 6 -sc_threshold 0 \
  -crf 23 -preset medium -movflags +faststart hero-scrub.mp4

# Poster from the first frame:
ffmpeg -y -i hero-scrub.mp4 -frames:v 1 -q:v 3 hero-poster.jpg
```

For maximum reverse-scrub smoothness use `-g 1 -keyint_min 1` (every frame a
keyframe) — buttery but a larger file. To point the hero at a different file,
edit the `<source>` in `ScrollVideoHero.tsx`.

## Tuning (in ScrollVideoHero.tsx)

- `TRACK_VH` — how far you scroll through the hero (default 350vh).
- `SCRUB` — catch-up smoothing in seconds (default 0.6).
- `TEXT_BLOCKS` — overlay copy, screen `anchor`, and `enterAt`/`exitAt` timing
  (each a 0..1 fraction of the scroll).
