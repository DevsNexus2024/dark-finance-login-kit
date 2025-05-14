import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipo para o contexto do tema
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

// Valor padrão para o contexto
const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
  primaryColor: '#1e8e3e',
  setPrimaryColor: () => {},
};

// Chaves para armazenar configurações no localStorage
const PRIMARY_COLOR_KEY = 'multidrop-primary-color';
const THEME_MODE_KEY = 'multidrop-theme-mode';

// Criando o contexto
const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

// Hook personalizado para acessar o contexto
export const useTheme = () => useContext(ThemeContext);

// Variáveis de tema
const lightThemeVars = {
  background: '0 0% 100%',
  foreground: '224 71% 4%',
  card: '0 0% 98%',
  cardForeground: '224 71% 4%',
  popover: '0 0% 100%',
  popoverForeground: '224 71% 4%',
  mutedForeground: '220 8.9% 46.1%',
  input: '214 32% 91%',
  accent: '210 40% 96.1%',
  accentForeground: '222.2 47.4% 11.2%',
};

const darkThemeVars = {
  background: '214 12% 5.9%',
  foreground: '0 0% 98%',
  card: '222 5% 12%',
  cardForeground: '0 0% 98%',
  popover: '240 10% 3.9%',
  popoverForeground: '0 0% 98%',
  mutedForeground: '240 5% 64.9%',
  input: '240 3.7% 20%',
  accent: '217.2 32.6% 17.5%',
  accentForeground: '210 40% 98%',
};

// Componente provedor do tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar com valores do localStorage ou padrões
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem(THEME_MODE_KEY);
    return (savedTheme as 'dark' | 'light') || 'dark';
  });
  
  const [primaryColor, setPrimaryColorState] = useState<string>(() => {
    const savedColor = localStorage.getItem(PRIMARY_COLOR_KEY);
    return savedColor || '#1e8e3e';
  });

  // Função para alternar entre temas claro e escuro
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Função para atualizar a cor primária
  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
    const contrastColor = calculateContrastingColor(color);
    
    // Aplicar a cor ao CSS
    document.documentElement.style.setProperty('--primary', hexToHSL(color));
    document.documentElement.style.setProperty('--primary-foreground', hexToHSL(contrastColor));
    document.documentElement.style.setProperty('--ring', hexToHSL(color));
    document.documentElement.style.setProperty('--accent', hexToHSL(color));
    
    // Atualizar o header com a cor primária
    const headerElement = document.querySelector('header');
    if (headerElement) {
      headerElement.style.background = `linear-gradient(to right, ${color}, ${adjustColorBrightness(color, -15)})`;
    }

    // Também definir cor secundária baseada na cor primária
    const secondaryColor = adjustColorBrightness(color, -25);
    document.documentElement.style.setProperty('--secondary', hexToHSL(secondaryColor));
    document.documentElement.style.setProperty('--secondary-foreground', hexToHSL(contrastColor));
    document.documentElement.style.setProperty('--muted', hexToHSL(secondaryColor));
    document.documentElement.style.setProperty('--border', hexToHSL(secondaryColor));
  };

  // Função para ajustar o brilho de uma cor
  const adjustColorBrightness = (hexColor: string, percent: number): string => {
    // Remover o # se existir
    const hex = hexColor.replace('#', '');
    
    // Converter para RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Ajustar o brilho
    r = Math.max(0, Math.min(255, r + (r * percent / 100)));
    g = Math.max(0, Math.min(255, g + (g * percent / 100)));
    b = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    // Converter de volta para HEX
    const rHex = Math.round(r).toString(16).padStart(2, '0');
    const gHex = Math.round(g).toString(16).padStart(2, '0');
    const bHex = Math.round(b).toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  };

  // Converter cor HEX para formato HSL usado no CSS
  const hexToHSL = (hexColor: string): string => {
    // Remover o # se existir
    const hex = hexColor.replace('#', '');
    
    // Converter para RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Calcular HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  // Função para calcular cor contrastante (branco ou preto)
  const calculateContrastingColor = (hexColor: string): string => {
    // Remover o # se existir
    const hex = hexColor.replace('#', '');
    
    // Converter para RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calcular luminância
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retornar branco ou preto baseado na luminância
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };
   
  // Aplicar as variáveis de tema
  const applyThemeVariables = (isDark: boolean) => {
    const vars = isDark ? darkThemeVars : lightThemeVars;
    
    document.documentElement.style.setProperty('--background', vars.background);
    document.documentElement.style.setProperty('--foreground', vars.foreground);
    document.documentElement.style.setProperty('--card', vars.card);
    document.documentElement.style.setProperty('--card-foreground', vars.cardForeground);
    document.documentElement.style.setProperty('--popover', vars.popover);
    document.documentElement.style.setProperty('--popover-foreground', vars.popoverForeground);
    document.documentElement.style.setProperty('--muted-foreground', vars.mutedForeground);
    document.documentElement.style.setProperty('--input', vars.input);
    document.documentElement.style.setProperty('--accent', vars.accent);
    document.documentElement.style.setProperty('--accent-foreground', vars.accentForeground);
    
    // Atualizar a classe no documento
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
    }
  };

  // Aplicar as configurações de tema ao carregar e quando elas mudarem
  useEffect(() => {
    // Persistir no localStorage
    localStorage.setItem(THEME_MODE_KEY, theme);
    localStorage.setItem(PRIMARY_COLOR_KEY, primaryColor);
    
    // Aplicar tema claro/escuro
    applyThemeVariables(theme === 'dark');
    
    // Aplicar cor primária
    setPrimaryColor(primaryColor);
  }, [theme, primaryColor]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      primaryColor, 
      setPrimaryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 