import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

    if (!secretKey || !publishableKey) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante (clés API)." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2024-06-20",
    });

    const { items, shippingMethod } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Panier invalide pour initialiser le paiement." },
        { status: 400 }
      );
    }

    const amountProducts = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    const amountProductsInCents = Math.round(amountProducts * 100);

    const shippingCost =
      shippingMethod === "chronopost_express" ? 1290 : 790;

    const microPaymentEnabled = process.env.STRIPE_MICRO_PAYMENT_TEST === "true";
    const microPaymentAmountRaw = Number(process.env.STRIPE_MICRO_PAYMENT_AMOUNT_CENTS ?? "100");
    const microPaymentAmountCents = Number.isFinite(microPaymentAmountRaw) && microPaymentAmountRaw > 0
      ? Math.round(microPaymentAmountRaw)
      : 100;

    const finalAmount = microPaymentEnabled
      ? microPaymentAmountCents
      : amountProductsInCents + shippingCost;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      excluded_payment_method_types: ["bancontact", "eps"],
      metadata: {
        microPaymentTest: microPaymentEnabled ? "true" : "false",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      publishableKey,
    });
  } catch (error: any) {
    const message =
      error?.type === "StripeAuthenticationError"
        ? "Clé Stripe invalide. Vérifie STRIPE_SECRET_KEY dans .env.local."
        : error?.message || "Erreur Stripe lors de l'initialisation du paiement.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
