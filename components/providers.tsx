"use client";

import { CartProvider } from "@/lib/cart-context";
import { BrandProvider } from "@/lib/brand-context";
import CartDrawer from "@/components/shop/CartDrawer";
import { BrandCustomizer } from "@/components/brand-customizer";
import { AdelVoiceGuide } from "@/components/adel-voice-guide";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrandProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <BrandCustomizer />
        <AdelVoiceGuide />
      </CartProvider>
    </BrandProvider>
  );
}
