# Custom fonts

Drop the client's licensed font files here, then they get wired into the site
via `next/font/local` in `src/app/layout.tsx`.

## Expected files

| Role        | Put a file named…                              | CSS variable          |
| ----------- | ---------------------------------------------- | --------------------- |
| Headings    | `bizantheum.woff2` (or `.otf` / `.ttf`)        | `--font-display-pri`  |
| Subheadings | `adelora.woff2` (or `.otf` / `.ttf`)           | `--font-display-alt`  |
| Body text   | already handled — Montserrat via Google Fonts  | `--font-sans-pri`     |

`.woff2` is preferred (smallest / fastest). `.otf` and `.ttf` also work — if you
only have those, just drop them in and the path in layout.tsx gets pointed at
that extension.

If a font ships multiple weights, add each file (e.g. `bizantheum-regular.woff2`,
`bizantheum-bold.woff2`) and they’ll be registered as one family with weights.

## After adding files

In `src/app/layout.tsx`, the two Google-Fonts stand-ins (Italiana → headings,
Cormorant → subheadings) get replaced with `localFont(...)` declarations
pointing at these files. The rest of the site already reads the CSS variables,
so nothing else needs to change.
