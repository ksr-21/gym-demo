"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { classTypeLabels, days, timetable, type ClassType } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Filter = ClassType | "all";

const typeStyle: Record<ClassType, string> = {
  strength: "border-l-accent",
  hiit: "border-l-[#ffb020]",
  yoga: "border-l-[#3ddc84]",
  pt: "border-l-[#4da3ff]",
};

const filters: Filter[] = ["all", "strength", "hiit", "yoga", "pt"];

export function Timetable() {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <section id="timetable" aria-labelledby="timetable-title" className="section-pad bg-surface/70">
      <div className="container-x">
        <div id="timetable-title">
          <SectionHeading eyebrow="Weekly schedule" title="Class" accent="timetable" intro="Drop in to any class — all included with your membership." />
        </div>

        <Reveal delay={0.1}>
          <div role="group" aria-label="Filter classes by type" className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
                  filter === f ? "border-accent bg-accent text-onaccent" : "border-line text-muted hover:border-bone/40 hover:text-bone",
                )}
              >
                {f === "all" ? "All classes" : classTypeLabels[f]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-7" aria-live="polite">
          {days.map((day) => {
            const sessions = timetable.filter((s) => s.day === day && (filter === "all" || s.type === filter));
            return (
              <div key={day} className="border border-line bg-ink/60 p-3">
                <h3 className="border-b border-line pb-2 text-2xl text-accent">{day}</h3>
                <ul className="mt-3 space-y-2">
                  <AnimatePresence mode="popLayout">
                    {sessions.map((s) => (
                      <motion.li
                        layout
                        key={`${s.day}-${s.time}-${s.name}`}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.25 }}
                        className={cn("border-l-4 bg-raised px-3 py-2.5", typeStyle[s.type])}
                      >
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{s.time}</p>
                        <p className="mt-0.5 text-sm font-semibold leading-tight">{s.name}</p>
                        <p className="mt-0.5 text-xs text-muted">with {s.trainer}</p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                  {sessions.length === 0 && <li className="py-3 text-center text-xs text-muted/60">No classes</li>}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
