
import { useState } from "react";
import { MenuItem } from "../../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../context/CartContext";
import { Star, Plus, Minus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1);
  };
  
  const incrementQuantity = () => {
    if (quantity < item.inStock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <div className="bennett-card overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-gray-200">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-40 md:h-full object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow justify-between w-full md:w-2/3">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
            </div>
            <Badge className={item.isVeg ? "bg-green-500" : "bg-red-500"}>
              {item.isVeg ? "Veg" : "Non-veg"}
            </Badge>
          </div>
          
          <div className="flex items-center mt-2">
            {item.rating && (
              <>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-700 text-sm ml-1">{item.rating}</span>
                </div>
                <span className="text-gray-500 text-xs ml-2">
                  ({item.reviewCount} reviews)
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">
            ₹{item.price}
          </div>
          
          {item.isAvailable ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-2">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={incrementQuantity}
                  disabled={quantity >= item.inStock}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button onClick={handleAddToCart} className="bennett-button">
                Add
              </Button>
            </div>
          ) : (
            <Badge variant="outline" className="text-red-500 border-red-500">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
