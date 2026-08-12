import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getSupabaseClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

const SITE = "comarden-events";
const TYPES = new Set(["pageview", "click"]);

/** Coarse device class from the user agent. No fingerprinting beyond this. */
function deviceOf(ua: string): "mobile" | "tablet" | "desktop" {
  const s = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(s)) return "tablet";
  if (/mobi|iphone|ipod|android|blackberry|windows phone/.test(s)) return "mobile";
  return "desktop";
}

/** Hostname of the referrer, ignoring our own traffic. */
function referrerHost(referrer: string | undefined, self: string | null): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (self && host === self.replace(/^www\./, "")) return null;
    return host.slice(0, 120);
  } catch {
    return null;
  }
}

/**
 * Daily-rotating anonymous visitor hash.
 *
 * Built from IP + user agent + the current day (+ an optional secret). The IP
 * itself is never stored, and because the day is part of the input the hash
 * cannot be used to follow someone across days. This keeps visitor counts
 * meaningful without holding personal data.
 */
function visitorHash(ip: string, ua: string): string {
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SALT ?? "comarden";
  return createHash("sha256").update(`${ip}|${ua}|${day}|${salt}`).digest("hex").slice(0, 32);
}

const str = (v: unknown, max: number): string | null =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = str(body.type, 16);
  const path = str(body.path, 300);
  if (!type || !TYPES.has(type) || !path) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "0.0.0.0";

  const sb = getSupabaseClient();
  if (!sb) return NextResponse.json({ ok: true });

  const { error } = await sb.from("site_events").insert({
    site: SITE,
    type,
    path,
    label: str(body.label, 120),
    referrer_host: referrerHost(str(body.referrer, 500) ?? undefined, request.nextUrl.hostname),
    device: deviceOf(ua),
    visitor_hash: visitorHash(ip, ua),
    session_id: str(body.sessionId, 64),
  });

  // Never surface analytics failures to the visitor.
  if (error) console.error("[track] insert error:", error.message);

  return NextResponse.json({ ok: true });
}
