"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/site";

interface CounterProps {
  to: number;
  decimals?: number;
  suffix: string;
}

function Counter({ to, decimals = 0, suffix }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" aria-label="Gym statistics" className="relative z-10 border-y border-line bg-ink/80 px-5 backdrop-blur-sm sm:px-8">
      <dl className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <dd className="font-display text-6xl leading-none text-accent sm:text-7xl">
              <Counter to={s.value} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} />
            </dd>
            <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
