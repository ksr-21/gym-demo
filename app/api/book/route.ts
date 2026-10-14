import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { recordLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry, but record nothing.
  if (typeof body === "object" && body !== null && "company" in body && (body as { company?: unknown }).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 422 },
    );
  }

  try {
    const lead = await recordLead(parsed.data);
    return NextResponse.json({ ok: true, id: lead.id });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not record booking" }, { status: 500 });
  }
}
