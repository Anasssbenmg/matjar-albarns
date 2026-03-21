import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductOption } from '@/lib/store-data';

export type CartItem = {
  id: string;
  product: Product;
  option: ProductOption;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (product: Product, option: ProductOption, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('ridar-cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ridar-cart', JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.option.price * item.quantity), 0);

  const addItem = (product: Product, option: ProductOption, quantity = 1) => {
    setItems(current => {
      const existingId = `${product.id}-${option.id}`;
      const existingItem = current.find(item => item.id === existingId);
      
      if (existingItem) {
        return current.map(item => 
          item.id === existingId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...current, { id: existingId, product, option, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(current => 
      current.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ 
      items, itemCount, total, isCartOpen, setIsCartOpen, 
      addItem, removeItem, updateQuantity, clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
