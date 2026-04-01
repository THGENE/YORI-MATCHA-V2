"use client";

import {
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import type { FormEvent } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function confirmPayment() {
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message || "Impossible d'initialiser ce moyen de paiement.");
      setLoading(false);
      return;
    }

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await confirmPayment();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-md border border-border bg-card/40 p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Paiement express</p>
        <ExpressCheckoutElement
          onConfirm={confirmPayment}
          options={{
            buttonHeight: 48,
            buttonTheme: {
              applePay: "black",
              paypal: "gold",
            },
            buttonType: {
              applePay: "buy",
              paypal: "checkout",
            },
            layout: {
              maxColumns: 2,
              maxRows: 2,
              overflow: "never",
            },
            paymentMethodOrder: ["apple_pay", "amazon_pay", "paypal"],
            paymentMethods: {
              amazonPay: "auto",
              applePay: "always",
              paypal: "auto",
            },
          }}
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Apple Pay, Amazon Pay et PayPal s&apos;affichent automatiquement s&apos;ils sont disponibles.
        </p>
      </div>

      <div className="relative py-1 text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
        <span className="bg-background px-3">ou payer par carte</span>
        <div className="absolute left-0 right-0 top-1/2 -z-10 border-t border-border" />
      </div>

      <PaymentElement
        options={{
          paymentMethodOrder: ["apple_pay", "amazon_pay", "paypal", "card"],
          wallets: {
            applePay: "auto",
          },
          layout: {
            type: "accordion",
            defaultCollapsed: false,
          },
        }}
      />

      {message && <p className="text-red-500 text-sm">{message}</p>}

      <button
        disabled={!stripe || loading}
        className="btn-client w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition disabled:opacity-50"
      >
        {loading ? "Paiement en cours..." : "Payer maintenant"}
      </button>
    </form>
  );
}
