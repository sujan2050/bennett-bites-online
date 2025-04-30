
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import RevenueChart from "../components/Admin/RevenueChart";
import RestaurantStatsChart from "../components/Admin/RestaurantStats";
import { revenueData, restaurantStats, menuItems } from "../data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [period, setPeriod] = useState("week");
  
  // Stats calculations
  const totalRevenue = restaurantStats.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = restaurantStats.reduce((sum, item) => sum + item.totalOrders, 0);
  const totalItems = menuItems.length;
  const lowStockItems = menuItems.filter(item => item.inStock < 10).length;
  
  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bennett-container py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                <span className="text-green-500 text-sm">+5.3% from last period</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
                <p className="text-3xl font-bold">{totalOrders.toLocaleString()}</p>
                <span className="text-green-500 text-sm">+12.7% from last period</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Menu Items</h3>
                <p className="text-3xl font-bold">{totalItems}</p>
                <span className="text-gray-500 text-sm">Across all restaurants</span>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</h3>
                <p className="text-3xl font-bold">{lowStockItems}</p>
                <span className="text-red-500 text-sm">Needs attention</span>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RevenueChart data={revenueData} title="Revenue Trend" />
            <RestaurantStatsChart data={restaurantStats} />
          </div>
          
          {/* Inventory management */}
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Inventory Status</h3>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Low Stock</Badge>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium Stock</Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Good Stock</Badge>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Item Name</th>
                          <th className="px-4 py-2 text-left">Restaurant</th>
                          <th className="px-4 py-2 text-center">Price</th>
                          <th className="px-4 py-2 text-center">Stock</th>
                          <th className="px-4 py-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuItems.slice(0, 10).map(item => {
                          const restaurant = restaurantStats.find(r => r.restaurantId === item.restaurantId);
                          let statusClass = "";
                          
                          if (item.inStock < 10) {
                            statusClass = "bg-red-100 text-red-800 border-red-300";
                          } else if (item.inStock < 20) {
                            statusClass = "bg-yellow-100 text-yellow-800 border-yellow-300";
                          } else {
                            statusClass = "bg-green-100 text-green-800 border-green-300";
                          }
                          
                          return (
                            <tr key={item.id} className="border-b">
                              <td className="px-4 py-3">{item.name}</td>
                              <td className="px-4 py-3">{restaurant?.restaurantName}</td>
                              <td className="px-4 py-3 text-center">₹{item.price}</td>
                              <td className="px-4 py-3 text-center">{item.inStock}</td>
                              <td className="px-4 py-3 text-center">
                                <Badge variant="outline" className={statusClass}>
                                  {item.inStock < 10 ? 'Low' : item.inStock < 20 ? 'Medium' : 'Good'}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Recent Orders</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Order ID</th>
                          <th className="px-4 py-2 text-left">Restaurant</th>
                          <th className="px-4 py-2 text-left">Customer</th>
                          <th className="px-4 py-2 text-center">Items</th>
                          <th className="px-4 py-2 text-center">Total</th>
                          <th className="px-4 py-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array(10).fill(0).map((_, i) => {
                          const restaurantIdx = i % restaurantStats.length;
                          const restaurant = restaurantStats[restaurantIdx];
                          const status = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'][i % 5];
                          let statusClass = "";
                          
                          switch(status) {
                            case 'pending': statusClass = "bg-yellow-100 text-yellow-800 border-yellow-300"; break;
                            case 'confirmed': statusClass = "bg-blue-100 text-blue-800 border-blue-300"; break;
                            case 'preparing': statusClass = "bg-purple-100 text-purple-800 border-purple-300"; break;
                            case 'out_for_delivery': statusClass = "bg-orange-100 text-orange-800 border-orange-300"; break;
                            case 'delivered': statusClass = "bg-green-100 text-green-800 border-green-300"; break;
                          }
                          
                          return (
                            <tr key={i} className="border-b">
                              <td className="px-4 py-3">ORD-{1000 + i}</td>
                              <td className="px-4 py-3">{restaurant.restaurantName}</td>
                              <td className="px-4 py-3">Customer {i + 1}</td>
                              <td className="px-4 py-3 text-center">{i + 1}</td>
                              <td className="px-4 py-3 text-center">₹{(i + 1) * 100}</td>
                              <td className="px-4 py-3 text-center">
                                <Badge variant="outline" className={statusClass}>
                                  {status.replace('_', ' ')}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
