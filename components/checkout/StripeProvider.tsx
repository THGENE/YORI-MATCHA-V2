"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

const customPaymentMethods = [
  {
    id: "cpmt_1THNXPGyewrR8mJmWYmDIade",
    options: {
      type: "static" as const,
    },
  },
];

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
        customPaymentMethods,
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
