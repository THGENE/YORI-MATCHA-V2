"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import type { FormEvent } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setMessage(error.message || "Erreur lors du paiement");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />

      {message && <p className="text-red-500 text-sm">{message}</p>}

      <button
        disabled={!stripe || loading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition disabled:opacity-50"
      >
        {loading ? "Paiement en cours..." : "Payer maintenant"}
      </button>
    </form>
  );
}
