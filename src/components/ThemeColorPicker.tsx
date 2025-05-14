import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, X, Check } from "lucide-react";

type ThemeColorPickerProps = {
  initialColor?: string;
  onColorChange: (hexColor: string, colorType: ColorType) => void;
}

// Tipos de cores que podem ser alteradas
export type ColorType = 'secondary' | 'text' | 'border' | 'button';

// Cores predefinidas
const PRESET_COLORS = [
  '#1F2937', // Cinza escuro
  '#374151', // Cinza
  '#22333b', // Azul escuro
  '#1E3A8A', // Azul
  '#127369', // Verde água
  '#166534', // Verde
  '#A16207', // Âmbar 
  '#9D174D', // Magenta
  '#831843', // Rosa escuro
  '#723122'  // Marrom
];

const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({ 
  initialColor = "#1F2937", 
  onColorChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colorHex, setColorHex] = useState(initialColor);
  const [colorType, setColorType] = useState<ColorType>('secondary');
  const [error, setError] = useState<string | null>(null);

  // Validar código hex
  const validateHexColor = (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorHex(value);
    setError(null);
  };

  const handlePresetSelect = (color: string) => {
    setColorHex(color);
    onColorChange(color, colorType);
  };

  const handleColorTypeChange = (type: ColorType) => {
    setColorType(type);
  };

  const handleSubmit = () => {
    // Verificar se é um código hex válido
    if (!colorHex.startsWith('#')) {
      setColorHex('#' + colorHex);
    }

    const formattedColor = colorHex.startsWith('#') ? colorHex : '#' + colorHex;
    
    if (validateHexColor(formattedColor)) {
      onColorChange(formattedColor, colorType);
      setError(null);
      setIsOpen(false);
    } else {
      setError('Código de cor inválido. Use formato #RRGGBB.');
    }
  };

  // Traduções
  const translations = {
    title: 'Personalizar tema',
    colorLabel: 'Código de cor (Hex)',
    apply: 'Aplicar',
    presets: 'Cores predefinidas',
    invalidColor: 'Código de cor inválido. Use formato #RRGGBB.',
    colorTypes: {
      secondary: 'Elementos secundários',
      text: 'Textos',
      border: 'Bordas',
      button: 'Botões'
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed bottom-4 right-4 rounded-full w-10 h-10 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={18} /> : <Settings size={18} />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-card p-4 rounded-lg shadow-lg border border-border w-72 z-10">
          <h3 className="text-sm font-medium mb-2">{translations.title}</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Selecione o elemento para alterar:</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(Object.keys(translations.colorTypes) as ColorType[]).map((type) => (
                  <Button
                    key={type}
                    variant={colorType === type ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-8 flex items-center justify-center"
                    onClick={() => handleColorTypeChange(type)}
                  >
                    {colorType === type && <Check className="mr-1 h-3 w-3" />}
                    {translations.colorTypes[type]}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">{translations.colorLabel}</label>
              <div className="flex items-center gap-2">
                <Input 
                  value={colorHex}
                  onChange={handleColorChange}
                  placeholder="#000000" 
                  className="h-8 text-xs"
                />
                <div 
                  className="w-6 h-6 rounded border border-border" 
                  style={{ backgroundColor: validateHexColor(colorHex) ? colorHex : '#888' }}
                />
              </div>
              {error && <p className="text-xs text-destructive mt-1">{error}</p>}
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">{translations.presets}</label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${colorHex === color ? 'border-primary' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetSelect(color)}
                    aria-label={`Selecionar cor ${color}`}
                  />
                ))}
              </div>
            </div>
            
            <Button 
              size="sm" 
              className="w-full text-xs h-8" 
              onClick={handleSubmit}
            >
              {translations.apply}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeColorPicker; 