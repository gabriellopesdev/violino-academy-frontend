
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Home, Book, Contact } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-violin-900 mb-6 animate-fade-in">
              Aprenda Violino Online com os Melhores Professores
            </h1>
            <p className="text-xl text-violin-700 mb-8 animate-fade-in">
              Descubra a magia da música através de aulas personalizadas, 
              materiais exclusivos e acompanhamento individual. 
              Comece sua jornada musical hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild size="lg" className="bg-violin-gradient hover:opacity-90 text-lg px-8 py-3">
                <Link to="/register">
                  <User className="w-5 h-5 mr-2" />
                  Começar Agora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link to="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-violin-900 mb-4">
              Por que escolher nossa plataforma?
            </h2>
            <p className="text-xl text-violin-600 max-w-2xl mx-auto">
              Oferecemos uma experiência completa de aprendizado musical 
              com tecnologia moderna e ensino de qualidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-violin-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-violin-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <CardTitle className="text-violin-900">Aulas em Vídeo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Acesse centenas de videoaulas organizadas por nível e tema, 
                  com materiais complementares em PDF para download.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-violin-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-violin-900">Avaliação de Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Monitore seu desenvolvimento com exercícios interativos, 
                  testes e feedback imediato dos professores.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-violin-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-violin-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <CardTitle className="text-violin-900">Fórum e Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Conecte-se com outros estudantes e professores. 
                  Tire dúvidas e compartilhe experiências musicais.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-violin-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <CardTitle className="text-violin-900">Aulas Ao Vivo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Agende aulas particulares online com professores especializados 
                  para um acompanhamento personalizado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-violin-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-violin-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎼</span>
                </div>
                <CardTitle className="text-violin-900">Material Didático</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Partituras, exercícios técnicos e materiais complementares 
                  organizados para facilitar seu aprendizado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-violin-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <CardTitle className="text-violin-900">Certificação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Complete os cursos e receba certificados de conclusão 
                  para comprovar seu desenvolvimento musical.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violin-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-violin-900 mb-6">
              Comece sua jornada musical hoje
            </h2>
            <p className="text-xl text-violin-600 mb-8">
              Junte-se a milhares de estudantes que já transformaram suas vidas através da música. 
              Cadastre-se gratuitamente e tenha acesso ao melhor conteúdo de violino online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-violin-gradient hover:opacity-90 text-lg px-8 py-3">
                <Link to="/register">Criar Conta Gratuita</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link to="/classes">Ver Aulas Disponíveis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
