
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'participant' | 'admin'>('participant');
  const { login, isAuthenticated, isAdmin, isParticipant } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the role from query parameters
    const params = new URLSearchParams(location.search);
    const role = params.get('role');
    
    if (role === 'admin') {
      setActiveTab('admin');
    }
    
    // Redirect if already logged in
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin-dashboard');
      } else if (isParticipant) {
        navigate('/participant-dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, isParticipant, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password, activeTab);
      
      toast({
        title: 'Success',
        description: 'You have successfully logged in',
      });
      
      // Redirect based on role
      if (activeTab === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/participant-dashboard');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 dark:bg-secondary/30 p-4">
      <div className="text-center mb-6">
        <Logo size="lg" />
        <h1 className="mt-4 text-3xl font-bold">Welcome to HackTrack</h1>
        <p className="text-muted-foreground">The complete hackathon management platform</p>
      </div>
      
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'participant' | 'admin')}
            className="w-full mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="participant">Participant</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="participant" className="mt-4">
              <div className="text-sm text-muted-foreground mb-4">
                <p>Demo Credentials:</p>
                <p>Email: participant@example.com</p>
                <p>Password: password</p>
              </div>
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
              <div className="text-sm text-muted-foreground mb-4">
                <p>Demo Credentials:</p>
                <p>Email: admin@example.com</p>
                <p>Password: adminpass</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="mt-2" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
