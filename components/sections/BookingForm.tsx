"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { siteConfig, trialGoals, trialSlots } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { bookingFormSchema, type BookingData, type BookingInput } from "@/lib/validation";
import { IS_STATIC_EXPORT } from "@/lib/utils";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";

const inputBase =
  "mt-2 w-full border bg-ink px-4 py-3.5 text-base text-bone placeholder:text-muted/60 focus:border-accent focus:outline-none";

function SuccessState({ name, link }: { name: string; link: string }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-10 text-center"
      role="status"
    >
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden>
        <motion.circle
          cx="48"
          cy="48"
          r="42"
          fill="none"
          stroke="rgb(var(--accent-rgb))"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.path
          d="M28 50 L43 64 L69 34"
          fill="none"
          stroke="rgb(var(--accent-rgb))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
        />
      </svg>
      <h3 className="mt-6 text-5xl">You&apos;re in, {name.split(" ")[0]}!</h3>
      <p className="mt-3 max-w-sm text-sm text-muted">
        Your free trial request is ready. We&apos;ve opened WhatsApp with your details — just hit send and our team will confirm your slot.
      </p>
      <Button href={link} variant="whatsapp" className="mt-7">
        <WhatsAppIcon width={18} height={18} /> Open WhatsApp again
      </Button>
    </motion.div>
  );
}

export function BookingForm() {
  const [submitted, setSubmitted] = useState<{ name: string; link: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput, unknown, BookingData & { company?: string }>({
    resolver: zodResolver(bookingFormSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", slot: undefined, goal: undefined, company: "" },
  });

  const onSubmit = async ({ company, ...data }: BookingData & { company?: string }) => {
    setServerError(null);
    const link = whatsappLink(bookingMessage(data));
    // Open WhatsApp immediately, inside the user's click gesture, so popup blockers allow it.
    window.open(link, "_blank", "noopener,noreferrer");
    try {
      // Static hosting (GitHub Pages) has no API route; WhatsApp remains the lead channel.
      if (!IS_STATIC_EXPORT) {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company }),
      });
      if (!res.ok) throw new Error("Request failed");
      }
    } catch {
      // The WhatsApp message is the primary channel; log failure shouldn't block the user.
      setServerError("We couldn't log your request online, but your WhatsApp message is ready to send.");
    }
    setSubmitted({ name: data.name, link });
  };

  return (
    <section id="book" aria-labelledby="book-title" className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div id="book-title">
            <SectionHeading
              eyebrow="No card. No commitment."
              title="Claim your"
              accent="free trial"
              intro={`Train at ${siteConfig.shortName} for a day on us. Pick a slot — a coach will walk you through the floor and build your first session.`}
            />
          </div>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3 text-sm text-bone/80">
              <li>✓ Full floor and class access</li>
              <li>✓ Free body assessment with a trainer</li>
              <li>✓ Confirmation on WhatsApp within minutes</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="panel p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <div key="done">
                  <SuccessState name={submitted.name} link={submitted.link} />
                  {serverError && <p className="mt-2 text-center text-xs text-muted">{serverError}</p>}
                </div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
                  <div>
                    <label htmlFor="b-name" className="text-xs font-semibold uppercase tracking-widest text-muted">
                      Full name
                    </label>
                    <input
                      id="b-name"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "b-name-err" : undefined}
                      className={`${inputBase} ${errors.name ? "border-red-500" : "border-line"}`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="b-name-err" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="b-phone" className="text-xs font-semibold uppercase tracking-widest text-muted">
                      Mobile number
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-base text-muted">+91</span>
                      <input
                        id="b-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        maxLength={14}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "b-phone-err" : undefined}
                        className={`${inputBase} pl-14 ${errors.phone ? "border-red-500" : "border-line"}`}
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && (
                      <p id="b-phone-err" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="b-slot" className="text-xs font-semibold uppercase tracking-widest text-muted">
                        Preferred time
                      </label>
                      <select
                        id="b-slot"
                        defaultValue=""
                        aria-invalid={!!errors.slot}
                        aria-describedby={errors.slot ? "b-slot-err" : undefined}
                        className={`${inputBase} ${errors.slot ? "border-red-500" : "border-line"}`}
                        {...register("slot")}
                      >
                        <option value="" disabled>
                          Select a slot
                        </option>
                        {trialSlots.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.slot && (
                        <p id="b-slot-err" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.slot.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="b-goal" className="text-xs font-semibold uppercase tracking-widest text-muted">
                        Your goal
                      </label>
                      <select
                        id="b-goal"
                        defaultValue=""
                        aria-invalid={!!errors.goal}
                        aria-describedby={errors.goal ? "b-goal-err" : undefined}
                        className={`${inputBase} ${errors.goal ? "border-red-500" : "border-line"}`}
                        {...register("goal")}
                      >
                        <option value="" disabled>
                          Select your goal
                        </option>
                        {trialGoals.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {errors.goal && (
                        <p id="b-goal-err" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.goal.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Honeypot: hidden from humans, bots tend to fill it */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="b-company">Company</label>
                    <input id="b-company" tabIndex={-1} autoComplete="off" {...register("company")} />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden /> Booking…
                      </>
                    ) : (
                      "Book my free trial"
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted">
                    Submitting opens WhatsApp with your details pre-filled for {siteConfig.shortName}.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
