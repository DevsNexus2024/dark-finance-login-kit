
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type LocaleType = 'pt-BR' | 'de';

interface CheckoutFormProps {
  onSubmit: (data: any) => void;
  initialValues: any;
  locale: LocaleType;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, initialValues, locale }) => {
  // Translations
  const translations = {
    'pt-BR': {
      title: 'Dados de entrega',
      name: 'Nome completo',
      email: 'E-mail',
      address: 'Endereço',
      addressNumber: 'Número',
      complement: 'Complemento',
      country: 'País',
      phone: 'Telefone',
      newsletter: 'Receber novidades por e-mail',
      next: 'Próximo',
      placeholders: {
        name: 'Seu nome completo',
        email: 'seu@email.com',
        address: 'Rua, Avenida, etc',
        addressNumber: 'Nº',
        complement: 'Apto, Bloco, etc (opcional)',
        phone: '(00) 00000-0000'
      }
    },
    'de': {
      title: 'Lieferdaten',
      name: 'Vollständiger Name',
      email: 'E-Mail',
      address: 'Adresse',
      addressNumber: 'Hausnummer',
      complement: 'Zusatz',
      country: 'Land',
      phone: 'Telefon',
      newsletter: 'Newsletter abonnieren',
      next: 'Weiter',
      placeholders: {
        name: 'Ihr vollständiger Name',
        email: 'ihre@email.com',
        address: 'Straße',
        addressNumber: 'Nr',
        complement: 'App, Etage, usw. (optional)',
        phone: '+49 123 45678900'
      }
    }
  };

  const t = translations[locale];

  // Countries
  const countries = {
    'pt-BR': [
      { label: 'Brasil', value: 'Brasil', flag: '🇧🇷' },
      { label: 'Alemanha', value: 'Alemanha', flag: '🇩🇪' },
      { label: 'Portugal', value: 'Portugal', flag: '🇵🇹' },
      { label: 'Espanha', value: 'Espanha', flag: '🇪🇸' },
      { label: 'França', value: 'França', flag: '🇫🇷' },
    ],
    'de': [
      { label: 'Deutschland', value: 'Alemanha', flag: '🇩🇪' },
      { label: 'Brasilien', value: 'Brasil', flag: '🇧🇷' },
      { label: 'Portugal', value: 'Portugal', flag: '🇵🇹' },
      { label: 'Spanien', value: 'Espanha', flag: '🇪🇸' },
      { label: 'Frankreich', value: 'França', flag: '🇫🇷' },
    ]
  };

  // Form schema using Zod
  const formSchema = z.object({
    name: z.string().min(3, { message: locale === 'pt-BR' ? 'Nome é obrigatório' : 'Name ist erforderlich' }),
    email: z.string().email({ 
      message: locale === 'pt-BR' ? 'Email inválido' : 'Ungültige E-Mail-Adresse' 
    }),
    address: z.string().min(3, { 
      message: locale === 'pt-BR' ? 'Endereço é obrigatório' : 'Adresse ist erforderlich'
    }),
    addressNumber: z.string().min(1, { 
      message: locale === 'pt-BR' ? 'Número é obrigatório' : 'Hausnummer ist erforderlich'
    }),
    complement: z.string().optional(),
    country: z.string().min(1, { 
      message: locale === 'pt-BR' ? 'País é obrigatório' : 'Land ist erforderlich'
    }),
    phone: z.string().min(8, { 
      message: locale === 'pt-BR' ? 'Telefone é obrigatório' : 'Telefon ist erforderlich'
    }),
    newsletter: z.boolean().optional()
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.name || '',
      email: initialValues.email || '',
      address: initialValues.address || '',
      addressNumber: initialValues.addressNumber || '',
      complement: initialValues.complement || '',
      country: initialValues.country || (locale === 'de' ? 'Alemanha' : 'Brasil'),
      phone: initialValues.phone || '',
      newsletter: initialValues.newsletter || false
    }
  });

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-6">{t.title}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.placeholders.name} {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.email}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.placeholders.email} {...field} type="email" className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.address}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.placeholders.address} {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="addressNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.addressNumber}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.placeholders.addressNumber} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.complement}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.placeholders.complement} {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.country}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t.country} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries[locale].map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            <div className="flex items-center">
                              <span className="mr-2">{country.flag}</span>
                              {country.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.phone}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.placeholders.phone} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-muted-foreground cursor-pointer">
                      {t.newsletter}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full md:w-auto h-12 mt-6"
              disabled={!form.formState.isValid && form.formState.isSubmitted}
            >
              {t.next}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
