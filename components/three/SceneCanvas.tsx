"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { HeroScene } from "./HeroScene";
import type { DeviceProfile } from "@/lib/device";

interface Props {
  profile: DeviceProfile;
  animate: boolean;
  light: boolean;
  onReady: () => void;
  onProgress: (progress: number, active: boolean) => void;
}

function ProgressReporter({ onProgress }: Pick<Props, "onProgress">) {
  const { progress, active } = useProgress();
  useEffect(() => onProgress(progress, active), [progress, active, onProgress]);
  return null;
}

/** The only module that imports the Canvas — loaded lazily via next/dynamic. */
export default function SceneCanvas({ profile, animate, light, onReady, onProgress }: Props) {
  return (
    <Canvas
      dpr={[1, profile.dpr]}
      shadows={profile.shadows}
      frameloop={animate ? "always" : "demand"}
      camera={{ position: [0, 0.35, 6.4], fov: 35 }}
      gl={{ antialias: !profile.lowPower, powerPreference: "high-performance" }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ProgressReporter onProgress={onProgress} />
      <HeroScene profile={profile} animate={animate} light={light} />
    </Canvas>
  );
}
