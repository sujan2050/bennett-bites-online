
import { CartItem } from "../../types";
import { useCart } from "../../context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { menuItem, quantity } = item;
  
  const handleIncrement = () => {
    updateQuantity(menuItem.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(menuItem.id, quantity - 1);
    } else {
      removeFromCart(menuItem.id);
    }
  };
  
  return (
    <div className="flex items-center p-4 border rounded-lg mb-4">
      <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden mr-4">
        <img 
          src={menuItem.image} 
          alt={menuItem.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium">{menuItem.name}</h4>
        <p className="text-gray-600 text-sm">{menuItem.description}</p>
        <div className="text-bennettBlue font-medium mt-1">
          ₹{menuItem.price}
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <div className="flex items-center border rounded mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDecrement}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-2">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleIncrement}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => removeFromCart(menuItem.id)}
          className="h-8 w-8 text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="ml-4 text-right w-20">
        <div className="font-bold">
          ₹{menuItem.price * quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
