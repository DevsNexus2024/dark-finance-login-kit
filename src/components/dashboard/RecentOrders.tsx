
import React, { useContext } from 'react';
import { AuthContext } from '@/App';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Download } from "lucide-react";

export const RecentOrders = () => {
  const { locale } = useContext(AuthContext);

  const translations = {
    'pt-BR': {
      recentOrders: 'Pedidos Recentes',
      orderNumber: '#Pedido',
      customer: 'Cliente',
      status: 'Status',
      amount: 'Valor',
      date: 'Data',
      actions: 'Ações',
      completed: 'Concluído',
      processing: 'Processando',
      cancelled: 'Cancelado',
      view: 'Visualizar',
      download: 'Baixar',
    },
    'de': {
      recentOrders: 'Aktuelle Bestellungen',
      orderNumber: '#Bestellung',
      customer: 'Kunde',
      status: 'Status',
      amount: 'Betrag',
      date: 'Datum',
      actions: 'Aktionen',
      completed: 'Abgeschlossen',
      processing: 'In Bearbeitung',
      cancelled: 'Storniert',
      view: 'Ansehen',
      download: 'Herunterladen',
    }
  };

  const t = translations[locale];
  const currencyPrefix = locale === 'pt-BR' ? 'R$' : '€';

  const statusMap = {
    completed: {
      label: t.completed,
      className: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
    },
    processing: {
      label: t.processing,
      className: "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30",
    },
    cancelled: {
      label: t.cancelled,
      className: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
    },
  };

  // Dados simulados para a tabela
  const orders = [
    {
      id: "#MD-2305",
      customer: "Carlos Silva",
      status: "completed",
      amount: 124.50,
      date: "14/05/2023 14:30",
    },
    {
      id: "#MD-2304",
      customer: "Maria Santos",
      status: "processing",
      amount: 89.99,
      date: "14/05/2023 11:42",
    },
    {
      id: "#MD-2303",
      customer: "João Oliveira",
      status: "completed",
      amount: 245.00,
      date: "13/05/2023 18:23",
    },
    {
      id: "#MD-2302",
      customer: "Ana Costa",
      status: "cancelled",
      amount: 59.90,
      date: "13/05/2023 10:15",
    },
    {
      id: "#MD-2301",
      customer: "Pedro Almeida",
      status: "completed",
      amount: 179.50,
      date: "12/05/2023 16:08",
    },
  ];

  return (
    <Card className="bg-card/60 backdrop-blur border-border shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle>{t.recentOrders}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>{t.orderNumber}</TableHead>
                <TableHead>{t.customer}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.amount}</TableHead>
                <TableHead>{t.date}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-t border-muted hover:bg-muted/10 transition-colors">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusMap[order.status].className}>
                      {statusMap[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{currencyPrefix} {order.amount.toFixed(2)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          {t.view}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          {t.download}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
