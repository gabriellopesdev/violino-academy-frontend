
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Send, HelpCircle, Mail, Phone } from 'lucide-react';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !category || !message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Sucesso!",
        description: "Sua mensagem foi enviada. Entraremos em contato em breve.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setCategory('');
      setMessage('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-violin-900 mb-2">Central de Ajuda</h1>
            <p className="text-violin-600">
              Precisa de ajuda? Estamos aqui para você. Entre em contato conosco.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-violin-200">
              <CardHeader>
                <CardTitle className="text-violin-900 flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Envie sua Mensagem
                </CardTitle>
                <CardDescription>
                  Descreva seu problema ou dúvida e entraremos em contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-violin-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-violin-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria do Problema</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="border-violin-200">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Problema Técnico</SelectItem>
                        <SelectItem value="account">Conta e Login</SelectItem>
                        <SelectItem value="payment">Pagamento</SelectItem>
                        <SelectItem value="lesson">Aulas e Conteúdo</SelectItem>
                        <SelectItem value="general">Dúvida Geral</SelectItem>
                        <SelectItem value="suggestion">Sugestão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Descreva detalhadamente seu problema ou dúvida..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-violin-200 min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full   hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info and FAQ */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="border-violin-200">
                <CardHeader>
                  <CardTitle className="text-violin-900">Outras Formas de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-violin-600" />
                    <div>
                      <p className="font-medium text-violin-900">Email</p>
                      <p className="text-violin-600">suporte@aulasdeviolino.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-violin-600" />
                    <div>
                      <p className="font-medium text-violin-900">Telefone</p>
                      <p className="text-violin-600">(11) 99999-9999</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-violin-600" />
                    <div>
                      <p className="font-medium text-violin-900">Horário de Atendimento</p>
                      <p className="text-violin-600">Segunda a Sexta, 9h às 18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="border-violin-200">
                <CardHeader>
                  <CardTitle className="text-violin-900">Perguntas Frequentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-violin-900 mb-2">Como faço para cancelar minha assinatura?</h4>
                    <p className="text-sm text-violin-600">
                      Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta ou entrando em contato conosco.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-violin-900 mb-2">Posso baixar as aulas para assistir offline?</h4>
                    <p className="text-sm text-violin-600">
                      Atualmente, as aulas estão disponíveis apenas para streaming online. Os materiais PDF podem ser baixados.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-violin-900 mb-2">Como agendar uma aula particular?</h4>
                    <p className="text-sm text-violin-600">
                      Acesse a seção "Agendamento" no seu dashboard e escolha o professor e horário de sua preferência.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-violin-900 mb-2">Preciso de um violino específico?</h4>
                    <p className="text-sm text-violin-600">
                      Qualquer violino acústico serve para começar. Temos aulas específicas sobre como escolher e cuidar do seu instrumento.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Support;
