"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { siteConfig } from "@/data/site";

const ACCENT = siteConfig.brand.accent;

function useKnurlTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    for (let i = -size; i < size * 2; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + size, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i + size, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 3);
    return tex;
  }, []);
}

function useHexHeadGeometry(): THREE.ExtrudeGeometry {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const r = 1.0;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.85,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelSegments: 4,
    });
    geo.center();
    geo.rotateY(Math.PI / 2); // extrude axis -> X
    return geo;
  }, []);
}

/** Procedural hex dumbbell lying along the X axis. No external model needed. */
export function Dumbbell() {
  const knurl = useKnurlTexture();
  const headGeo = useHexHeadGeometry();

  const heads = [-1, 1] as const;

  return (
    <group>
      {/* knurled handle */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2.6, 48, 1]} />
        <meshStandardMaterial color="#e4e4e4" metalness={1} roughness={0.28} envMapIntensity={2.6} bumpMap={knurl} bumpScale={1.2} />
      </mesh>

      {heads.map((s) => (
        <group key={s} position={[s * 1.75, 0, 0]}>
          {/* hex head */}
          <mesh geometry={headGeo} castShadow>
            <meshStandardMaterial color="#5b5f66" metalness={0.9} roughness={0.34} envMapIntensity={2.4} />
          </mesh>
          {/* accent band on inner face */}
          <mesh position={[-s * 0.52, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.05, 48]} />
            <meshStandardMaterial color={ACCENT} metalness={0.4} roughness={0.35} emissive={ACCENT} emissiveIntensity={0.35} />
          </mesh>
          {/* chrome collar */}
          <mesh position={[-s * 0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.22, 48]} />
            <meshStandardMaterial color="#e2e2e2" metalness={1} roughness={0.18} envMapIntensity={2.6} />
          </mesh>
          {/* end cap */}
          <mesh position={[s * 0.52, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 48]} />
            <meshStandardMaterial color="#d6d6d6" metalness={1} roughness={0.2} envMapIntensity={2.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
