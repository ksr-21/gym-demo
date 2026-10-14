"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Check, Clock, Dumbbell, Flame, Flower2, RotateCw, Target, type LucideIcon } from "lucide-react";
import { programs, type Program, type ProgramIcon } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const icons: Record<ProgramIcon, LucideIcon> = {
  dumbbell: Dumbbell,
  flame: Flame,
  lotus: Flower2,
  target: Target,
};

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const Icon = icons[program.icon];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 180, damping: 18 });

  // Arc layout (desktop only): outer cards turn inward and sit slightly forward/up
  const offset = index - (programs.length - 1) / 2;
  const arcStyle = {
    "--arc-rot": `${offset * -9}deg`,
    "--arc-z": `${Math.abs(offset) * 30}px`,
    "--arc-y": `${Math.abs(offset) * 14}px`,
  } as React.CSSProperties;

  return (
    <div
      className="[perspective:1200px] lg:[transform-style:preserve-3d] lg:[transform:translateY(var(--arc-y))_translateZ(var(--arc-z))_rotateY(var(--arc-rot))]"
      style={arcStyle}
    >
      <motion.button
        type="button"
        aria-pressed={flipped}
        aria-label={`${program.title}. ${flipped ? "Showing details" : "Press to flip card for details"}`}
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={(e) => {
          if (reduce || e.pointerType === "touch") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : tiltY, transformStyle: "preserve-3d" }}
        whileHover={reduce ? undefined : { scale: 1.03 }}
        className="relative block h-[22rem] w-full text-left"
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            aria-hidden={flipped}
            className="panel absolute inset-0 flex flex-col justify-between p-7 [backface-visibility:hidden]"
          >
            <div>
              <span className="grid h-14 w-14 place-items-center bg-accent text-onaccent">
                <Icon size={28} aria-hidden />
              </span>
              <h3 className="mt-6 text-4xl leading-none">{program.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{program.description}</p>
            </div>
            <div>
              <p className="flex items-start gap-2 text-xs font-medium text-bone/80">
                <Clock size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {program.timings}
              </p>
              <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                <RotateCw size={12} aria-hidden /> Tap to flip
              </p>
            </div>
          </div>
          {/* Back */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col justify-between border border-accent bg-raised p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div>
              <p className="eyebrow">What you get</p>
              <h3 className="mt-2 text-3xl leading-none">{program.title}</h3>
              <ul className="mt-6 space-y-3">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-bone/90">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-start gap-2 text-xs font-medium text-bone/80">
              <Clock size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {program.timings}
            </p>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}

export function Programs() {
  return (
    <section id="programs" aria-labelledby="programs-title" className="section-pad">
      <div className="container-x">
        <div id="programs-title">
          <SectionHeading
            eyebrow="Programs"
            title="Train with"
            accent="purpose"
            intro="Four coached programs. One goal: make next month's you unrecognisable."
          />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:[perspective:1600px] lg:[transform-style:preserve-3d]">
          {programs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="lg:[transform-style:preserve-3d]">
              <ProgramCard program={p} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex justify-center">
          <Button href="#book">Try any program free</Button>
        </Reveal>
      </div>
    </section>
  );
}
