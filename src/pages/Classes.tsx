
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, PlayCircle } from 'lucide-react';

const Classes = () => {
  const courseLevels = [
    {
      level: 'Iniciante',
      title: 'Primeiros Passos no Violino',
      description: 'Para quem nunca tocou violino antes. Aprenda desde como segurar o instrumento até tocar suas primeiras melodias.',
      duration: '8 semanas',
      lessons: 24,
      students: 150,
      rating: 4.9,
      color: 'bg-green-100 text-green-800',
      features: [
        'Postura e técnica básica',
        'Cordas soltas e afinação',
        'Primeiras notas e escalas',
        'Exercícios de coordenação',
        'Repertório simples'
      ]
    },
    {
      level: 'Intermediário',
      title: 'Desenvolvendo sua Técnica',
      description: 'Para alunos que já dominam o básico. Aprofunde sua técnica e expanda seu repertório musical.',
      duration: '12 semanas',
      lessons: 36,
      students: 120,
      rating: 4.8,
      color: 'bg-yellow-100 text-yellow-800',
      features: [
        'Mudanças de posição',
        'Vibrato e expressividade',
        'Escalas e arpejos avançados',
        'Repertório clássico e popular',
        'Técnicas de arco avançadas'
      ]
    },
    {
      level: 'Avançado',
      title: 'Maestria e Interpretação',
      description: 'Para violinistas experientes que desejam aperfeiçoar sua interpretação e técnicas avançadas.',
      duration: '16 semanas',
      lessons: 48,
      students: 80,
      rating: 4.9,
      color: 'bg-red-100 text-red-800',
      features: [
        'Técnicas virtuosísticas',
        'Interpretação musical avançada',
        'Repertório de concerto',
        'Preparação para apresentações',
        'Análise musical detalhada'
      ]
    }
  ];

  const specializedCourses = [
    {
      title: 'Violino Popular Brasileiro',
      description: 'Aprenda a tocar sucessos da música popular brasileira no violino.',
      duration: '6 semanas',
      lessons: 18,
      instructor: 'Profa. Maria Santos',
      image: '🇧🇷'
    },
    {
      title: 'Música de Câmara',
      description: 'Técnicas para tocar em grupos e ensembles de música de câmara.',
      duration: '8 semanas',
      lessons: 24,
      instructor: 'Prof. Carlos Silva',
      image: '🎼'
    },
    {
      title: 'Violino Elétrico e Efeitos',
      description: 'Explore as possibilidades do violino elétrico e efeitos sonoros.',
      duration: '4 semanas',
      lessons: 12,
      instructor: 'Prof. João Oliveira',
      image: '⚡'
    }
  ];

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-violin-900 mb-6">
              Nossos Cursos de Violino
            </h1>
            <p className="text-xl text-violin-700 mb-8">
              Do iniciante ao avançado, temos o curso perfeito para sua jornada musical. 
              Aprenda no seu ritmo com professores especializados.
            </p>
          </div>
        </div>
      </section>

      {/* Main Courses */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violin-900 mb-4">Cursos por Nível</h2>
            <p className="text-violin-600 max-w-2xl mx-auto">
              Escolha o curso ideal para seu nível atual e comece a evoluir hoje mesmo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courseLevels.map((course, index) => (
              <Card key={index} className="border-violin-200 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={course.color}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-violin-600">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-violin-900 text-xl mb-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-violin-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Stats */}
                  <div className="flex justify-between text-sm text-violin-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      {course.lessons} aulas
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} alunos
                    </span>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-violin-900 mb-2">O que você vai aprender:</h4>
                    <ul className="space-y-1">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-violin-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-violin-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-violin-gradient hover:opacity-90">
                    <Link to="/register">Começar Curso</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Courses */}
      <section className="py-20 bg-violin-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violin-900 mb-4">Cursos Especializados</h2>
            <p className="text-violin-600 max-w-2xl mx-auto">
              Explore estilos específicos e técnicas avançadas com nossos cursos especializados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {specializedCourses.map((course, index) => (
              <Card key={index} className="border-violin-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{course.image}</div>
                  <CardTitle className="text-violin-900">{course.title}</CardTitle>
                  <CardDescription className="text-violin-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-violin-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      {course.lessons} aulas
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-violin-600 mb-3">
                      <strong>Instrutor:</strong> {course.instructor}
                    </p>
                  </div>

                  <Button asChild variant="outline" className="w-full">
                    <Link to="/register">Ver Detalhes</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violin-900 mb-4">O que está incluído</h2>
            <p className="text-violin-600">Todos os nossos cursos incluem estes recursos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-violin-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="font-semibold text-violin-900 mb-2">Videoaulas HD</h3>
              <p className="text-sm text-violin-600">Aulas gravadas em alta qualidade com múltiplos ângulos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-violin-900 mb-2">Material PDF</h3>
              <p className="text-sm text-violin-600">Partituras e exercícios para download</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violin-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-violin-900 mb-2">Exercícios Práticos</h3>
              <p className="text-sm text-violin-600">Atividades interativas para testar seu progresso</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-semibold text-violin-900 mb-2">Suporte do Professor</h3>
              <p className="text-sm text-violin-600">Tire dúvidas diretamente com os instrutores</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violin-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-violin-100 mb-8">
              Escolha seu curso e comece a aprender violino hoje mesmo. 
              Teste gratuitamente por 7 dias!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-violin-900">
                <Link to="/register">Começar Gratuitamente</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-violin-900">
                <Link to="/contact">Falar com um Consultor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Classes;
