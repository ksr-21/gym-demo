"use client";

import { useState } from "react";
import { transformations } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Transformations() {
  const [activeId, setActiveId] = useState(transformations[0].id);
  const active = transformations.find((t) => t.id === activeId) ?? transformations[0];

  return (
    <section id="transformations" aria-labelledby="transformations-title" className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div id="transformations-title">
            <SectionHeading
              eyebrow="Real members. Real results."
              title="The"
              accent="proof"
              intro="Drag the slider to see what consistent coaching can do. Results vary — effort never lies."
            />
          </div>
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-3" role="tablist" aria-label="Choose a member">
              {transformations.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={t.id === activeId}
                    onClick={() => setActiveId(t.id)}
                    className={cn(
                      "flex w-full items-center justify-between border px-5 py-4 text-left transition-colors",
                      t.id === activeId ? "border-accent bg-raised" : "border-line hover:border-bone/40",
                    )}
                  >
                    <span>
                      <span className="block font-display text-2xl leading-none">{t.name}</span>
                      <span className="mt-1 block text-xs text-muted">{t.result}</span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">{t.duration}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Button href="#book" className="mt-8">
              Start your transformation
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div role="tabpanel" aria-live="polite">
            <BeforeAfterSlider key={active.id} before={active.before} after={active.after} name={active.name} />
            <p className="mt-4 text-center text-sm text-muted">
              <span className="font-semibold text-bone">{active.name}</span> · {active.duration} · {active.result}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
