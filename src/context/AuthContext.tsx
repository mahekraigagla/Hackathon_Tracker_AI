
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'participant' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isParticipant: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in on mount
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('hacktrack_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('hacktrack_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data (in a real app, this would come from an API)
      const mockUsers = {
        participant: {
          id: 'participant-123',
          email: 'participant@example.com',
          name: 'Team Leader',
          role: 'participant' as UserRole,
        },
        admin: {
          id: 'admin-456',
          email: 'admin@example.com', 
          name: 'Admin User',
          role: 'admin' as UserRole,
        },
      };
      
      // Simple validation for demo purposes
      if (
        (role === 'participant' && email === 'participant@example.com' && password === 'password') ||
        (role === 'admin' && email === 'admin@example.com' && password === 'adminpass')
      ) {
        const userData = role === 'participant' ? mockUsers.participant : mockUsers.admin;
        setUser(userData);
        localStorage.setItem('hacktrack_user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('hacktrack_user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isParticipant = user?.role === 'participant';
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isParticipant,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
