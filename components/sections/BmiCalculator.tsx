"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { bmiSchema, type BmiData, type BmiInput } from "@/lib/validation";

interface Category {
  label: string;
  from: number;
  to: number;
  color: string;
  advice: string;
}

const MIN = 10;
const MAX = 40;

const categories: Category[] = [
  { label: "Underweight", from: MIN, to: 18.5, color: "#4da3ff", advice: "A strength program with a calorie surplus can help you build healthy mass." },
  { label: "Normal", from: 18.5, to: 25, color: "#3ddc84", advice: "Great range! Let's build strength and performance on top of it." },
  { label: "Overweight", from: 25, to: 30, color: "#ffb020", advice: "Strength training plus HIIT is a proven combination for sustainable fat loss." },
  { label: "Obese", from: 30, to: MAX, color: "#ff4d4d", advice: "A coached, low-impact start with a personal trainer keeps progress safe and steady." },
];

const toAngle = (bmi: number) => ((Math.min(Math.max(bmi, MIN), MAX) - MIN) / (MAX - MIN)) * 180;

function polar(angle: number, r: number): [number, number] {
  const rad = (angle * Math.PI) / 180;
  return [100 - r * Math.cos(rad), 100 - r * Math.sin(rad)];
}

function arcPath(from: number, to: number, r = 80): string {
  const [x1, y1] = polar(toAngle(from), r);
  const [x2, y2] = polar(toAngle(to), r);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

function categoryFor(bmi: number): Category {
  return categories.find((c) => bmi < c.to) ?? categories[categories.length - 1];
}

function Gauge({ bmi }: { bmi: number | null }) {
  const category = bmi === null ? null : categoryFor(bmi);
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label={bmi === null ? "BMI gauge" : `BMI gauge showing ${bmi.toFixed(1)}`} className="w-full">
      {categories.map((c) => (
        <path
          key={c.label}
          d={arcPath(c.from, c.to)}
          fill="none"
          stroke={c.color}
          strokeWidth={14}
          opacity={category === null || category.label === c.label ? 1 : 0.28}
          style={{ transition: "opacity 0.4s" }}
        />
      ))}
      <motion.g
        style={{ transformOrigin: "100px 100px" }}
        initial={{ rotate: -90 }}
        animate={{ rotate: bmi === null ? -90 : toAngle(bmi) - 90 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <line x1={100} y1={100} x2={100} y2={32} stroke="rgb(var(--c-bone))" strokeWidth={3} strokeLinecap="round" />
      </motion.g>
      <circle cx={100} cy={100} r={8} fill="rgb(var(--c-bone))" />
      <circle cx={100} cy={100} r={3} fill="rgb(var(--c-ink))" />
    </svg>
  );
}

export function BmiCalculator() {
  const [bmi, setBmi] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BmiInput, unknown, BmiData>({ resolver: zodResolver(bmiSchema), mode: "onTouched" });

  const onSubmit = ({ height, weight }: BmiData) => {
    const m = height / 100;
    setBmi(Math.round((weight / (m * m)) * 10) / 10);
  };

  const category = bmi === null ? null : categoryFor(bmi);

  const field =
    "mt-2 w-full border bg-ink px-4 py-3.5 text-base text-bone placeholder:text-muted/60 focus:border-accent focus:outline-none";

  return (
    <section id="bmi" aria-labelledby="bmi-title" className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <div id="bmi-title">
            <SectionHeading
              eyebrow="Know your starting point"
              title="BMI"
              accent="calculator"
              intro="Check your body-mass index in seconds, then let our coaches turn it into a plan."
            />
          </div>
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bmi-height" className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Height (cm)
                </label>
                <input
                  id="bmi-height"
                  type="number"
                  inputMode="decimal"
                  placeholder="170"
                  aria-invalid={!!errors.height}
                  aria-describedby={errors.height ? "bmi-height-err" : undefined}
                  className={`${field} ${errors.height ? "border-red-500" : "border-line"}`}
                  {...register("height")}
                />
                {errors.height && (
                  <p id="bmi-height-err" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.height.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="bmi-weight" className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Weight (kg)
                </label>
                <input
                  id="bmi-weight"
                  type="number"
                  inputMode="decimal"
                  placeholder="68"
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? "bmi-weight-err" : undefined}
                  className={`${field} ${errors.weight ? "border-red-500" : "border-line"}`}
                  {...register("weight")}
                />
                {errors.weight && (
                  <p id="bmi-weight-err" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="sm:col-span-2">
                Calculate BMI
              </Button>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="panel p-8 sm:p-10" aria-live="polite">
            <div className="mx-auto max-w-sm">
              <Gauge bmi={bmi} />
            </div>
            {bmi === null || category === null ? (
              <p className="mt-6 text-center text-sm text-muted">Enter your height and weight to see where you stand.</p>
            ) : (
              <div className="text-center">
                <p className="font-display text-7xl leading-none">
                  <AnimatedNumber value={bmi} format={(n) => n.toFixed(1)} />
                </p>
                <p className="mt-1 font-display text-3xl tracking-wide" style={{ color: category.color }}>
                  {category.label}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm text-muted">{category.advice}</p>
                <Button href="#book" className="mt-7">
                  Book a free trial
                </Button>
                <p className="mt-4 text-[11px] text-muted/70">BMI is a general guide and does not account for muscle mass.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
