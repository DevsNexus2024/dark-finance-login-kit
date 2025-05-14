import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import { useState, createContext, useEffect } from "react";
import { ColorType } from "@/components/ThemeColorPicker";
import { ThemeProvider } from "@/components/ThemeProvider";

// Chaves para o localStorage
const THEME_COLOR_KEY_PREFIX = 'multidrop-color-';
const LOCALE_KEY = 'multidrop-locale';

// Cores padrão
const DEFAULT_COLORS = {
  secondary: '#1F2937',
  text: '#F9FAFB',
  border: '#374151',
  button: '#166534'
};

// Contexto para configuração do tema e locale
export const AuthContext = createContext<{
  locale: 'pt-BR' | 'de';
  setLocale: (locale: 'pt-BR' | 'de') => void;
  colors: Record<ColorType, string>;
  setColor: (color: string, type: ColorType) => void;
}>({
  locale: 'pt-BR',
  setLocale: () => {},
  colors: DEFAULT_COLORS,
  setColor: () => {}
});

const queryClient = new QueryClient();

// Função para converter hex para HSL
const hexToHSL = (hex: string): { h: number, s: number, l: number } => {
  // Remover o # se existir
  hex = hex.replace(/^#/, '');
  
  // Converter para RGB
  let r = 0, g = 0, b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  // Normalizar RGB
  r /= 255;
  g /= 255;
  b /= 255;
  
  // Encontrar valores máximo e mínimo para calcular o delta
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }
  
  // Converter para os valores HSL usados no CSS
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

// Aplicar as cores aos elementos CSS
const applyColorToCSS = (color: string, type: ColorType) => {
  const hsl = hexToHSL(color);
  
  switch (type) {
    case 'secondary':
      document.documentElement.style.setProperty('--secondary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--secondary-foreground', `${hsl.h} ${hsl.s}% ${Math.abs(hsl.l - 90)}%`);
      document.documentElement.style.setProperty('--muted', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      break;
    case 'text':
      document.documentElement.style.setProperty('--foreground', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--popover-foreground', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--card-foreground', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--accent-foreground', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--muted-foreground', `${hsl.h} ${Math.max(hsl.s - 20, 0)}% ${Math.max(hsl.l - 30, 20)}%`);
      break;
    case 'border':
      document.documentElement.style.setProperty('--border', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--input', `${hsl.h} ${hsl.s}% ${Math.min(hsl.l + 10, 90)}%`);
      document.documentElement.style.setProperty('--ring', `${hsl.h} ${Math.min(hsl.s + 10, 100)}% ${Math.min(hsl.l + 10, 90)}%`);
      break;
    case 'button':
      document.documentElement.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      document.documentElement.style.setProperty('--primary-foreground', `${hsl.h} ${Math.min(hsl.s, 10)}% ${Math.abs(hsl.l - 90)}%`);
      document.documentElement.style.setProperty('--accent', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      break;
  }
};

const App = () => {
  // Inicializar com valores do localStorage ou padrões
  const [locale, setLocale] = useState<'pt-BR' | 'de'>(() => {
    const savedLocale = localStorage.getItem(LOCALE_KEY);
    return (savedLocale === 'pt-BR' || savedLocale === 'de') ? savedLocale : 'pt-BR';
  });
  
  const [colors, setColors] = useState<Record<ColorType, string>>(() => {
    // Tentar recuperar cores do localStorage ou usar padrões
    const savedColors = {} as Record<ColorType, string>;
    
    (Object.keys(DEFAULT_COLORS) as ColorType[]).forEach(type => {
      const savedColor = localStorage.getItem(`${THEME_COLOR_KEY_PREFIX}${type}`);
      savedColors[type] = savedColor || DEFAULT_COLORS[type];
    });
    
    return savedColors;
  });

  // Função para atualizar uma cor específica
  const setColor = (color: string, type: ColorType) => {
    setColors(prev => ({
      ...prev,
      [type]: color
    }));
  };

  // Persistir locale no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  // Persistir cores no localStorage e atualizar variáveis CSS
  useEffect(() => {
    // Para cada tipo de cor, atualizar localStorage e aplicar estilo
    (Object.keys(colors) as ColorType[]).forEach(type => {
      const color = colors[type];
      localStorage.setItem(`${THEME_COLOR_KEY_PREFIX}${type}`, color);
      applyColorToCSS(color, type);
    });
    
  }, [colors]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContext.Provider value={{ locale, setLocale, colors, setColor }}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to={`/checkout/${locale}`} replace />} />
                <Route path="/checkout/:locale" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
