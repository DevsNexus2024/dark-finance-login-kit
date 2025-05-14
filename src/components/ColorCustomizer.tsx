import React, { useState } from "react";
import { Palette, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";
import { Switch } from "./ui/switch";

export function ColorCustomizer() {
  const { 
    primaryColor, 
    setPrimaryColor, 
    theme,
    toggleTheme
  } = useTheme();
  
  const [inputPrimaryColor, setInputPrimaryColor] = useState(primaryColor);

  const validateHexColor = (color: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const handlePrimaryColorChange = () => {
    if (validateHexColor(inputPrimaryColor)) {
      setPrimaryColor(inputPrimaryColor);
      toast.success("Cor primária atualizada com sucesso!");
    } else {
      toast.error("Por favor, insira uma cor hex válida (ex.: #1e8e3e)");
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success(`Tema ${theme === 'dark' ? 'claro' : 'escuro'} ativado!`);
  };

  const primaryColorPresets = ["#1e8e3e", "#1a73e8", "#d93025", "#9334ea", "#ff6d01", "#202124"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Personalizar tema</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Personalizar Tema</h4>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === 'light'}
                onCheckedChange={handleThemeToggle}
                aria-label="Alternar tema"
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Cor Primária</h4>
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full border" 
                style={{ backgroundColor: inputPrimaryColor }}
              />
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="#HEX"
                  value={inputPrimaryColor}
                  onChange={(e) => setInputPrimaryColor(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handlePrimaryColorChange}>Aplicar</Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {primaryColorPresets.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ 
                    backgroundColor: color,
                    borderColor: color === primaryColor ? 'white' : color
                  }}
                  onClick={() => {
                    setInputPrimaryColor(color);
                    setPrimaryColor(color);
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            Personalize a cor do seu tema para combinar com a sua marca.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
