import React, { useState } from 'react';
import { Product } from '@/lib/store-data';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/lib/settings-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { getIconComponent } from '@/lib/store-data';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const { addItem } = useCart();
  const { toast } = useToast();
  const { getProductImage } = useSettings();

  React.useEffect(() => {
    if (product && product.options.length > 0) {
      setSelectedOptionId(product.options[0].id);
    }
  }, [product]);

  if (!product) return null;

  const Icon = getIconComponent(product.iconName);
  const selectedOption = product.options.find(o => o.id === selectedOptionId) || product.options[0];
  const productImage = getProductImage(product.id);

  const handleAddToCart = () => {
    if (!selectedOption) return;
    
    addItem(product, selectedOption, 1);
    
    toast({
      title: "تم الإضافة بنجاح",
      description: `تم إضافة ${product.name} - ${selectedOption.name} للسلة`,
      className: "border-primary bg-card/90 backdrop-blur-md text-foreground",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-card/95 backdrop-blur-xl p-0 overflow-hidden">
        
        <div className={`h-32 w-full bg-gradient-to-r ${product.color} relative overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          {productImage ? (
            <img src={productImage} alt={product.name} className="w-24 h-24 object-cover rounded-2xl relative z-10 shadow-xl" />
          ) : (
            <Icon className="w-16 h-16 text-white drop-shadow-xl relative z-10" />
          )}
        </div>

        <div className="p-6">
          <DialogHeader className="text-start pb-4">
            <DialogTitle className="text-2xl font-black">{product.name}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mt-1">
              اختر الباقة أو الفئة المناسبة لك
            </DialogDescription>
          </DialogHeader>

          {product.features && (
            <div className="mb-6 flex flex-wrap gap-2">
              {product.features.map((feature, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  {i % 2 === 0 ? <ShieldCheck className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                  {feature}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            {product.options.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  selectedOptionId === option.id
                    ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(249,115,22,0.20)]'
                    : 'border-white/5 bg-secondary/50 hover:border-white/20 hover:bg-secondary/80'
                }`}
              >
                <span className={`font-bold mb-2 ${selectedOptionId === option.id ? 'text-primary' : 'text-foreground'}`}>
                  {option.name}
                </span>
                {option.price > 0 && (
                  <span className="text-lg font-black gradient-text">${option.price}</span>
                )}
                {option.price === 0 && (
                  <span className="text-sm font-bold text-muted-foreground">حسب الطلب</span>
                )}
                
                {selectedOptionId === option.id && (
                  <CheckCircle2 className="w-5 h-5 text-primary absolute top-2 right-2 animate-in zoom-in" />
                )}
              </button>
            ))}
          </div>

          <DialogFooter className="sm:justify-between items-center flex-row-reverse">
            {selectedOption && selectedOption.price > 0 && (
              <div className="flex flex-col items-start hidden sm:flex">
                <span className="text-xs text-muted-foreground font-medium">السعر النهائي</span>
                <span className="text-2xl font-black text-foreground">${selectedOption.price}</span>
              </div>
            )}
            
            <Button 
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-gradient-to-l from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg h-14 px-8 rounded-xl shadow-lg shadow-primary/25 border-0"
            >
              <ShoppingCart className="w-5 h-5 ml-2" />
              أضف للسلة
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
