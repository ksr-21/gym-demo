"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { plans, siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { cn, formatINR } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

type View = "month" | "year";

const baseMonthly = plans[0].price / plans[0].months;

export function Plans() {
  const [view, setView] = useState<View>("month");
  const multiplier = view === "month" ? 1 : 12;

  return (
    <section id="plans" aria-labelledby="plans-title" className="section-pad bg-surface/70">
      <div className="container-x">
        <div id="plans-title" className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Membership"
            title="Pick your"
            accent="commitment"
            intro="No joining fee. No hidden charges. The longer you commit, the less you pay per month."
          />
          <Reveal>
            <div role="group" aria-label="Price view" className="inline-flex border border-line p-1">
              {(["month", "year"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors",
                    view === v ? "bg-accent text-onaccent" : "text-muted hover:text-bone",
                  )}
                >
                  Per {v}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const perMonth = plan.price / plan.months;
            const shown = perMonth * multiplier;
            const saving = Math.round((1 - perMonth / baseMonthly) * 100);
            return (
              <Reveal key={plan.id} delay={i * 0.1}>
                <article
                  className={cn(
                    "relative flex h-full flex-col p-8",
                    plan.popular ? "border-2 border-accent bg-raised lg:-translate-y-4" : "panel",
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-8 bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-onaccent">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-3xl">{plan.name}</h3>
                  <p className="mt-6 flex items-baseline gap-1">
                    <AnimatedNumber
                      value={shown}
                      format={formatINR}
                      className="font-display text-6xl leading-none tabular-nums"
                    />
                    <span className="text-sm text-muted">/ {view}</span>
                  </p>
                  <p className="mt-2 min-h-[2.5rem] text-xs text-muted">
                    Billed {formatINR(plan.price)} every {plan.months === 1 ? "month" : `${plan.months} months`}
                    {saving > 0 && <span className="ml-2 font-semibold text-accent">Save {saving}%</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-bone/90">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={whatsappLink(`Hi ${siteConfig.shortName}! I'd like to join the ${plan.name} plan (${formatINR(plan.price)}).`)}
                    variant={plan.popular ? "primary" : "outline"}
                    className="mt-8 w-full"
                    aria-label={`Join now — ${plan.name} plan`}
                  >
                    Join now
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-muted">Not sure yet? Book a free trial before you commit.</p>
      </div>
    </section>
  );
}
