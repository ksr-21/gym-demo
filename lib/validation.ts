import { z } from "zod";
import { trialGoals, trialSlots } from "@/data/site";

/** Accepts "98765 43210", "+91 98765-43210", "09876543210" and normalises to 10 digits. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(60, "Name is too long"),
  phone: z
    .string()
    .transform(normalisePhone)
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  slot: z.enum(trialSlots, { message: "Choose a preferred time slot" }),
  goal: z.enum(trialGoals, { message: "Choose your goal" }),
});

/** Form version adds a honeypot field that real users never fill. */
export const bookingFormSchema = bookingSchema.extend({ company: z.string().optional() });

export type BookingInput = z.input<typeof bookingFormSchema>;
export type BookingData = z.output<typeof bookingSchema>;

const measurement = (label: string, unit: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, `Enter your ${label} in ${unit}`)
    .transform(Number)
    .pipe(
      z
        .number({ message: `Enter a valid ${label}` })
        .min(min, `${label[0].toUpperCase()}${label.slice(1)} must be at least ${min} ${unit}`)
        .max(max, `${label[0].toUpperCase()}${label.slice(1)} must be under ${max} ${unit}`),
    );

export const bmiSchema = z.object({
  height: measurement("height", "cm", 100, 250),
  weight: measurement("weight", "kg", 25, 300),
});

export type BmiInput = z.input<typeof bmiSchema>;
export type BmiData = z.output<typeof bmiSchema>;
