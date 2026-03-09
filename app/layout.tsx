import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import GlobalCartWidget from "@/components/GlobalCartWidget";
import GlobalChatWidget from "@/components/GlobalChatWidget";

export const metadata: Metadata = {
  title: "YORI Matcha | Matcha Japonais d’Exception",
  description: "Une sélection de matchas d’exception, pensés comme une expérience aussi précise qu’un produit Apple.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <I18nProvider>
          {children}
          <GlobalCartWidget />
          <GlobalChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}

