"use client";

// GSAP + ScrollTrigger are loaded as a separate async chunk so they don't
// block initial page parse/hydration. The promise is cached so the dynamic
// import runs at most once per page session.

type GsapResult = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let _promise: Promise<GsapResult> | null = null;

async function _load(): Promise<GsapResult> {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh, { once: true });
  return { gsap, ScrollTrigger };
}

export function ensureGsap(): Promise<GsapResult> {
  if (!_promise) _promise = _load();
  return _promise;
}

let _raf: number | undefined;

export function scheduleScrollRefresh() {
  if (typeof window === "undefined") return;
  if (_raf !== undefined) cancelAnimationFrame(_raf);
  _raf = requestAnimationFrame(() => {
    _raf = undefined;
    // Only refresh if GSAP is already loaded — if not loaded yet, the load
    // itself fires a refresh via the `load` event listener above.
    _promise?.then(({ ScrollTrigger }) => ScrollTrigger.refresh());
  });
}
