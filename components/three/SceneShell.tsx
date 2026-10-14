"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getDeviceProfile, hasWebGL, type DeviceProfile } from "@/lib/device";
import { useReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";
import { siteConfig } from "@/data/site";
import { withBase } from "@/lib/utils";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

type Status = "checking" | "webgl" | "fallback";

const MIN_LOADER_MS = 900;
const MAX_LOADER_MS = 7000;

function Loader({ percent }: { percent: number }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="font-display text-5xl tracking-[0.25em] text-bone sm:text-6xl">{siteConfig.name}</span>
      <div className="mt-8 h-[3px] w-56 overflow-hidden bg-line">
        <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
      <span className="mt-3 font-display text-2xl tabular-nums text-accent">{Math.round(percent)}%</span>
      <span className="sr-only">Loading experience</span>
    </motion.div>
  );
}

/**
 * Owns the fixed full-screen 3D background: capability checks, lazy loading,
 * branded loader with progress, reduced-motion handling and the static fallback.
 */
export function SceneShell() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const [status, setStatus] = useState<Status>("checking");
  const [profile, setProfile] = useState<DeviceProfile | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [{ progress, active }, setLoad] = useState({ progress: 0, active: true });

  const handleReady = useCallback(() => setCanvasReady(true), []);
  const handleProgress = useCallback(
    (p: number, a: boolean) => setLoad((prev) => (prev.progress === p && prev.active === a ? prev : { progress: p, active: a })),
    [],
  );

  useEffect(() => {
    if (!hasWebGL()) {
      setStatus("fallback");
      return;
    }
    setProfile(getDeviceProfile());
    // Defer the heavy chunk until the browser is idle so the HTML paints first
    const start = () => setStatus("webgl");
    const hasIdle = "requestIdleCallback" in window;
    const handle = hasIdle ? window.requestIdleCallback(start, { timeout: 800 }) : window.setTimeout(start, 200);
    const t1 = window.setTimeout(() => setMinElapsed(true), MIN_LOADER_MS);
    const t2 = window.setTimeout(() => setTimedOut(true), MAX_LOADER_MS);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const loaded = status === "fallback" || (canvasReady && !active && minElapsed) || timedOut;
  const percent = status === "fallback" ? 100 : Math.max(progress, canvasReady ? 90 : 8);

  return (
    <>
      <AnimatePresence>{!loaded && <Loader percent={loaded ? 100 : percent} />}</AnimatePresence>

      <div
        id="scene-root"
        className={
          reduced
            ? "pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh]"
            : "pointer-events-none fixed inset-0 z-0"
        }
      >
        {status === "fallback" && (
          <Image
            src={withBase("/images/hero-fallback.svg")}
            alt=""
            fill
            priority
            className="object-contain object-right p-8 opacity-80 lg:p-24"
          />
        )}
        {status === "webgl" && profile && (
          <SceneCanvas
            profile={profile}
            animate={!reduced}
            light={theme === "light"}
            onReady={handleReady}
            onProgress={handleProgress}
          />
        )}
      </div>
    </>
  );
}
