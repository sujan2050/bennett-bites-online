
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phoneNumber?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  userId: string;
  buildingName: string;
  roomNumber: string;
  landmark?: string;
  isDefault: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  inStock: number;
  isVeg: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  menuItemId: string;
  quantity: number;
  menuItem: MenuItem;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  restaurantId: string;
  addressId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  totalAmount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  itemId?: string;
  restaurantId?: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

export interface RevenueData {
  date: string;
  amount: number;
}

export interface RestaurantStats {
  restaurantId: string;
  restaurantName: string;
  totalOrders: number;
  revenue: number;
}
