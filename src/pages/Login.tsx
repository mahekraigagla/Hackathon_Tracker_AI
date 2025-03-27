
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const Login: React.FC = () => {
  const { isAuthenticated, isParticipant, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      if (isParticipant) {
        navigate('/participant-dashboard');
      } else if (isAdmin) {
        navigate('/admin-dashboard');
      }
    }
  }, [isAuthenticated, isParticipant, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to HackTrack</h1>
            <p className="text-muted-foreground">
              Sign in to access your dashboard and manage your hackathon experience.
            </p>
          </div>
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
