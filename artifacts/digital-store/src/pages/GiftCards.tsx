import React, { useState } from 'react';
import type { Product } from '@/lib/store-data';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductModal } from '@/components/product/ProductModal';
import { CreditCard } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';

export function GiftCards() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { getSectionLabel, getProductsByCategory } = useSettings();
  const label = getSectionLabel('gift-cards');
  const products = getProductsByCategory('gift-cards');

  return (
    <div className="min-h-screen pt-28 pb-32">
      <div className="container mx-auto px-4">
        
        <div className="bg-secondary/40 border border-white/5 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <div className="text-center md:text-start">
              <h1 className="text-4xl font-black text-foreground mb-3">{label.page}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                بطاقات رقمية بأسعار منافسة وتسليم فوري مضمون.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={setSelectedProduct} 
            />
          ))}
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
