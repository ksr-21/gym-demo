"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  const reduce = useReducedMotion();
  const line = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center px-5 pb-24 pt-28 sm:px-8">
      <div className="container-x relative z-10">
        <div className="max-w-2xl lg:max-w-[46%]">
          <motion.p {...line(0)} className="eyebrow">
            Gym in {siteConfig.area}, {siteConfig.city}
          </motion.p>
          <h1 id="hero-title" className="mt-5 text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.9]">
            <motion.span {...line(1)} className="block">
              {siteConfig.headline[0]}
            </motion.span>
            <motion.span {...line(2)} className="block text-accent">
              {siteConfig.headline[1]}
            </motion.span>
          </h1>
          <motion.p {...line(3)} className="mt-6 max-w-lg text-base text-bone/75 sm:text-lg">
            {siteConfig.subheadline}
          </motion.p>
          <motion.div {...line(4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#book">Book free trial</Button>
            <Button href={whatsappLink()} variant="whatsapp">
              <WhatsAppIcon width={18} height={18} /> Chat on WhatsApp
            </Button>
          </motion.div>
        </div>
      </div>

      <a
        href="#stats"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-bone/50 transition-colors hover:text-accent sm:block"
      >
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}
