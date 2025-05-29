
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Users, Award, BookOpen, Heart } from 'lucide-react';

const About = () => {
  const teachers = [
    {
      name: 'Prof. Carlos Silva',
      specialty: 'Técnica Clássica e Erudita',
      experience: '15 anos de experiência',
      credentials: 'Mestre em Música pela UNESP',
      avatar: '👨‍🏫',
      description: 'Especialista em repertório clássico e técnica avançada de violino.'
    },
    {
      name: 'Profa. Maria Santos',
      specialty: 'Música Popular e Brasileira',
      experience: '12 anos de experiência',
      credentials: 'Bacharel em Música pela USP',
      avatar: '👩‍🏫',
      description: 'Focada em música popular brasileira e adaptações modernas.'
    },
    {
      name: 'Prof. João Oliveira',
      specialty: 'Metodologia para Iniciantes',
      experience: '8 anos de experiência',
      credentials: 'Especialista em Educação Musical',
      avatar: '👨‍🎓',
      description: 'Desenvolve métodos únicos para ensinar violino para crianças e adultos iniciantes.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Alunos Ativos', icon: <Users className="w-6 h-6" /> },
    { number: '100+', label: 'Videoaulas', icon: <BookOpen className="w-6 h-6" /> },
    { number: '5 anos', label: 'De Experiência', icon: <Award className="w-6 h-6" /> },
    { number: '98%', label: 'Satisfação', icon: <Heart className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-violin-900 mb-6">
              Nossa História e Missão
            </h1>
            <p className="text-xl text-violin-700 mb-8">
              Democratizamos o ensino de violino através da tecnologia, 
              conectando alunos a professores especializados em todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-violin-900 mb-6">Nossa Missão</h2>
                <p className="text-violin-700 mb-4">
                  Acreditamos que a música transforma vidas e que todos devem ter acesso ao aprendizado musical de qualidade. 
                  Nossa plataforma foi criada para quebrar as barreiras geográficas e econômicas do ensino musical.
                </p>
                <p className="text-violin-700 mb-6">
                  Utilizamos tecnologia de ponta para criar uma experiência de aprendizado envolvente, 
                  com aulas interativas, acompanhamento personalizado e uma comunidade vibrante de músicos.
                </p>
                <Button asChild className="bg-violin-gradient hover:opacity-90">
                  <Link to="/register">Comece Sua Jornada</Link>
                </Button>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 bg-violin-100 rounded-full mx-auto flex items-center justify-center text-8xl">
                  🎻
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-violin-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violin-900 mb-4">Nossos Números</h2>
            <p className="text-violin-600">Veja como estamos impactando a educação musical no Brasil</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-violin-200 text-center">
                <CardContent className="pt-6">
                  <div className="text-violin-600 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-violin-900 mb-2">{stat.number}</div>
                  <div className="text-violin-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violin-900 mb-4">Nossos Professores</h2>
            <p className="text-violin-600 max-w-2xl mx-auto">
              Conheça nossa equipe de professores especializados, 
              cada um com experiência única e paixão pelo ensino musical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teachers.map((teacher, index) => (
              <Card key={index} className="border-violin-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{teacher.avatar}</div>
                  <CardTitle className="text-violin-900">{teacher.name}</CardTitle>
                  <CardDescription className="text-violin-600">
                    {teacher.specialty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Badge variant="secondary" className="text-xs">
                    {teacher.experience}
                  </Badge>
                  <p className="text-sm text-violin-700 font-medium">
                    {teacher.credentials}
                  </p>
                  <p className="text-sm text-violin-600">
                    {teacher.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-violin-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-violin-900 mb-4">Nossos Valores</h2>
              <p className="text-violin-600">Os princípios que guiam nossa abordagem educacional</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-violin-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-violin-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <CardTitle className="text-violin-900">Excelência no Ensino</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-violin-600">
                    Buscamos constantemente a melhoria da qualidade do nosso conteúdo 
                    e metodologias de ensino para proporcionar a melhor experiência educacional.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-violin-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <CardTitle className="text-violin-900">Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-violin-600">
                    Fomentamos uma comunidade acolhedora onde alunos e professores 
                    se conectam, compartilham experiências e crescem juntos musicalmente.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-violin-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-violin-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <CardTitle className="text-violin-900">Inovação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-violin-600">
                    Utilizamos tecnologia moderna para criar ferramentas 
                    inovadoras que facilitam e enriquecem o processo de aprendizagem musical.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-violin-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <CardTitle className="text-violin-900">Personalização</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-violin-600">
                    Entendemos que cada aluno é único e oferecemos 
                    caminhos de aprendizagem personalizados para atender diferentes necessidades e objetivos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violin-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para Começar sua Jornada Musical?
            </h2>
            <p className="text-xl text-violin-100 mb-8">
              Junte-se a centenas de alunos que já descobriram a alegria de tocar violino. 
              Comece hoje mesmo com uma conta gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-violin-900">
                <Link to="/register">Criar Conta Gratuita</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-violin-900">
                <Link to="/contact">Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
