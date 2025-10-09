import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './portal/LanguageContext';
import AuthSystem from './portal/AuthSystem';
import Header from './portal/Header';
import BottomNavigation from './portal/BottomNavigation';
import Dashboard from './portal/Dashboard';
import Profile from './portal/Profile';
import Services from './portal/Services';
import Complaints from './portal/Complaints';
import Community from './portal/Community';
import Leaderboard from './portal/Leaderboard';
import Notifications from './portal/Notifications';
import LocalInfo from './portal/LocalInfo';
import { toast } from 'sonner@2.0.3';

interface User {
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  authMethod: string;
}

const GovernmentPortalWireframe = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on component mount
  useEffect(() => {
    const checkExistingSession = () => {
      const savedUser = localStorage.getItem('fixmycity_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          toast.success(`Welcome back, ${parsedUser.name}!`);
        } catch (error) {
          localStorage.removeItem('fixmycity_user');
        }
      }
      setIsLoading(false);
    };

    // Simulate loading time
    setTimeout(checkExistingSession, 1000);
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('fixmycity_user', JSON.stringify(userData));
    
    // Show welcome notification
    setTimeout(() => {
      toast.success(`Welcome to Fix My City, ${userData.name}!`, {
        description: userData.verified 
          ? 'Your account is verified and ready to use.' 
          : 'Please complete your profile verification.',
      });
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fixmycity_user');
    setActiveSection('dashboard');
    toast.success('Logged out successfully');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <Profile />;
      case 'services': return <Services />;
      case 'complaints': return <Complaints />;
      case 'community': return <Community />;
      case 'leaderboard': return <Leaderboard />;
      case 'notifications': return <Notifications />;
      case 'info': return <LocalInfo />;
      default: return <Dashboard activeSection={activeSection} setActiveSection={setActiveSection} />;
    }
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <div className="h-8 w-8 bg-white rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Fix My City</h1>
            <p className="text-muted-foreground">Loading your citizen portal...</p>
          </div>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Show authentication screen if not logged in
  if (!user) {
    return (
      <LanguageProvider>
        <AuthSystem onAuthSuccess={handleAuthSuccess} />
      </LanguageProvider>
    );
  }

  // Show main application
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="p-3 sm:p-4 lg:p-6 max-w-full overflow-x-hidden pb-32">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
        
        {/* Bottom Navigation for all screen sizes */}
        <BottomNavigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        {/* User Status Indicators */}
        {user && !user.verified && (
          <div className="fixed bottom-20 right-4 bg-amber-500 text-white p-3 rounded-lg shadow-lg text-sm max-w-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Account verification pending</span>
            </div>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
};

export default GovernmentPortalWireframe;