
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses.find(a => a.isDefault)?.id || (user?.addresses[0]?.id || "")
  );
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast({
        title: "Missing Address",
        description: "Please select a delivery address",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed!",
      });
      clearCart();
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="bennett-container py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              
              {user?.addresses.length ? (
                <RadioGroup
                  value={selectedAddress}
                  onValueChange={setSelectedAddress}
                  className="space-y-4"
                >
                  {user.addresses.map(address => (
                    <div 
                      key={address.id}
                      className="flex items-start space-x-3 border rounded-lg p-4"
                    >
                      <RadioGroupItem value={address.id} id={`address-${address.id}`} />
                      <div className="flex-1">
                        <Label htmlFor={`address-${address.id}`} className="font-medium cursor-pointer">
                          {address.buildingName}, Room {address.roomNumber}
                        </Label>
                        {address.landmark && (
                          <p className="text-gray-600 text-sm">Landmark: {address.landmark}</p>
                        )}
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">No addresses found</p>
                  <Button 
                    onClick={() => navigate('/profile')}
                    className="mt-2 bennett-button"
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.menuItemId} className="flex justify-between">
                    <div>
                      <span className="font-medium">
                        {item.quantity} × {item.menuItem.name}
                      </span>
                    </div>
                    <span>₹{item.menuItem.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="online" id="payment-online" />
                  <Label htmlFor="payment-online" className="font-medium cursor-pointer">
                    Online Payment (UPI, Card, Netbanking)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="cod" id="payment-cod" />
                  <Label htmlFor="payment-cod" className="font-medium cursor-pointer">
                    Cash on Delivery
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="qr" id="payment-qr" />
                  <div className="flex-1">
                    <Label htmlFor="payment-qr" className="font-medium cursor-pointer block mb-2">
                      QR Code Payment
                    </Label>
                    <div className="border p-4 bg-gray-50 text-center">
                      <img 
                        src="https://via.placeholder.com/200x200.png?text=QR+Code" 
                        alt="Payment QR Code" 
                        className="mx-auto" 
                        width={150}
                        height={150}
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Scan to pay directly
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Price Details</h3>
              
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
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalAmount + 25}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="mb-4">
                  <Label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </Label>
                  <Input
                    id="instructions"
                    placeholder="Any specific delivery instructions?"
                    className="bennett-input"
                  />
                </div>
                
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bennett-button"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
