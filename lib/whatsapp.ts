import { siteConfig } from "@/data/site";
import type { BookingData } from "@/lib/validation";

export function whatsappLink(message: string = siteConfig.whatsappGreeting): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(data: BookingData): string {
  return [
    `Hi ${siteConfig.shortName}! I'd like to book a *free trial*.`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Preferred time: ${data.slot}`,
    `Goal: ${data.goal}`,
  ].join("\n");
}
