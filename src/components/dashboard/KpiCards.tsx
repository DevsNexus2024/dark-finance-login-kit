
import React, { useContext } from 'react';
import { AuthContext } from '@/App';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  ArrowUpRight 
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const KpiCards = () => {
  const { locale } = useContext(AuthContext);

  const translations = {
    'pt-BR': {
      revenue: 'Receita',
      orders: 'Pedidos',
      customers: 'Clientes',
      avgOrder: 'Ticket Médio',
      conversion: 'Taxa de Conversão',
      today: 'Hoje',
      week: 'Esta semana',
      month: 'Este mês',
    },
    'de': {
      revenue: 'Umsatz',
      orders: 'Bestellungen',
      customers: 'Kunden',
      avgOrder: 'Durchschnittlich',
      conversion: 'Konversionsrate',
      today: 'Heute',
      week: 'Diese Woche',
      month: 'Diesen Monat',
    }
  };

  const t = translations[locale];

  const kpis = [
    {
      title: t.revenue,
      value: locale === 'pt-BR' ? 'R$ 24.389,50' : '€ 4.587,20',
      change: '+12,5%',
      trend: 'up',
      period: t.month,
      icon: <CreditCard className="h-5 w-5 text-primary" />,
    },
    {
      title: t.orders,
      value: '348',
      change: '+18,2%',
      trend: 'up',
      period: t.week,
      icon: <ShoppingBag className="h-5 w-5 text-primary" />,
    },
    {
      title: t.customers,
      value: '1.249',
      change: '+7,3%',
      trend: 'up',
      period: t.month,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: t.avgOrder,
      value: locale === 'pt-BR' ? 'R$ 70,09' : '€ 13,18',
      change: '-2,1%',
      trend: 'down',
      period: t.week,
      icon: <ShoppingBag className="h-5 w-5 text-primary" />,
    },
    {
      title: t.conversion,
      value: '4,2%',
      change: '+0,8%',
      trend: 'up',
      period: t.today,
      icon: <ArrowUpRight className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="bg-card/60 backdrop-blur border-border shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                <div className="flex items-center mt-1.5">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground text-xs ml-1.5">
                    {kpi.period}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-background/40 rounded-lg">
                {kpi.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
