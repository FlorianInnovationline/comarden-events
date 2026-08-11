// ============================================================================
// Where order requests are sent.
// ----------------------------------------------------------------------------
// The BCC address must never reach the browser: it is used only inside the API
// route, server-side, so neither the customer nor the visible recipient can see
// it in the message headers or in the page source.
// ============================================================================

/** Visible recipient of every order request. */
export const ORDER_TO = "mdegroote@comarden.be";

/** Silent copy. Server-only - never import this from a client component. */
export const ORDER_BCC = "frederic.brasseur@me.com";

/**
 * From address used by Resend. Until a domain is verified in Resend, their
 * shared sending domain is the only one allowed.
 */
export const ORDER_FROM =
  process.env.ORDER_FROM_EMAIL ?? "Comarden <onboarding@resend.dev>";
