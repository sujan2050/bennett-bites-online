
import { Review } from "../../types";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { rating, comment, userName, createdAt } = review;
  
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };
  
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium text-gray-900">{userName}</span>
        </div>
        <span className="text-sm text-gray-500">{createdAt}</span>
      </div>
      
      <div className="flex mt-1 mb-2">
        {renderStars()}
      </div>
      
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default ReviewCard;
