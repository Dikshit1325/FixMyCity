import React from 'react';
import { navigationItems } from './constants';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const Navigation = ({ activeSection, setActiveSection, isMobile, onClose }: NavigationProps) => {
  return (
    <nav className={`bg-card border-r border-border p-4 w-64 ${isMobile ? 'h-full' : ''}`}>
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <h2 className="font-medium">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-foreground'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;