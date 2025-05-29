
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Home, Download, ChevronLeft } from 'lucide-react';

// Mock lesson data
const mockLessons = {
  '1': {
    title: 'Introdução ao Violino - Postura e Arco',
    description: 'Aprenda a postura correta e como segurar o arco adequadamente. Esta aula fundamental estabelece as bases para tocar violino com técnica adequada.',
    duration: '15 min',
    level: 'Iniciante',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: [
      { name: 'Apostila - Postura Correta.pdf', url: '#' },
      { name: 'Exercícios de Aquecimento.pdf', url: '#' }
    ],
    topics: [
      'Como segurar o violino corretamente',
      'Posição do arco na mão direita',
      'Postura corporal adequada',
      'Exercícios de relaxamento'
    ]
  },
  '2': {
    title: 'Primeiras Notas - Cordas Soltas',
    description: 'Domine o som das cordas soltas antes de aprender as posições.',
    duration: '20 min',
    level: 'Iniciante',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: [
      { name: 'Cordas Soltas - Exercícios.pdf', url: '#' },
      { name: 'Áudio de Referência.mp3', url: '#' }
    ],
    topics: [
      'Afinação das cordas',
      'Som das cordas soltas',
      'Ritmo e tempo',
      'Exercícios básicos'
    ]
  }
};

const VideoLesson = () => {
  const { id } = useParams();
  const lesson = id ? mockLessons[id as keyof typeof mockLessons] : null;

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
    alert(`Baixando: ${materialName}`);
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
                  <iframe
                    className="w-full h-full rounded-t-lg"
                    src={lesson.videoUrl}
                    title={lesson.title}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-violin-900 mb-4">Conteúdo da Aula</h3>
                  <ul className="space-y-2">
                    {lesson.topics.map((topic, index) => (
                      <li key={index} className="flex items-center text-violin-700">
                        <span className="w-2 h-2 bg-violin-400 rounded-full mr-3"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
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
                {lesson.materials.map((material, index) => (
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
                ))}
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
                      <span className="text-violin-900 font-medium">100%</span>
                    </div>
                    <div className="w-full bg-violin-200 rounded-full h-2">
                      <div className="bg-violin-gradient h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-violin-600">
                    Parabéns! Você completou esta aula.
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
