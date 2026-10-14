"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between px-5 sm:px-8">
        <a href="#hero" onClick={go("#hero")} className="flex items-center gap-2" aria-label={`${siteConfig.name} — home`}>
          <span aria-hidden className="grid h-8 w-8 place-items-center bg-accent font-display text-xl leading-none text-onaccent">
            {siteConfig.name[0]}
          </span>
          <span className="font-display text-2xl tracking-[0.18em]">{siteConfig.name}</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={go(l.href)}
                className="text-sm font-medium uppercase tracking-widest text-bone/80 transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="#book" className="hidden px-5 py-2.5 sm:inline-flex">
            Book free trial
          </Button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "calc(100svh - 72px)", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pt-6">
              {siteConfig.nav.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={go(l.href)}
                    className="block border-b border-line py-4 font-display text-4xl uppercase tracking-wide"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-8">
                <Button href="#book" onClick={() => setOpen(false)} className="w-full">
                  Book free trial
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
