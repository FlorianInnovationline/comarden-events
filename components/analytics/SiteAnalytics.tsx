"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/** Random per-tab id, used only to group a visit into a session. Not a cookie. */
function sessionId(): string {
  try {
    const KEY = "cev-sid";
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

function send(payload: Record<string, unknown>): void {
  try {
    const body = JSON.stringify({ ...payload, sessionId: sessionId() });
    // sendBeacon survives the page unloading, which plain fetch does not.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Cookieless first-party analytics for comarden-events.
 *
 * Records a pageview on every route change and any click on an element tagged
 * with `data-track`. No cookies, no persistent identifier and no personal data
 * leave the browser: the visitor hash is derived server-side and rotates daily.
 */
export function SiteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  // Pageviews
  useEffect(() => {
    if (!pathname) return;
    // Guard against duplicate fires for the same path (StrictMode, re-renders).
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    send({
      type: "pageview",
      path: pathname,
      referrer: document.referrer || undefined,
    });
    // searchParams is included so a query-only change still counts as a view.
  }, [pathname, searchParams]);

  // Clicks on tagged elements
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const label = el.dataset.track;
      if (!label) return;
      send({ type: "click", path: window.location.pathname, label });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
