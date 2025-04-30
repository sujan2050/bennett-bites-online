
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('bennettCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('bennettCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: MenuItem, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.menuItemId === item.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(cartItem => 
          cartItem.menuItemId === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantity } 
            : cartItem
        );
        toast({
          title: "Updated Cart",
          description: `Added ${quantity} more ${item.name} to your cart.`,
        });
        return updatedItems;
      } else {
        toast({
          title: "Added to Cart",
          description: `Added ${quantity} ${item.name} to your cart.`,
        });
        return [...prevItems, { menuItemId: item.id, quantity, menuItem: item }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.menuItemId === itemId);
      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `Removed ${itemToRemove.menuItem.name} from your cart.`,
        });
      }
      return prevItems.filter(item => item.menuItemId !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.menuItemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.menuItem.price * item.quantity), 
    0
  );

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems,
      totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
