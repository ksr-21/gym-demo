import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

/** Smooth-scrolls to a section id ("#plans"), falling back to native scrolling. */
export function scrollToHash(hash: string): void {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "auto", block: "start" });
  history.replaceState(null, "", hash);
}
