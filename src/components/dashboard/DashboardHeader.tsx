
import React, { useContext } from 'react';
import { AuthContext } from '@/App';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export const DashboardHeader = () => {
  const { logout, locale } = useContext(AuthContext);

  const translations = {
    'pt-BR': {
      search: 'Buscar...',
      profile: 'Perfil',
      settings: 'Configurações',
      logout: 'Sair',
    },
    'de': {
      search: 'Suchen...',
      profile: 'Profil',
      settings: 'Einstellungen',
      logout: 'Abmelden',
    }
  };

  const t = translations[locale];

  return (
    <header className="h-16 border-b border-border bg-card/30 backdrop-blur-lg flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="md:hidden">
        {/* Mobile menu trigger */}
      </div>
      
      <div className="flex-1 max-w-md mx-4 md:mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t.search} 
            className="pl-10 bg-background/50 border-muted"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Multidrop</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t.profile}</DropdownMenuItem>
            <DropdownMenuItem>{t.settings}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>{t.logout}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
