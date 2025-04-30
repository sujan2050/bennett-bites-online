
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="bennett-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Bennett Foods</h3>
            <p className="text-gray-600">
              Your favorite campus food delivery service.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-bennettBlue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-bennettBlue">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-bennettBlue">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Restaurants</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/restaurant/1" className="text-gray-600 hover:text-bennettBlue">
                  Maggi Hotspot
                </Link>
              </li>
              <li>
                <Link to="/restaurant/2" className="text-gray-600 hover:text-bennettBlue">
                  Southern Stories
                </Link>
              </li>
              <li>
                <Link to="/restaurant/3" className="text-gray-600 hover:text-bennettBlue">
                  Kathi House
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>Bennett University Campus</p>
              <p>Greater Noida, Uttar Pradesh</p>
              <p>Email: support@bennettfoods.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Bennett Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
