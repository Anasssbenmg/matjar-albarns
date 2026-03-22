import React, { useState } from 'react';
import { useParams } from 'wouter';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductModal } from '@/components/product/ProductModal';
import { useSettings } from '@/lib/settings-context';
import type { Product } from '@/lib/store-data';

export function CategoryPage() {
  const params = useParams<{ catId: string }>();
  const catId = params.catId ?? '';
  const { getProductsByCategory, getCategoryLabel } = useSettings();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = getProductsByCategory(catId);
  const label = getCategoryLabel(catId) || catId;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-3">{label}</h1>
          <p className="text-muted-foreground">
            {products.length} منتج متاح
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">لا توجد منتجات في هذه الفئة بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
