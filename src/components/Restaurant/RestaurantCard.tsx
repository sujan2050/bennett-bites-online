
import { Link } from "react-router-dom";
import { Restaurant } from "../../types";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { id, name, description, image, rating, reviewCount, isOpen } = restaurant;
  
  return (
    <Link to={`/restaurant/${id}`} className="block">
      <div className="bennett-card overflow-hidden h-full">
        <div className="aspect-w-16 aspect-h-9 relative">
          <div className="w-full h-48 bg-gray-200 relative">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
              }}
            />
            {isOpen ? (
              <Badge className="absolute top-2 right-2 bg-green-500">Open Now</Badge>
            ) : (
              <Badge variant="destructive" className="absolute top-2 right-2">Closed</Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-700 text-sm ml-1">{rating}</span>
            </div>
            <span className="text-gray-500 text-sm ml-2">({reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
