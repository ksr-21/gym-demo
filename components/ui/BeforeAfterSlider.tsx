"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface Props {
  before: string;
  after: string;
  name: string;
}

/** Draggable before/after comparison. Pointer, touch and keyboard (arrow keys) accessible. */
export function BeforeAfterSlider({ before, after, name }: Props) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={box}
      className="relative mx-auto aspect-[4/5] w-full max-w-md cursor-ew-resize touch-pan-y select-none overflow-hidden border border-line"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientX(e.clientX);
      }}
    >
      <Image src={after} alt={`${name} after transformation`} fill sizes="(min-width:768px) 28rem, 100vw" className="pointer-events-none object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${name} before transformation`} fill sizes="(min-width:768px) 28rem, 100vw" className="object-cover" draggable={false} />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 bg-[#0d0d0d]/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#f4f1ea]">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-onaccent">After</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${name} before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
            else if (e.key === "Home") setPos(0);
            else if (e.key === "End") setPos(100);
            else return;
            e.preventDefault();
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-onaccent shadow-lg"
        >
          <MoveHorizontal size={20} aria-hidden />
        </div>
      </div>
    </div>
  );
}
