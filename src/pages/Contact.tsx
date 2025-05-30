
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
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
        description: "Sua mensagem foi enviada. Retornaremos em breve.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-violin-900 mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-violin-700">
              Tem dúvidas ou quer saber mais sobre nossos cursos? 
              Estamos aqui para ajudar você a começar sua jornada musical.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-violin-200">
                <CardHeader>
                  <CardTitle className="text-violin-900 text-2xl">Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário e entraremos em contato em até 24 horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Seu nome"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-violin-200 focus:border-violin-400"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-violin-200 focus:border-violin-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Sobre o que você gostaria de falar?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border-violin-200 focus:border-violin-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        placeholder="Conte-nos mais detalhes sobre sua dúvida ou interesse..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-violin-200 focus:border-violin-400 min-h-[120px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full   hover:opacity-90"
                      disabled={loading}
                    >
                      {loading ? (
                        'Enviando...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card className="border-violin-200">
                  <CardHeader>
                    <CardTitle className="text-violin-900">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-violin-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-violin-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-violin-900">Email</h4>
                        <p className="text-violin-600">contato@aulasdeviolino.com.br</p>
                        <p className="text-violin-600">suporte@aulasdeviolino.com.br</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-gold-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-violin-900">Telefone</h4>
                        <p className="text-violin-600">(11) 99999-9999</p>
                        <p className="text-violin-600">(11) 3333-3333</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-violin-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-violin-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-violin-900">Endereço</h4>
                        <p className="text-violin-600">Rua da Música, 123</p>
                        <p className="text-violin-600">São Paulo, SP - 01234-567</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gold-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-violin-900">Horário de Atendimento</h4>
                        <p className="text-violin-600">Segunda a Sexta: 9h às 18h</p>
                        <p className="text-violin-600">Sábado: 9h às 14h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Quick Access */}
                <Card className="border-violin-200">
                  <CardHeader>
                    <CardTitle className="text-violin-900">Perguntas Frequentes</CardTitle>
                    <CardDescription>
                      Antes de enviar sua mensagem, veja se sua dúvida já foi respondida
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-violin-900 mb-1">Como funciona a primeira aula?</h4>
                      <p className="text-sm text-violin-600">
                        Oferecemos uma aula de demonstração gratuita onde você conhece nossa metodologia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-violin-900 mb-1">Preciso ter um violino para começar?</h4>
                      <p className="text-sm text-violin-600">
                        Sim, mas ajudamos você a escolher o instrumento ideal para seu nível e orçamento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-violin-900 mb-1">Qual a idade mínima para começar?</h4>
                      <p className="text-sm text-violin-600">
                        Aceitamos alunos a partir dos 6 anos, com metodologia específica para cada faixa etária.
                      </p>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <a href="/support">Ver Todas as Perguntas</a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Social Proof */}
                <Card className="border-violin-200 bg-violin-50">
                  <CardContent className="text-center py-8">
                    <div className="text-4xl mb-4">🎻</div>
                    <h3 className="font-semibold text-violin-900 mb-2">
                      Mais de 500 alunos satisfeitos
                    </h3>
                    <p className="text-violin-600 text-sm">
                      Junte-se à nossa comunidade de músicos e comece sua jornada hoje mesmo.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
