"use client";

import { Component, Suspense, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Grid } from "@react-three/drei";
import * as THREE from "three";
import { Dumbbell } from "./Dumbbell";
import { ParticleField } from "./ParticleField";
import { scrollState } from "@/lib/scrollState";
import { siteConfig } from "@/data/site";
import { withBase } from "@/lib/utils";
import type { DeviceProfile } from "@/lib/device";

interface Props {
  profile: DeviceProfile;
  animate: boolean;
  light: boolean;
}

/** If the HDR environment cannot be fetched, keep rendering with plain lights. */
class SafeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const lerp = THREE.MathUtils.lerp;
const FLOOR_Y = -1.55;
const NO_POINTER = new THREE.Vector2(0, 0);

export function HeroScene({ profile, animate, light }: Props) {
  const rig = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const idle = useRef(0);
  const { viewport } = useThree();
  const wide = viewport.aspect > 1.15;

  useFrame((state, delta) => {
    const rigGroup = rig.current;
    const spinGroup = spin.current;
    if (!rigGroup || !spinGroup) return;

    const p = animate ? scrollState.hero : 0;
    const pg = animate ? scrollState.page : 0;
    const pointer = animate ? state.pointer : NO_POINTER;

    // Idle rotation + scroll rotation + pointer parallax tilt
    if (animate) idle.current += delta * 0.25;
    const targetY = -0.55 + idle.current + p * Math.PI * 1.6 + pg * Math.PI * 2 + pointer.x * 0.35;
    const targetX = 0.18 - pointer.y * 0.25 + p * 0.5;
    const k = animate ? 0.08 : 1;
    spinGroup.rotation.y = lerp(spinGroup.rotation.y, targetY, k);
    spinGroup.rotation.x = lerp(spinGroup.rotation.x, targetX, k);
    spinGroup.rotation.z = lerp(spinGroup.rotation.z, 0.32 - p * 0.5, k);

    // Hero resting position, then glide aside on scroll
    const restX = wide ? 1.35 : 0;
    const restY = wide ? 0.1 : 1.05;
    const asideX = wide ? -3.6 : -1.9;
    const s = lerp(wide ? 0.68 : 0.5, wide ? 0.5 : 0.4, p);
    rigGroup.position.x = lerp(rigGroup.position.x, lerp(restX, asideX, p), k === 1 ? 1 : 0.1);
    rigGroup.position.y = lerp(rigGroup.position.y, lerp(restY, wide ? -0.2 : 0.4, p), k === 1 ? 1 : 0.1);
    rigGroup.scale.setScalar(lerp(rigGroup.scale.x, s, k === 1 ? 1 : 0.1));

    // Camera glides forward
    const cam = state.camera;
    cam.position.z = lerp(cam.position.z, lerp(6.4, 4.2, p), k === 1 ? 1 : 0.08);
    cam.position.y = lerp(cam.position.y, lerp(0.35, -0.2, p), k === 1 ? 1 : 0.08);
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow={profile.shadows} />
      <directionalLight position={[-4, 2, -4]} intensity={2.2} />
      <pointLight position={[-5, 1, 2]} intensity={18} color={siteConfig.brand.accent} />

      <SafeBoundary>
        <Suspense fallback={null}>
          {/* Self-hosted copy of drei's "warehouse" HDRI (no third-party CDN at runtime) */}
          <Environment files={withBase("/hdri/warehouse.hdr")} />
        </Suspense>
      </SafeBoundary>

      <group ref={rig}>
        <group ref={spin}>
          <Dumbbell />
        </group>
        {profile.shadows && (
          <ContactShadows position={[0, FLOOR_Y, 0]} opacity={light ? 0.35 : 0.55} scale={9} blur={2.6} far={3} resolution={512} color="#000000" />
        )}
      </group>

      <Grid
        position={[0, FLOOR_Y - 0.02, 0]}
        args={[40, 40]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor={siteConfig.brand.accent}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={siteConfig.brand.accent}
        fadeDistance={22}
        fadeStrength={2}
        infiniteGrid
      />
      <ParticleField count={profile.particles} animate={animate} light={light} />
    </>
  );
}
