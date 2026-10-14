"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks";
import { setLenis, scrollToHash } from "@/lib/scroll";
import { scrollState } from "@/lib/scrollState";

/** Lenis smooth scrolling wired into GSAP ScrollTrigger; also drives global page progress. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const hero = document.getElementById("hero");
    const heroTrigger = hero
      ? ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            scrollState.hero = self.progress;
          },
        })
      : null;
    const pageTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollState.page = self.progress;
      },
    });
    // Dim the 3D backdrop once the hero is behind us so text stays readable
    const fade = gsap.to("#scene-root", {
      opacity: 0.32,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 30%", scrub: true },
    });

    if (window.location.hash) {
      window.setTimeout(() => scrollToHash(window.location.hash), 400);
    }

    return () => {
      fade.scrollTrigger?.kill();
      fade.kill();
      heroTrigger?.kill();
      pageTrigger.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
      scrollState.hero = 0;
      scrollState.page = 0;
    };
  }, [reduced]);

  return null;
}
