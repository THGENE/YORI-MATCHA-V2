import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const { items, shippingMethod } = await req.json();

  // Total produits
  const amountProducts = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const amountProductsInCents = Math.round(amountProducts * 100);

  // Frais Chronopost
  const shippingCost =
    shippingMethod === "chronopost_express" ? 1290 : 790; // en centimes

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountProductsInCents + shippingCost,
    currency: "eur",
    automatic_payment_methods: { enabled: true }, // Apple Pay + CB
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
}
