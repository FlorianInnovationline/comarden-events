import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseClient } from "@/lib/supabase/client";
import { ORDER_TO, ORDER_BCC, ORDER_FROM } from "@/lib/shop/orderRecipients";

export const dynamic = "force-dynamic";

interface OrderPayload {
  productSlug?: string;
  productTitle?: string;
  productId?: string;
  variant?: string;
  quantity?: number;
  unitPriceCents?: number;
  currency?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

const MAX = 2000;
const clean = (v: unknown): string =>
  typeof v === "string" ? v.trim().slice(0, MAX) : "";

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function euro(cents: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-BE", { style: "currency", currency }).format(
    cents / 100
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Receives an order request from the product page.
 *
 * The request is always stored in the shared `orders` table first, so a lead is
 * never lost even if the mail provider is unavailable or not configured yet.
 * The notification is then emailed to the sales address, with a blind copy that
 * exists only in this server-side call - it is never exposed to the browser.
 */
export async function POST(request: NextRequest) {
  let body: OrderPayload;
  try {
    body = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const company = clean(body.company);
  const address = clean(body.address);
  const notes = clean(body.notes);
  const variant = clean(body.variant);
  const productTitle = clean(body.productTitle);
  const productSlug = clean(body.productSlug);
  const currency = clean(body.currency) || "EUR";

  const quantity =
    Number.isFinite(Number(body.quantity)) && Number(body.quantity) > 0
      ? Math.min(9999, Math.round(Number(body.quantity)))
      : 1;
  const unitPriceCents =
    Number.isFinite(Number(body.unitPriceCents)) && Number(body.unitPriceCents) >= 0
      ? Math.round(Number(body.unitPriceCents))
      : 0;

  if (!name || !email || !productTitle) {
    return NextResponse.json(
      { error: "Nom, e-mail et produit sont obligatoires." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Merci d'indiquer une adresse e-mail valide." },
      { status: 400 }
    );
  }

  const lineTotal = unitPriceCents * quantity;

  // ---- 1. Persist the request so it is never lost -------------------------
  let orderId: string | null = null;
  const sb = getSupabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from("orders")
      .insert({
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        company: company || null,
        delivery_address: address || null,
        notes: [variant && `Variante : ${variant}`, notes].filter(Boolean).join("\n") || null,
        status: "new",
        total_cents: lineTotal,
        currency,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[commander] order insert error:", error.message);
    } else {
      orderId = data.id;
      const { error: itemErr } = await sb.from("order_items").insert({
        order_id: data.id,
        product_id: clean(body.productId) || null,
        product_title: variant ? `${productTitle} (${variant})` : productTitle,
        qty: quantity,
        unit_price_cents: unitPriceCents,
        line_total_cents: lineTotal,
      });
      if (itemErr) console.error("[commander] order item error:", itemErr.message);
    }
  }

  // ---- 2. Notify the sales team ------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  let emailed = false;

  if (apiKey) {
    const rows: [string, string][] = [
      ["Produit", productTitle],
      ...(variant ? ([["Variante", variant]] as [string, string][]) : []),
      ["Quantité", String(quantity)],
      ...(unitPriceCents > 0
        ? ([
            ["Prix unitaire", euro(unitPriceCents, currency)],
            ["Total indicatif", euro(lineTotal, currency)],
          ] as [string, string][])
        : ([["Prix", "Sur devis"]] as [string, string][])),
      ["Nom", name],
      ...(company ? ([["Société", company]] as [string, string][]) : []),
      ["E-mail", email],
      ...(phone ? ([["Téléphone", phone]] as [string, string][]) : []),
      ...(address ? ([["Adresse de livraison", address]] as [string, string][]) : []),
      ...(notes ? ([["Remarques", notes]] as [string, string][]) : []),
    ];

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px">
        <h2 style="color:#002D59;margin:0 0 4px">Nouvelle commande</h2>
        <p style="margin:0 0 20px;color:#64748b;font-size:14px">
          Demande envoyée depuis comarden-events.be
        </p>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows
            .map(
              ([k, v], i) => `
            <tr style="background:${i % 2 ? "#f8fafc" : "#ffffff"}">
              <td style="padding:10px 12px;font-weight:bold;color:#002D59;width:190px;vertical-align:top">${escapeHtml(k)}</td>
              <td style="padding:10px 12px;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`
            )
            .join("")}
        </table>
        ${
          productSlug
            ? `<p style="margin:20px 0 0;font-size:13px">
                 <a href="https://comarden-events.be/shop/produit/${encodeURIComponent(productSlug)}" style="color:#002D59">Voir la fiche produit</a>
               </p>`
            : ""
        }
        ${orderId ? `<p style="margin:16px 0 0;color:#94a3b8;font-size:12px">Référence interne : ${orderId}</p>` : ""}
      </div>`;

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: ORDER_FROM,
        to: [ORDER_TO],
        // Blind copy: set only here, server-side. It never appears in the
        // message the visible recipient receives, nor anywhere in the client.
        bcc: [ORDER_BCC],
        replyTo: email,
        subject: `Commande - ${productTitle}${variant ? ` (${variant})` : ""}`,
        html,
        text,
      });
      if (error) {
        console.error("[commander] resend error:", error);
      } else {
        emailed = true;
      }
    } catch (e) {
      console.error("[commander] resend threw:", e);
    }
  } else {
    console.warn(
      "[commander] RESEND_API_KEY absent - commande enregistrée en base, e-mail non envoyé."
    );
  }

  // The request counts as received once it is stored or emailed. Failing both
  // means nothing captured the lead, so the customer must be told plainly.
  if (!orderId && !emailed) {
    console.error(
      "[commander] lead perdu : ni enregistrement en base, ni e-mail. " +
        "Vérifiez RESEND_API_KEY et la policy orders_insert_public."
    );
    return NextResponse.json(
      {
        error:
          "Nous n'avons pas pu transmettre votre demande. Merci de nous contacter directement.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
