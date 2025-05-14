
import React, { useContext } from 'react';
import { AuthContext } from '@/App';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TopProducts = () => {
  const { locale } = useContext(AuthContext);

  const translations = {
    'pt-BR': {
      topProducts: 'Top Produtos',
      units: 'unidades',
      revenue: 'receita',
    },
    'de': {
      topProducts: 'Top-Produkte',
      units: 'Einheiten',
      revenue: 'Umsatz',
    }
  };

  const t = translations[locale];
  const currencyPrefix = locale === 'pt-BR' ? 'R$' : '€';

  // Dados simulados para produtos
  const products = [
    {
      id: 1,
      name: "Curso Avançado de Marketing Digital",
      image: "/placeholder.svg",
      units: 78,
      revenue: 7800,
    },
    {
      id: 2,
      name: "E-book: 50 Estratégias de Vendas",
      image: "/placeholder.svg",
      units: 145,
      revenue: 4350,
    },
    {
      id: 3,
      name: "Mentoria Empreendedorismo",
      image: "/placeholder.svg",
      units: 32,
      revenue: 6400,
    },
    {
      id: 4,
      name: "Template de Site Profissional",
      image: "/placeholder.svg",
      units: 95,
      revenue: 3800,
    },
  ];

  return (
    <Card className="bg-card/60 backdrop-blur border-border shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle>{t.topProducts}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-md bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{product.name}</h4>
                <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                  <p>{product.units} {t.units}</p>
                  <p>{currencyPrefix} {product.revenue.toLocaleString()}</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${Math.min(100, (product.revenue / 8000) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
