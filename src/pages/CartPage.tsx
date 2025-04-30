
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import CartItemCard from "../components/Cart/CartItemCard";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { restaurants } from "../data/mockData";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Group cart items by restaurant
  const itemsByRestaurant = cartItems.reduce((acc, item) => {
    const restaurantId = item.menuItem.restaurantId;
    if (!acc[restaurantId]) {
      acc[restaurantId] = [];
    }
    acc[restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="bennett-container py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400" />
            <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
            <p className="text-gray-600 mt-2">
              Add items from a restaurant to start your order
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="mt-6 bennett-button"
            >
              Browse Restaurants
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="bennett-container py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {Object.entries(itemsByRestaurant).map(([restaurantId, items]) => {
              const restaurant = restaurants.find(r => r.id === restaurantId);
              return (
                <div key={restaurantId} className="mb-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{restaurant?.name}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map(item => (
                      <CartItemCard key={item.menuItemId} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 border-red-300 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span>₹5</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalAmount + 25}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout} 
                className="w-full mt-6 bennett-button"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
