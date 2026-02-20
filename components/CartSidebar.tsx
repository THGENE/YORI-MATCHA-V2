"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";
import { catalogById } from "@/lib/product-catalog";
import PackshotImage, { getPackshotStyleByProductId } from "@/components/PackshotImage";

export default function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    router.prefetch("/panier");
  }, [router]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Fermer le panneau panier"
        onClick={onClose}
        className={`fixed inset-0 z-[125] bg-background/65 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed top-0 right-0 z-[130] h-full w-[min(94vw,460px)] bg-card text-foreground border-l border-border/70 shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-border/60 bg-background/30">
          <h2 className="text-xl font-semibold tracking-wide">Votre panier</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-border/70 flex items-center justify-center hover:border-primary/50 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-4 flex-1 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 border border-border/50 rounded-sm bg-secondary/20">
              Votre panier est vide.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-start gap-3 border border-border/50 rounded-sm p-3 bg-background/40">
                <div className="product-visual-shell relative h-10 w-10 rounded-sm overflow-hidden shrink-0">
                  <PackshotImage
                    src={catalogById[item.id]?.image ?? "/images/logo-y.png"}
                    alt={item.name}
                    style={getPackshotStyleByProductId(item.id)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium line-clamp-2">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">x{item.quantity} — {item.price.toFixed(2)}€</div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs hover:underline">Supprimer</button>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t border-border/70 bg-background/30">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Total</span>
            <span className="text-primary">{total.toFixed(2)} €</span>
          </div>
          <button
            className="btn-client w-full bg-primary text-primary-foreground py-3 rounded-sm font-medium hover:bg-primary/90 transition mb-2"
            disabled={items.length===0}
            onClick={() => {
              onClose();
              router.push("/panier");
            }}
          >
            Finaliser la commande
          </button>
          <button className="btn-client btn-client--text w-full text-xs text-muted-foreground hover:underline" onClick={clear} disabled={items.length===0}>
            Vider le panier
          </button>
        </div>
      </aside>
    </>
  );
}
