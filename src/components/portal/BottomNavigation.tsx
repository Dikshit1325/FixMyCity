import React from 'react';
import { navigationItems } from './constants';
import { useLanguage } from './LanguageContext';

interface BottomNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const BottomNavigation = ({ activeSection, setActiveSection }: BottomNavigationProps) => {
  const { t } = useLanguage();
  
  // Show only the most important navigation items for mobile
  const mobileNavItems = [
    navigationItems[0], // Dashboard
    navigationItems[2], // Services  
    navigationItems[3], // Complaints
    navigationItems[4], // Community
    navigationItems[1], // Profile
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 shadow-lg">
      <div className="flex justify-around items-center py-3 px-1 pb-safe">
        {mobileNavItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          // Get translated labels
          const getTranslatedLabel = (label: string) => {
            switch(label) {
              case 'Dashboard': return t('dashboard');
              case 'Services': return t('services');
              case 'Complaints': return t('complaints');
              case 'Community': return t('community');
              case 'Profile': return t('profile');
              default: return label;
            }
          };
          
          const displayLabel = item.label === 'Dashboard' ? t('dashboard') : 
                              getTranslatedLabel(item.label);
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary bg-primary/15 font-medium' 
                  : 'text-foreground/75 hover:text-foreground hover:bg-accent'
              }`}
              aria-label={`Navigate to ${displayLabel}`}
            >
              <IconComponent className={`h-5 w-5 mb-1 ${isActive ? 'text-primary' : 'text-foreground/80'}`} />
              <span className={`text-xs truncate max-w-full ${isActive ? 'text-primary font-medium' : 'text-foreground/75'}`}>{displayLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;