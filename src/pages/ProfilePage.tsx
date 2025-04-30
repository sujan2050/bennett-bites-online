
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { orders } from "../data/mockData";
import { Address } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    buildingName: "",
    roomNumber: "",
    landmark: "",
    isDefault: false
  });
  
  if (!user) {
    return null;
  }
  
  const userOrders = orders.filter(order => order.userId === user.id);
  
  const handleSaveAddress = () => {
    // In a real app, this would save the address to a database
    toast({
      title: "Address Saved",
      description: "Your new address has been saved successfully.",
    });
    setIsAddressDialogOpen(false);
    setNewAddress({
      buildingName: "",
      roomNumber: "",
      landmark: "",
      isDefault: false
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-purple-500';
      case 'out_for_delivery': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <MainLayout>
      <div className="bennett-container py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-bennettBlue text-white p-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="mt-2">Manage your account details and preferences</p>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Personal Info</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <Input value={user.name} disabled className="bennett-input bg-gray-50" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input value={user.email} disabled className="bennett-input bg-gray-50" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input value={user.phoneNumber || ""} placeholder="Add phone number" className="bennett-input" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Type
                        </label>
                        <Input value={user.role === 'admin' ? 'Administrator' : 'Customer'} disabled className="bennett-input bg-gray-50" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bennett-button">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="addresses">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Saved Addresses</h3>
                      <Button onClick={() => setIsAddressDialogOpen(true)} className="bennett-button">
                        Add New Address
                      </Button>
                    </div>
                    
                    {user.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {user.addresses.map(address => (
                          <div key={address.id} className="border rounded-lg p-4 relative">
                            {address.isDefault && (
                              <Badge className="absolute top-2 right-2 bg-green-500">Default</Badge>
                            )}
                            <p className="font-medium">{address.buildingName}</p>
                            <p className="text-gray-600">Room {address.roomNumber}</p>
                            {address.landmark && (
                              <p className="text-gray-600">Landmark: {address.landmark}</p>
                            )}
                            
                            <div className="mt-4 flex space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              {!address.isDefault && (
                                <Button variant="outline" size="sm">
                                  Make Default
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No addresses saved yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Building Name
                        </label>
                        <Input 
                          value={newAddress.buildingName} 
                          onChange={(e) => setNewAddress({...newAddress, buildingName: e.target.value})}
                          placeholder="e.g. D Block" 
                          className="bennett-input" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room Number
                        </label>
                        <Input 
                          value={newAddress.roomNumber} 
                          onChange={(e) => setNewAddress({...newAddress, roomNumber: e.target.value})}
                          placeholder="e.g. 101" 
                          className="bennett-input" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Landmark (Optional)
                        </label>
                        <Input 
                          value={newAddress.landmark} 
                          onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                          placeholder="e.g. Near Tennis Court" 
                          className="bennett-input" 
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="default-address"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                          className="rounded text-bennettBlue focus:ring-bennettBlue mr-2"
                        />
                        <label htmlFor="default-address" className="text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddressDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveAddress} className="bennett-button">
                        Save Address
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Order History</h3>
                    
                    {userOrders.length > 0 ? (
                      <div className="space-y-6">
                        {userOrders.map(order => {
                          const restaurant = restaurants.find(r => r.id === order.restaurantId);
                          return (
                            <div key={order.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-4 flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{restaurant?.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Order #{order.id.slice(0, 8)} • {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              
                              <div className="p-4">
                                <div className="space-y-2">
                                  {order.items.map(item => (
                                    <div key={item.menuItemId} className="flex justify-between">
                                      <span>{item.quantity} x {item.menuItem.name}</span>
                                      <span>₹{item.menuItem.price * item.quantity}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                                  <span>Total</span>
                                  <span>₹{order.totalAmount}</span>
                                </div>
                                
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline">View Details</Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No orders yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
