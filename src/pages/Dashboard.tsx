import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  thumbnail: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<VideoLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('video_lessons')
        .select('id, title, description, duration, level, thumbnail')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching lessons:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as aulas.",
          variant: "destructive",
        });
        return;
      }

      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Get user name from user metadata or email
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violin-900 mb-2">
            Bem-vindo de volta, {userName}!
          </h1>
          <p className="text-violin-600">
            Continue sua jornada musical. Escolha uma aula para continuar aprendendo.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          <Card className="border-violin-200 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/my-lessons">
              <CardHeader>
                <CardTitle className="text-violin-900 flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  Minhas Aulas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-violin-600">
                  Visualize suas aulas agendadas
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Video Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-violin-900 mb-6">Videoaulas Disponíveis</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-violin-200 animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
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
          )}
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
                  <div className="text-2xl font-bold text-violin-900">{lessons.length}</div>
                  <div className="text-violin-600">Aulas Disponíveis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violin-900">0h</div>
                  <div className="text-violin-600">Tempo de Estudo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violin-900">0%</div>
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
