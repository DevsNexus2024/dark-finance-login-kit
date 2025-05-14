
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OrderSummaryProps {
  locale: 'pt-BR' | 'de';
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ locale }) => {
  // Translations
  const translations = {
    'pt-BR': {
      title: 'Resumo do pedido',
      product: 'Plano MultiDrop Premium',
      quantity: 'Quantidade',
      subtotal: 'Subtotal',
      total: 'Total',
      monthPlan: '/mês',
      promoCode: 'Código promocional',
      applyCode: 'Aplicar',
      noExtraCharges: 'Sem custos adicionais',
    },
    'de': {
      title: 'Bestellübersicht',
      product: 'MultiDrop Premium-Plan',
      quantity: 'Menge',
      subtotal: 'Zwischensumme',
      total: 'Gesamtsumme',
      monthPlan: '/Monat',
      promoCode: 'Gutscheincode',
      applyCode: 'Anwenden',
      noExtraCharges: 'Keine zusätzlichen Kosten',
    }
  };

  const t = translations[locale];

  // Currency format based on locale
  const currency = locale === 'pt-BR' ? 'R$' : '€';
  const price = locale === 'pt-BR' ? '149,00' : '39,90';

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">{t.title}</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t.product}</h3>
              <p className="text-sm text-muted-foreground">{currency} {price} {t.monthPlan}</p>
            </div>
            <div className="text-right">
              <span>{currency} {price}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center">
            <Input 
              placeholder={t.promoCode} 
              className="h-12 rounded-r-none"
            />
            <Button 
              type="button" 
              className="h-12 rounded-l-none"
            >
              {t.applyCode}
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t.subtotal}</span>
              <span className="font-medium">{currency} {price}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <span className="font-semibold">{t.total}</span>
            <div className="text-right">
              <div className="font-bold text-lg">{currency} {price}</div>
              <div className="text-xs text-muted-foreground">{t.noExtraCharges}</div>
            </div>
          </div>
          
          {/* Order Bump (Promotional offer) */}
          <div className="mt-6 p-3 border border-primary/30 rounded-lg bg-primary/5">
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                <span className="text-xs text-primary">✓</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium">
                  {locale === 'pt-BR' 
                    ? 'Adicione acesso ao Template Pack por apenas +R$ 49,90'
                    : 'Fügen Sie Zugang zum Template Pack für nur +€ 12,90 hinzu'
                  }
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === 'pt-BR'
                    ? 'Economize 50% no pacote de templates prontos para uso.'
                    : 'Sparen Sie 50% beim Paket mit gebrauchsfertigen Vorlagen.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
