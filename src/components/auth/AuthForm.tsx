
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationState {
  from?: string;
}

const AuthForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'participant' | 'admin'>(
    location.search.includes('type=admin') ? 'admin' : 'participant'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, activeTab);
      
      toast({
        title: 'Login successful',
        description: `Welcome back to HackTrack!`,
      });
      
      // Redirect based on role
      if (activeTab === 'participant') {
        navigate('/participant-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials
  const demoCredentials = {
    participant: {
      email: 'participant@example.com',
      password: 'password',
    },
    admin: {
      email: 'admin@example.com',
      password: 'adminpass',
    },
  };

  const setDemoCredentials = () => {
    setEmail(demoCredentials[activeTab].email);
    setPassword(demoCredentials[activeTab].password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'participant' | 'admin')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="participant">Participant</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="participant">
          <Card className="border-0 shadow-lg glass-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Participant Login</CardTitle>
              <CardDescription>
                Access your team's dashboard to manage submissions and track your hackathon status.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="participant-email">Email</Label>
                  <Input
                    id="participant-email"
                    type="email"
                    placeholder="team@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="participant-password">Password</Label>
                    <a href="#" className="text-xs text-hacktrack-blue-light hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="participant-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={setDemoCredentials}
                >
                  Use Demo Credentials
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="admin">
          <Card className="border-0 shadow-lg glass-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <CardDescription>
                Access the hackathon administration panel to manage teams and results.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password">Password</Label>
                    <a href="#" className="text-xs text-hacktrack-blue-light hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={setDemoCredentials}
                >
                  Use Demo Credentials
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
