"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-2xl z-[100] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      style={{ boxShadow: open ? "-4px 0 24px #0002" : "none" }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Votre commande</h2>
        <button onClick={onClose} className="text-2xl">×</button>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto" style={{maxHeight:'calc(100vh-160px)'}}>
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">Votre panier est vide.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b pb-2">
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">x{item.quantity} — {item.price.toFixed(2)}€</div>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs">Supprimer</button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between font-bold mb-3">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        <button className="w-full bg-primary text-primary-foreground py-3 rounded font-medium hover:bg-primary/90 transition mb-2" disabled={items.length===0}>
          Finaliser la commande
        </button>
        <button className="w-full text-xs text-muted-foreground hover:underline" onClick={clear} disabled={items.length===0}>
          Vider le panier
        </button>
      </div>
    </div>
  );
}
