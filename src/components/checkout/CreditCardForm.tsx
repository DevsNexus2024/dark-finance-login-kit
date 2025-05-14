
import React from 'react';
import { Input } from '@/components/ui/input';

interface CreditCardFormProps {
  locale: 'pt-BR' | 'de';
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ locale }) => {
  // Translations
  const translations = {
    'pt-BR': {
      cardNumber: 'Número do cartão',
      expiry: 'Validade',
      cvc: 'CVC',
      cardPlaceholder: '1234 5678 9012 3456',
      expiryPlaceholder: 'MM/AA',
      cvcPlaceholder: '123'
    },
    'de': {
      cardNumber: 'Kartennummer',
      expiry: 'Gültig bis',
      cvc: 'CVC',
      cardPlaceholder: '1234 5678 9012 3456',
      expiryPlaceholder: 'MM/JJ',
      cvcPlaceholder: '123'
    }
  };

  const t = translations[locale];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="card-number" className="block text-sm font-medium mb-1">
          {t.cardNumber}
        </label>
        <Input
          id="card-number"
          placeholder={t.cardPlaceholder}
          className="h-12"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="card-expiry" className="block text-sm font-medium mb-1">
            {t.expiry}
          </label>
          <Input
            id="card-expiry"
            placeholder={t.expiryPlaceholder}
            className="h-12"
          />
        </div>
        
        <div>
          <label htmlFor="card-cvc" className="block text-sm font-medium mb-1">
            {t.cvc}
          </label>
          <Input
            id="card-cvc"
            placeholder={t.cvcPlaceholder}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
