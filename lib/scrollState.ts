/**
 * Shared, mutable scroll values. GSAP ScrollTrigger writes to this object;
 * the R3F scene reads it every frame (no React re-renders involved).
 */
export const scrollState = {
  /** 0 → 1 across the hero section */
  hero: 0,
  /** 0 → 1 across the whole page */
  page: 0,
};
