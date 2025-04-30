
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleCustomerLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await login(email, password, false);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await login(email, password, true);
      if (success) {
        navigate('/admin');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white p-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bennettBlue">Bennett Foods</h1>
          <p className="text-gray-600 mt-2">Campus food delivery made easy</p>
        </div>
        
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="customer">Customer Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Login</CardTitle>
                <CardDescription>
                  Login to order food from Bennett Foods
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleCustomerLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bennett-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <a href="#" className="text-xs text-bennettBlue hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bennett-input"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bennett-button" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login as Customer"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>
                  Login to manage Bennett Foods platform
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAdminLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="adminEmail" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="admin@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bennett-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="adminPassword" className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                    </div>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bennett-input"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bennett-button bg-bennettBlue" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login as Admin"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Sign up to start ordering from Bennett Foods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    disabled
                    className="bennett-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signupEmail" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="your@email.com"
                    disabled
                    className="bennett-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signupPassword" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    disabled
                    className="bennett-input"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full bennett-button">
                  Sign Up (Coming Soon)
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
