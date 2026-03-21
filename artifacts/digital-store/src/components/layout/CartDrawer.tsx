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
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";
import { getIconComponent } from '@/lib/store-data';

const WHATSAPP_NUMBER = '963997861597';

export function CartDrawer() {
  const { items, total, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = '🛒 *طلب جديد من ريدار ستور*\n\n';
    message += '📦 *المنتجات:*\n';

    items.forEach((item) => {
      const lineTotal = (item.option.price * item.quantity).toFixed(2);
      message += `• ${item.product.name}\n`;
      message += `  ↳ ${item.option.name} × ${item.quantity} = $${lineTotal}\n`;
    });

    message += `\n💰 *المجموع الإجمالي: $${total.toFixed(2)}*\n\n`;
    message += '⚡ يرجى تأكيد الطلب وإتمام الدفع';

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    clearCart();
    setIsCartOpen(false);
    window.open(waUrl, '_blank');
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
                      <p className="font-bold text-primary">${item.option.price}</p>
                      
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
              <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-6 rounded-xl shadow-lg shadow-green-500/25 border-0 flex items-center gap-2"
              onClick={handleCheckout}
            >
              <MessageCircle className="w-5 h-5" />
              إتمام الطلب عبر واتساب
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
