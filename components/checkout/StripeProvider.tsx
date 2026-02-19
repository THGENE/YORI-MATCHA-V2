"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

type Props = {
  children: React.ReactNode;
  publishableKey: string;
  clientSecret: string;
};

export default function StripeProvider({ children, publishableKey, clientSecret }: Props) {
  const stripePromise = useMemo(() => loadStripe(publishableKey), [publishableKey]);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#6f7f45",
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
