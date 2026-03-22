import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/lib/settings-context';
import type { Product } from '@/lib/store-data';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductModal } from '@/components/product/ProductModal';

export function Balance() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { getSectionLabel, getProductsByCategory } = useSettings();
  const label = getSectionLabel('balance');
  const products = getProductsByCategory('balance');

  return (
    <div className="min-h-screen pt-28 pb-32">
      <div className="container mx-auto px-4">

        <div className="bg-secondary/40 border border-white/5 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <div className="text-center md:text-start">
              <h1 className="text-4xl font-black text-foreground mb-3">{label.page}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                شحن رصيد لجميع شبكات الجوال السورية — Rcell، MTN، Syriatel — بالدفع عبر شام كاش.
              </p>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        ) : null}

        <div className="glass-panel rounded-2xl p-8 text-center">
          <MessageCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">اطلب عبر واتساب</h2>
          <p className="text-muted-foreground mb-6">
            لطلب شحن الرصيد، تواصل معنا مباشرة عبر واتساب وسنخدمك في أسرع وقت.
          </p>
          <a
            href="https://wa.me/963997861597"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 h-12 rounded-xl border-0">
              تواصل عبر واتساب
            </Button>
          </a>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
