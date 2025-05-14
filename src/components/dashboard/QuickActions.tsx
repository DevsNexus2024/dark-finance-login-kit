
import React, { useContext } from 'react';
import { AuthContext } from '@/App';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link, Package, FileBarChart } from "lucide-react";

export const QuickActions = () => {
  const { locale } = useContext(AuthContext);

  const translations = {
    'pt-BR': {
      quickActions: 'Ações Rápidas',
      newSaleLink: 'Novo Link de Venda',
      addProduct: 'Adicionar Produto',
      generateReport: 'Gerar Relatório',
    },
    'de': {
      quickActions: 'Schnellaktionen',
      newSaleLink: 'Neuer Verkaufslink',
      addProduct: 'Produkt hinzufügen',
      generateReport: 'Bericht erstellen',
    }
  };

  const t = translations[locale];

  return (
    <Card className="bg-card/60 backdrop-blur border-border shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle>{t.quickActions}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button className="w-full flex justify-start items-center gap-2 bg-primary/90 hover:bg-primary text-primary-foreground">
            <Link className="h-5 w-5" />
            {t.newSaleLink}
          </Button>
          <Button className="w-full flex justify-start items-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground">
            <Package className="h-5 w-5" />
            {t.addProduct}
          </Button>
          <Button className="w-full flex justify-start items-center gap-2 bg-primary/70 hover:bg-primary text-primary-foreground">
            <FileBarChart className="h-5 w-5" />
            {t.generateReport}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
