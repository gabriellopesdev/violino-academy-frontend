
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

// Mock data for video lessons
const mockLessons = [
  {
    id: '1',
    title: 'Introdução ao Violino - Postura e Arco',
    description: 'Aprenda a postura correta e como segurar o arco adequadamente.',
    duration: '15 min',
    level: 'Iniciante',
    thumbnail: '🎻'
  },
  {
    id: '2',
    title: 'Primeiras Notas - Cordas Soltas',
    description: 'Domine o som das cordas soltas antes de aprender as posições.',
    duration: '20 min',
    level: 'Iniciante',
    thumbnail: '🎵'
  },
  {
    id: '3',
    title: 'Técnica de Arco - Détaché',
    description: 'Desenvolva a técnica básica de arco com exercícios práticos.',
    duration: '25 min',
    level: 'Intermediário',
    thumbnail: '🎼'
  },
  {
    id: '4',
    title: 'Primeira Posição - Dedilhado',
    description: 'Aprenda o dedilhado da primeira posição com exercícios graduais.',
    duration: '30 min',
    level: 'Iniciante',
    thumbnail: '✋'
  },
  {
    id: '5',
    title: 'Escalas Maiores - Dó Maior',
    description: 'Domine a escala de Dó Maior em primeira posição.',
    duration: '18 min',
    level: 'Intermediário',
    thumbnail: '🎯'
  },
  {
    id: '6',
    title: 'Vibrato - Técnica Avançada',
    description: 'Introdução à técnica de vibrato para expressividade musical.',
    duration: '35 min',
    level: 'Avançado',
    thumbnail: '✨'
  }
];

const Dashboard = () => {
  const { user } = useAuth();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violin-900 mb-2">
            Bem-vindo de volta, {user?.name}!
          </h1>
          <p className="text-violin-600">
            Continue sua jornada musical. Escolha uma aula para continuar aprendendo.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-violin-200 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/evaluation">
              <CardHeader>
                <CardTitle className="text-violin-900 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Avaliação de Progresso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Veja seus exercícios e teste seus conhecimentos
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-violin-200 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/forum">
              <CardHeader>
                <CardTitle className="text-violin-900 flex items-center">
                  <span className="text-2xl mr-3">💬</span>
                  Fórum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Tire dúvidas e converse com outros alunos
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-violin-200 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/schedule">
              <CardHeader>
                <CardTitle className="text-violin-900 flex items-center">
                  <span className="text-2xl mr-3">📅</span>
                  Agendar Aula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Marque uma aula ao vivo com professor
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Video Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-violin-900 mb-6">Videoaulas Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLessons.map((lesson) => (
              <Card key={lesson.id} className="border-violin-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{lesson.thumbnail}</span>
                      <div>
                        <Badge className={getLevelColor(lesson.level)}>
                          {lesson.level}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-violin-500">{lesson.duration}</span>
                  </div>
                  <CardTitle className="text-violin-900 mt-2">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-violin-600 mb-4">
                    {lesson.description}
                  </CardDescription>
                  <Button asChild className="w-full bg-violin-gradient hover:opacity-90">
                    <Link to={`/video-lesson/${lesson.id}`}>
                      Assistir Aula
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <Card className="border-violin-200">
            <CardHeader>
              <CardTitle className="text-violin-900">Seu Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violin-900">6</div>
                  <div className="text-violin-600">Aulas Assistidas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violin-900">12h</div>
                  <div className="text-violin-600">Tempo de Estudo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violin-900">85%</div>
                  <div className="text-violin-600">Taxa de Conclusão</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
