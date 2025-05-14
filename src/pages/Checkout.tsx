import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Progress } from '@/components/ui/progress';
import { AuthContext } from '@/App';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { ColorCustomizer } from '@/components/ColorCustomizer';
import { useTheme } from '@/components/ThemeProvider';

// Define ColorType diretamente (já que não precisamos mais do ThemeColorPicker)
type ColorType = 'secondary' | 'text' | 'border' | 'button';
type LocaleType = 'pt-BR' | 'de';

const Checkout: React.FC = () => {
  const { locale = 'pt-BR' } = useParams<{ locale: LocaleType }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { theme, primaryColor } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    addressNumber: '',
    complement: '',
    country: locale === 'de' ? 'Alemanha' : 'Brasil',
    phone: '',
    newsletter: false
  });
  const [progressValue, setProgressValue] = useState(50);
  const { setLocale, colors, setColor } = useContext(AuthContext);

  useEffect(() => {
    // Set progress based on step
    setProgressValue(currentStep === 1 ? 50 : 100);
    // Update the locale in the context
    setLocale(locale as LocaleType);
  }, [currentStep, locale, setLocale]);

  const handleNextStep = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handlePaymentComplete = () => {
    // Handle successful payment
    console.log("Payment completed with data:", formData);
    // Navigate to success page or show success modal
  };

  const toggleLocale = () => {
    const newLocale = locale === 'pt-BR' ? 'de' : 'pt-BR';
    navigate(`/checkout/${newLocale}`);
  };

  // Manejar a mudança de cores
  const handleColorChange = (color: string, colorType: ColorType) => {
    setColor(color, colorType);
  };

  // Translations based on locale
  const translations = {
    'pt-BR': {
      stepData: 'Dados',
      stepPayment: 'Pagamento',
      title: 'Finalizar compra',
      switchLanguage: 'Deutsch'
    },
    'de': {
      stepData: 'Daten',
      stepPayment: 'Zahlung',
      title: 'Kasse',
      switchLanguage: 'Português'
    }
  };

  const t = translations[locale as LocaleType];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-2 px-6 flex justify-between items-center shadow-sm">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:text-white/80" onClick={toggleLocale}>
            <Globe size={16} />
            {t.switchLanguage}
          </Button>
          <ColorCustomizer />
        </div>
      </header>

      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <div className={currentStep >= 1 ? "text-primary font-medium" : ""}>
              1. {t.stepData}
            </div>
            <div className={currentStep >= 2 ? "text-primary font-medium" : ""}>
              2. {t.stepPayment}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6 text-foreground">{t.title}</h1>
            
            {currentStep === 1 ? (
              <CheckoutForm 
                onSubmit={handleNextStep} 
                initialValues={formData} 
                locale={locale as LocaleType} 
              />
            ) : (
              <PaymentForm 
                onBack={handlePrevStep} 
                onComplete={handlePaymentComplete} 
                locale={locale as LocaleType}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary locale={locale as LocaleType} />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MultiDrop. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Checkout;
