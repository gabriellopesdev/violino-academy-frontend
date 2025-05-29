
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageCircle, User, Clock } from 'lucide-react';

// Mock forum posts
const mockPosts = [
  {
    id: 1,
    title: 'Dificuldade com a posição do arco',
    content: 'Olá pessoal! Estou tendo dificuldade para manter o arco reto durante as arcadas. Alguém tem dicas para melhorar essa técnica?',
    author: 'Maria Silva',
    date: '2024-01-15',
    replies: 3,
    category: 'Técnica'
  },
  {
    id: 2,
    title: 'Recomendações de exercícios para iniciantes',
    content: 'Acabei de começar e gostaria de saber quais exercícios vocês recomendam para desenvolver a coordenação entre mão esquerda e direita.',
    author: 'João Santos',
    date: '2024-01-14',
    replies: 7,
    category: 'Iniciante'
  },
  {
    id: 3,
    title: 'Como melhorar a afinação das cordas soltas?',
    content: 'Tenho dificuldade para afinar meu violino. Uso um aplicativo afinador, mas ainda sinto que não está perfeito. Dicas?',
    author: 'Ana Costa',
    date: '2024-01-13',
    replies: 5,
    category: 'Equipamento'
  }
];

// Mock replies
const mockReplies = {
  1: [
    {
      id: 1,
      content: 'Uma dica que me ajudou muito foi praticar em frente ao espelho. Assim você consegue ver se o arco está reto e corrigir na hora.',
      author: 'Prof. Carlos',
      date: '2024-01-15',
      isTeacher: true
    },
    {
      id: 2,
      content: 'Concordo com o Professor Carlos! Também recomendo exercícios bem lentos no início.',
      author: 'Pedro Lima',
      date: '2024-01-15',
      isTeacher: false
    }
  ]
};

const Forum = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newReply, setNewReply] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o título e o conteúdo da sua pergunta.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit to your API
    toast({
      title: "Sucesso!",
      description: "Sua pergunta foi enviada com sucesso.",
    });
    
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostForm(false);
  };

  const handleSubmitReply = () => {
    if (!newReply.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma resposta.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit to your API
    toast({
      title: "Sucesso!",
      description: "Sua resposta foi enviada com sucesso.",
    });
    
    setNewReply('');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Técnica':
        return 'bg-blue-100 text-blue-800';
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Equipamento':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-violin-900 mb-2">Fórum da Comunidade</h1>
              <p className="text-violin-600">Tire suas dúvidas e compartilhe conhecimento com outros alunos</p>
            </div>
            <Button 
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="bg-violin-gradient hover:opacity-90 mt-4 sm:mt-0"
            >
              Nova Pergunta
            </Button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <Card className="border-violin-200 mb-6">
              <CardHeader>
                <CardTitle className="text-violin-900">Fazer Nova Pergunta</CardTitle>
                <CardDescription>
                  Compartilhe sua dúvida com a comunidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Título da sua pergunta"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="border-violin-200"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Descreva sua dúvida em detalhes..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="border-violin-200 min-h-[120px]"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSubmitPost}
                    className="bg-violin-gradient hover:opacity-90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Pergunta
                  </Button>
                  <Button 
                    onClick={() => setShowNewPostForm(false)}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Posts List */}
            <div className="lg:col-span-2 space-y-4">
              {mockPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className={`border-violin-200 cursor-pointer transition-shadow hover:shadow-lg ${
                    selectedPost === post.id ? 'ring-2 ring-violin-400' : ''
                  }`}
                  onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-violin-900 hover:text-violin-700">
                          {post.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-violin-600">
                      {post.content}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-violin-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies} respostas
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Post Details */}
            <div className="lg:col-span-1">
              {selectedPost ? (
                <Card className="border-violin-200 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-violin-900">Respostas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Replies */}
                    {mockReplies[selectedPost as keyof typeof mockReplies]?.map((reply) => (
                      <div key={reply.id} className="border-l-4 border-violin-200 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-violin-900">{reply.author}</span>
                          {reply.isTeacher && (
                            <Badge className="bg-gold-100 text-gold-800 text-xs">
                              Professor
                            </Badge>
                          )}
                        </div>
                        <p className="text-violin-700 text-sm mb-2">{reply.content}</p>
                        <span className="text-xs text-violin-500">{formatDate(reply.date)}</span>
                      </div>
                    )) || (
                      <p className="text-violin-500 text-center py-4">
                        Ainda não há respostas para esta pergunta.
                      </p>
                    )}

                    {/* Reply Form */}
                    <div className="border-t border-violin-200 pt-4">
                      <Textarea
                        placeholder="Digite sua resposta..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        className="border-violin-200 mb-3"
                      />
                      <Button 
                        onClick={handleSubmitReply}
                        className="w-full bg-violin-gradient hover:opacity-90"
                        size="sm"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-violin-200">
                  <CardContent className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-violin-300 mx-auto mb-4" />
                    <p className="text-violin-500">
                      Selecione uma pergunta para ver as respostas
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Forum;
