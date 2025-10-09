import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Shield, User, Settings, LogOut, Bell, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from './LanguageContext';

interface User {
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  authMethod: string;
}

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const { t } = useLanguage();
  const [notificationCount] = useState(3);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-[#00A08B] to-[#10D9C4] text-primary-foreground p-3 sm:p-4 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-xl font-medium truncate text-white">{t('appName')}</h1>
            <p className="text-xs sm:text-sm text-white/80 hidden sm:block">{t('appTagline')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSelector />
          
          {/* Notification Bell */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10 relative"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 p-2 flex items-center space-x-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-white/20 text-white text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium truncate max-w-24">{user.name}</p>
                    <div className="flex items-center space-x-1">
                      {user.verified ? (
                        <CheckCircle className="h-3 w-3 text-green-300" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-amber-300" />
                      )}
                      <span className="text-xs text-white/80">
                        {user.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={user.verified ? "default" : "secondary"} className="text-xs">
                      {user.verified ? 'Verified' : 'Unverified'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {user.authMethod}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                  {notificationCount > 0 && (
                    <Badge className="ml-auto h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              <User className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;