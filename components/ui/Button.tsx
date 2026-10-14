"use client";

import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scroll";

type Variant = "primary" | "outline" | "whatsapp" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-onaccent hover:bg-accent/85",
  outline: "border border-bone/40 text-bone hover:border-accent hover:text-accent",
  whatsapp: "bg-[#25D366] text-onaccent hover:bg-[#1fb857]",
  ghost: "text-bone hover:text-accent",
};

const common =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-widest transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };
type NativeButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(common, variants[variant], className);

  if (typeof rest.href === "string") {
    const { href, onClick, ...anchor } = rest as Omit<LinkProps, keyof CommonProps>;
    const internal = href.startsWith("#");
    return (
      <motion.a
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        href={href}
        {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        {...(anchor as object)}
        onClick={(e) => {
          onClick?.(e);
          if (internal && !e.defaultPrevented) {
            e.preventDefault();
            scrollToHash(href);
          }
        }}
      >
        {children}
      </motion.a>
    );
  }

  const { type = "button", ...button } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      type={type}
      {...(button as object)}
    >
      {children}
    </motion.button>
  );
}
