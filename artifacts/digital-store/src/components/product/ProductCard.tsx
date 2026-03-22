import React from 'react';
import { Product, CATEGORY_LABELS } from '@/lib/store-data';
import { getIconComponent } from '@/lib/store-data';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSettings } from '@/lib/settings-context';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const Icon = getIconComponent(product.iconName);
  const minPrice = product.options.length > 0 ? Math.min(...product.options.map(o => o.price)) : 0;
  const label = CATEGORY_LABELS[product.category] || product.category;
  const { getProductImage } = useSettings();
  const productImage = getProductImage(product.id);

  return (
    <div 
      className="group relative flex flex-col glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 hover:border-primary/20"
      onClick={() => onClick(product)}
    >
      <div className={`h-32 w-full bg-gradient-to-br ${product.color} relative overflow-hidden flex items-center justify-center p-6`}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)] bg-[length:12px_12px]" />
        <div className="absolute inset-0 bg-black/10" />
        
        {productImage ? (
          <img
            src={productImage}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-2xl relative z-10 shadow-xl transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Icon className="w-14 h-14 text-white drop-shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          <Badge className="bg-black/50 backdrop-blur-md text-white border-white/10 font-bold text-[10px] px-2 py-0.5">
            {label}
          </Badge>
          {product.badge && (
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 font-bold text-[10px] px-2 py-0.5 shadow-md">
              {product.badge}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col bg-card">
        <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-snug">{product.name}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.options.slice(0, 3).map((opt, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-white/5">
              {opt.name}
            </span>
          ))}
          {product.options.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-white/5">
              +{product.options.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5">{product.isCustom ? 'السعر' : 'تبدأ من'}</p>
            <p className="text-base font-black gradient-text leading-none">{product.isCustom ? 'حسب الطلب' : `$${minPrice}`}</p>
          </div>
          
          <button className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-primary/30">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
