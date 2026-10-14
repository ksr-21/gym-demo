"use client";

export interface DeviceProfile {
  lowPower: boolean;
  dpr: number;
  particles: number;
  shadows: boolean;
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Heuristic: small screen, touch-first, few cores or little memory ⇒ low power. */
export function getDeviceProfile(): DeviceProfile {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowPower =
    window.innerWidth < 768 ||
    window.matchMedia("(pointer: coarse)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4;
  return {
    lowPower,
    dpr: Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5),
    particles: lowPower ? 140 : 600,
    shadows: !lowPower,
  };
}
