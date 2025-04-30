
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import MenuItemCard from "../components/Restaurant/MenuItemCard";
import ReviewCard from "../components/Reviews/ReviewCard";
import { restaurants, menuItems, reviews } from "../data/mockData";
import { Restaurant, MenuItem, Review } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurantMenuItems, setRestaurantMenuItems] = useState<MenuItem[]>([]);
  const [restaurantReviews, setRestaurantReviews] = useState<Review[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const foundRestaurant = restaurants.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      
      const items = menuItems.filter(item => item.restaurantId === id);
      setRestaurantMenuItems(items);
      
      // Get unique categories
      const categories = [...new Set(items.map(item => item.category))];
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
      }
      
      const restaurantReviews = reviews.filter(review => review.restaurantId === id);
      const menuItemIds = items.map(item => item.id);
      const itemReviews = reviews.filter(review => 
        review.itemId && menuItemIds.includes(review.itemId)
      );
      
      setRestaurantReviews([...restaurantReviews, ...itemReviews]);
    }
  }, [id]);
  
  if (!restaurant) {
    return (
      <MainLayout>
        <div className="bennett-container py-16 text-center">
          <p className="text-xl">Loading restaurant information...</p>
        </div>
      </MainLayout>
    );
  }
  
  const categories = [...new Set(restaurantMenuItems.map(item => item.category))];
  
  return (
    <MainLayout>
      {/* Restaurant Header */}
      <div 
        className="h-48 md:h-64 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${restaurant.image})` 
        }}
      >
        <div className="bennett-container h-full flex items-end pb-6">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
            <p className="mt-2">{restaurant.description}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center bg-white bg-opacity-20 px-2 py-1 rounded">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white ml-1">{restaurant.rating}</span>
              </div>
              <span className="ml-2">
                {restaurant.reviewCount} reviews
              </span>
              <span className="mx-2">•</span>
              {restaurant.isOpen ? (
                <Badge className="bg-green-500">Open: {restaurant.openingTime} - {restaurant.closingTime}</Badge>
              ) : (
                <Badge variant="destructive">Closed</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Content */}
      <div className="bennett-container py-8">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu">
            {categories.length > 0 && (
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                        activeCategory === category 
                          ? 'bg-bennettBlue text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {restaurantMenuItems
                .filter(item => !activeCategory || item.category === activeCategory)
                .map(item => (
                  <MenuItemCard key={item.id} item={item} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-4">
              {restaurantReviews.length > 0 ? (
                restaurantReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Restaurant Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">Opening Hours</h4>
                  <p className="text-gray-600">
                    {restaurant.openingTime} - {restaurant.closingTime}, All Days
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium">Location</h4>
                  <p className="text-gray-600">
                    Bennett University Campus, Greater Noida
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium">Contact</h4>
                  <p className="text-gray-600">
                    Phone: +91 98765 43210
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium">About</h4>
                  <p className="text-gray-600">
                    {restaurant.description} We pride ourselves on serving quality 
                    food to Bennett University students and faculty.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RestaurantPage;
