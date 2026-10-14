import type { BookingData } from "@/lib/validation";

export interface Lead extends BookingData {
  id: string;
  receivedAt: string;
}

/**
 * Single place to plug in lead delivery. Currently logs to the server console
 * (visible in Vercel → Logs). To go further, call your provider here, e.g.:
 *   - Google Sheets: append a row via the Sheets API / an Apps Script web-app URL
 *   - Email: Resend / Nodemailer to the gym owner
 * Throwing from this function makes /api/book respond with a 500.
 */
export async function recordLead(data: BookingData): Promise<Lead> {
  const lead: Lead = { ...data, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
  console.info("[lead] free-trial booking", JSON.stringify(lead));
  return lead;
}
