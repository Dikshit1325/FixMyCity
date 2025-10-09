import React from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { languages } from './translations';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const currentLangName = languages.find(lang => lang.code === currentLanguage)?.nativeName || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border-white/20">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{currentLangName}</span>
          <span className="sm:hidden">{currentLanguage.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
          {t('selectLanguage')}
        </div>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="cursor-pointer"
            onClick={() => setLanguage(language.code as any)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;