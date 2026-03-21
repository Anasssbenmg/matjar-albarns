import React from 'react';
import { useCart } from '@/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { getIconComponent } from '@/lib/store-data';
import { useToast } from '@/hooks/use-toast';

export function CartDrawer() {
  const { items, total, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    toast({
      title: "تم توجيهك للدفع",
      description: "جاري تجهيز طلبك...",
      className: "border-primary bg-card/80 backdrop-blur-md",
    });
    
    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      toast({
        title: "تم إتمام الطلب بنجاح! 🎉",
        description: "شكراً لتسوقك من ريدار ستور",
        className: "border-green-500 bg-card/80 backdrop-blur-md",
      });
    }, 1500);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col border-r-white/10 bg-card/95 backdrop-blur-xl">
        <SheetHeader className="text-start pb-4 border-b border-border">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <ShoppingBag className="w-6 h-6 text-primary" />
            سلة المشتريات
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4 opacity-70">
              <ShoppingBag className="w-16 h-16 mb-2" />
              <p className="text-lg">السلة فارغة</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                تصفح المنتجات
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const Icon = getIconComponent(item.product.iconName);
              
              return (
                <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-secondary/50 border border-white/5 relative group">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.product.color} flex items-center justify-center shrink-0`}>
                    <Icon className="text-white w-8 h-8 drop-shadow-md" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.option.name}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-primary">{item.option.price} ر.س</p>
                      
                      <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1 border border-border">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 left-2 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="pt-4 border-t border-border flex flex-col gap-4 sm:flex-col">
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground font-medium">المجموع الإجمالي:</span>
              <span className="text-2xl font-bold gradient-text">{total} ر.س</span>
            </div>
            <Button 
              className="w-full bg-gradient-to-l from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg py-6 rounded-xl shadow-lg shadow-primary/25 border-0"
              onClick={handleCheckout}
            >
              إتمام الطلب
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
