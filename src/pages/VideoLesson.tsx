import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download, ChevronLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoLessonData {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  video_url: string;
  topics: string[];
  materials: { name: string; url: string }[];
}

const VideoLesson = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<VideoLessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchLesson(id);
    }
  }, [id]);

  const fetchLesson = async (lessonId: string) => {
    try {
      const { data, error } = await supabase
        .from('video_lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error) {
        console.error('Error fetching lesson:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a aula.",
          variant: "destructive",
        });
        return;
      }

      // Transform the data to match our interface
      const transformedLesson: VideoLessonData = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        duration: data.duration || '',
        level: data.level,
        video_url: data.video_url || '',
        topics: data.topics || [],
        materials: Array.isArray(data.materials) ? data.materials : []
      };

      setLesson(transformedLesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violin-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-violin-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-violin-900 mb-4">Aula não encontrada</h1>
            <Button asChild>
              <Link to="/dashboard">Voltar ao Dashboard</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const handleDownload = (materialName: string) => {
    // Here you would implement the actual download logic
    toast({
      title: "Download",
      description: `Baixando: ${materialName}`,
    });
  };

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/dashboard">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <Badge className={getLevelColor(lesson.level)}>
              {lesson.level}
            </Badge>
            <span className="text-violin-600">{lesson.duration}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-violin-900 mb-2">{lesson.title}</h1>
          <p className="text-violin-600">{lesson.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="border-violin-200">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-900 rounded-t-lg">
                  {lesson.video_url ? (
                    <iframe
                      className="w-full h-full rounded-t-lg"
                      src={lesson.video_url}
                      title={lesson.title}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <p>Vídeo não disponível</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-violin-900 mb-4">Conteúdo da Aula</h3>
                  {lesson.topics && lesson.topics.length > 0 ? (
                    <ul className="space-y-2">
                      {lesson.topics.map((topic, index) => (
                        <li key={index} className="flex items-center text-violin-700">
                          <span className="w-2 h-2 bg-violin-400 rounded-full mr-3"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-violin-600">Conteúdo em desenvolvimento.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Materials */}
            <Card className="border-violin-200">
              <CardHeader>
                <CardTitle className="text-violin-900 flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Material de Apoio
                </CardTitle>
                <CardDescription>
                  Baixe os materiais complementares desta aula
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {lesson.materials && lesson.materials.length > 0 ? (
                  lesson.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-violin-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📄</span>
                        <span className="text-violin-800 text-sm">{material.name}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(material.name)}
                        className="bg-violin-gradient hover:opacity-90"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-violin-500 text-center py-4">
                    Nenhum material disponível para esta aula.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-violin-200">
              <CardHeader>
                <CardTitle className="text-violin-900">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link to="/evaluation">
                    Fazer Exercícios
                  </Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/forum">
                    Tirar Dúvidas
                  </Link>
                </Button>
                <Button asChild className="w-full bg-violin-gradient hover:opacity-90">
                  <Link to="/schedule">
                    Agendar Aula Particular
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="border-violin-200">
              <CardHeader>
                <CardTitle className="text-violin-900">Seu Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-violin-600">Conclusão da Aula</span>
                      <span className="text-violin-900 font-medium">0%</span>
                    </div>
                    <div className="w-full bg-violin-200 rounded-full h-2">
                      <div className="bg-violin-gradient h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                  <p className="text-sm text-violin-600">
                    Assista a aula para acompanhar seu progresso.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VideoLesson;
