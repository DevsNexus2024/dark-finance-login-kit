
import React, { useContext } from 'react';
import { AuthContext } from '@/App';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Line
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PerformanceChart = () => {
  const { locale } = useContext(AuthContext);

  const translations = {
    'pt-BR': {
      performance: 'Performance',
      revenue: 'Receita',
      orders: 'Pedidos',
      daily: 'Diário',
      weekly: 'Semanal',
      monthly: 'Mensal',
    },
    'de': {
      performance: 'Leistung',
      revenue: 'Umsatz',
      orders: 'Bestellungen',
      daily: 'Täglich',
      weekly: 'Wöchentlich',
      monthly: 'Monatlich',
    }
  };

  const t = translations[locale];

  const prefix = locale === 'pt-BR' ? 'R$' : '€';

  // Dados simulados para o gráfico
  const dailyData = [
    { name: '01/05', revenue: 1200, orders: 28 },
    { name: '02/05', revenue: 1350, orders: 32 },
    { name: '03/05', revenue: 1100, orders: 25 },
    { name: '04/05', revenue: 1500, orders: 36 },
    { name: '05/05', revenue: 1650, orders: 40 },
    { name: '06/05', revenue: 1800, orders: 44 },
    { name: '07/05', revenue: 2000, orders: 48 },
  ];

  const weeklyData = [
    { name: 'Sem 1', revenue: 7800, orders: 189 },
    { name: 'Sem 2', revenue: 8200, orders: 201 },
    { name: 'Sem 3', revenue: 9100, orders: 225 },
    { name: 'Sem 4', revenue: 9650, orders: 240 },
  ];

  const monthlyData = [
    { name: 'Jan', revenue: 28500, orders: 712 },
    { name: 'Fev', revenue: 31200, orders: 780 },
    { name: 'Mar', revenue: 34800, orders: 870 },
    { name: 'Abr', revenue: 37500, orders: 940 },
    { name: 'Mai', revenue: 39200, orders: 980 },
  ];

  const chartConfig = {
    revenue: {
      label: t.revenue,
      theme: {
        light: "#41B871",
        dark: "#41B871"
      },
    },
    orders: {
      label: t.orders,
      theme: {
        light: "#60A5FA",
        dark: "#60A5FA"
      },
    },
  };

  return (
    <Card className="bg-card/60 backdrop-blur border-border shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle>{t.performance}</CardTitle>
          <Tabs defaultValue="daily">
            <TabsList className="bg-background/50">
              <TabsTrigger value="daily">{t.daily}</TabsTrigger>
              <TabsTrigger value="weekly">{t.weekly}</TabsTrigger>
              <TabsTrigger value="monthly">{t.monthly}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full mt-4">
          <Tabs defaultValue="daily">
            <TabsContent value="daily" className="h-full">
              <ChartContainer config={chartConfig} className="h-full">
                <ComposedChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#41B871" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#41B871" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="rounded-lg border border-border bg-background/95 p-2 shadow-md">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium">{payload[0]?.payload?.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <p className="text-sm">
                                {t.revenue}: {prefix} {payload[0]?.value?.toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <p className="text-sm">
                                {t.orders}: {payload[1]?.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#41B871" 
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    yAxisId="left"
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#60A5FA" 
                    barSize={20}
                    yAxisId="right" 
                  />
                </ComposedChart>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="weekly" className="h-full">
              <ChartContainer config={chartConfig} className="h-full">
                <ComposedChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorRevenueWeekly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#41B871" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#41B871" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#41B871" 
                    fillOpacity={1}
                    fill="url(#colorRevenueWeekly)"
                    yAxisId="left"
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#60A5FA" 
                    barSize={20}
                    yAxisId="right" 
                  />
                </ComposedChart>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="monthly" className="h-full">
              <ChartContainer config={chartConfig} className="h-full">
                <ComposedChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenueMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#41B871" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#41B871" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#41B871" 
                    fillOpacity={1}
                    fill="url(#colorRevenueMonthly)"
                    yAxisId="left"
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#60A5FA" 
                    barSize={20}
                    yAxisId="right" 
                  />
                </ComposedChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
