
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import { restaurants } from "../data/mockData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesTerm = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOpen) {
      return matchesTerm && restaurant.isOpen;
    }
    
    return matchesTerm;
  });
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-500 to-bennettBlue text-white py-12 px-4 md:px-0">
        <div className="bennett-container">
          <h1 className="text-3xl md:text-4xl font-bold">
            Hello, {user?.name || "there"}!
          </h1>
          <p className="text-xl md:text-2xl mt-2">
            Hungry? Order food from your favorite campus restaurants
          </p>
        </div>
      </div>
      
      <div className="bennett-container py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search for restaurants or food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bennett-input"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center px-4 py-2 rounded-full text-sm ${filterOpen ? 'bg-bennettBlue text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Open Now
              {filterOpen && <span className="ml-1">✓</span>}
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <div 
                key={restaurant.id} 
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-8"
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">
                No restaurants found matching your criteria
              </h3>
              <p className="mt-2 text-gray-500">
                Try changing your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bennett-container py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['South Indian', 'North Indian', 'Maggi', 'Beverages', 'Snacks', 'Chinese'].map((category) => (
            <div 
              key={category}
              className="bg-white rounded-lg shadow text-center p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-lg font-medium">{category}</div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
