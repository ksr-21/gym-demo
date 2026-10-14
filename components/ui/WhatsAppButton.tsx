"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-[80] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-onaccent shadow-[0_8px_30px_rgba(37,211,102,0.4)] sm:bottom-7 sm:right-7"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      <WhatsAppIcon width={30} height={30} className="relative" />
    </motion.a>
  );
}
