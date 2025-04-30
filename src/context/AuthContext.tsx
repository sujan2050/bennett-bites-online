
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, isAdmin: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from local storage
    const storedUser = localStorage.getItem('bennettUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, isAdmin: boolean) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // First check if the user exists in our mock data
        const foundUser = users.find(u => u.email === email);
        
        if (foundUser) {
          // If user exists in mock data, log them in
          setUser(foundUser);
          localStorage.setItem('bennettUser', JSON.stringify(foundUser));
          toast({
            title: "Login Successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          setIsLoading(false);
          resolve(true);
        } else {
          // Create a new user with appropriate role
          const newUser: User = {
            id: `user_${Date.now()}`,
            email: email,
            name: email.split('@')[0], // Use part of email as name
            role: isAdmin ? 'admin' : 'customer',
            phoneNumber: '',
            addresses: []
          };
          
          setUser(newUser);
          localStorage.setItem('bennettUser', JSON.stringify(newUser));
          toast({
            title: "Login Successful",
            description: `Welcome, ${newUser.name}!`,
          });
          setIsLoading(false);
          resolve(true);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bennettUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
