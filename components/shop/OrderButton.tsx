"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { OrderModal } from "@/components/shop/OrderModal";

interface OrderButtonProps {
  productId: string;
  productSlug: string;
  productTitle: string;
  currency: string;
  priceCents: number;
}

/** "Commander" CTA that opens the order form. */
export function OrderButton({
  productId,
  productSlug,
  productTitle,
  currency,
  priceCents,
}: OrderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-track="commander"
        className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold tracking-tight text-primary shadow-sm transition-all duration-200 hover:bg-accent-light hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-auto sm:text-base"
      >
        Commander
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      <OrderModal
        open={open}
        onClose={() => setOpen(false)}
        productId={productId}
        productSlug={productSlug}
        productTitle={productTitle}
        currency={currency}
        fallbackPriceCents={priceCents}
      />
    </>
  );
}
