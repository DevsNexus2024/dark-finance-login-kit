
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import CreditCardForm from './CreditCardForm';

type LocaleType = 'pt-BR' | 'de';

interface PaymentFormProps {
  onBack: () => void;
  onComplete: () => void;
  locale: LocaleType;
}

type PaymentMethod = 'card' | 'paypal' | 'klarna' | 'link';

const PaymentForm: React.FC<PaymentFormProps> = ({ onBack, onComplete, locale }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveData, setSaveData] = useState(false);

  // Translations
  const translations = {
    'pt-BR': {
      title: 'Forma de pagamento',
      back: 'Voltar',
      pay: 'Finalizar pagamento',
      processing: 'Processando...',
      card: 'Cartão de crédito/débito',
      paypal: 'PayPal',
      klarna: 'Klarna',
      link: 'Pagar com Link',
      oneClick: 'Pagar em 1-clique',
      saveData: 'Salvar meus dados com segurança para fazer checkout com 1 clique',
      fastPayment: 'Pague mais rápido em MultiDrop e em todos os lugares que aceitam o Link.'
    },
    'de': {
      title: 'Zahlungsart',
      back: 'Zurück',
      pay: 'Jetzt zahlen',
      processing: 'Verarbeitung...',
      card: 'Kredit/Debitkarte',
      paypal: 'PayPal',
      klarna: 'Klarna',
      link: 'Mit Link bezahlen',
      oneClick: '1-Klick-Zahlung',
      saveData: 'Meine Daten sicher speichern für 1-Klick-Checkout',
      fastPayment: 'Zahlen Sie schneller bei MultiDrop und überall, wo Link akzeptiert wird.'
    }
  };

  const t = translations[locale];

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-6">{t.title}</h2>
        
        <div className="space-y-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'card' 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedMethod('card')}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card' 
                    ? 'border-primary' 
                    : 'border-muted-foreground'}`}>
                    {selectedMethod === 'card' && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium">{t.card}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">💳</span>
              </div>
            </div>
            
            {selectedMethod === 'card' && (
              <div className="mt-4">
                <CreditCardForm locale={locale} />
              </div>
            )}
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'paypal' 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedMethod('paypal')}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'paypal' 
                    ? 'border-primary' 
                    : 'border-muted-foreground'}`}>
                    {selectedMethod === 'paypal' && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium">{t.paypal}</span>
                </div>
              </div>
              <div>
                <span className="flex items-center font-medium text-blue-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 8.5C19.5 11.5 17 14 13.5 14H11C10.5 14 10 14.5 10 15L9 20C9 20.5 8.5 21 8 21H7C6.5 21 6.1 20.6 6.2 20.1L8 14M6.5 8.5C6.5 5.5 9 3 12.5 3H15C15.5 3 16 3.5 16 4L17 9C17 9.5 16.5 10 16 10H13.5C10 10 7.5 7.5 7.5 4.5" stroke="#1D3FEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  PayPal
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'klarna' 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedMethod('klarna')}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'klarna' 
                    ? 'border-primary' 
                    : 'border-muted-foreground'}`}>
                    {selectedMethod === 'klarna' && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium">{t.klarna}</span>
                </div>
              </div>
              <div>
                <span className="flex items-center font-bold text-pink-600">
                  <div className="bg-pink-100 text-pink-600 font-bold h-6 w-6 flex items-center justify-center rounded mr-1">K</div>
                  Klarna
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'link' 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedMethod('link')}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'link' 
                    ? 'border-primary' 
                    : 'border-muted-foreground'}`}>
                    {selectedMethod === 'link' && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium">{t.link}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-indigo-600 rounded-full mr-1">
                  <span className="text-white text-xs">→</span>
                </div>
                <span className="font-medium text-indigo-600">{t.oneClick}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex items-start space-x-3">
              <Checkbox id="saveData" checked={saveData} onCheckedChange={(checked) => setSaveData(checked === true)} />
              <div>
                <label htmlFor="saveData" className="text-base font-medium cursor-pointer">
                  {t.saveData}
                </label>
                <p className="text-muted-foreground text-sm mt-1">{t.fastPayment}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="h-12"
            >
              {t.back}
            </Button>
            
            <Button 
              type="button" 
              onClick={handlePayment}
              disabled={isProcessing}
              className="h-12 px-8"
            >
              {isProcessing ? t.processing : t.pay}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
