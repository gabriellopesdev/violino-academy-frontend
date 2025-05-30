
import { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  user_id: string;
  profiles?: {
    name: string;
  };
}

interface ForumReply {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    name: string;
  };
}

const Forum = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newReply, setNewReply] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      fetchReplies(selectedPost);
    }
  }, [selectedPost]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as postagens.",
          variant: "destructive",
        });
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async (postId: string) => {
    setRepliesLoading(true);
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`
          *,
          profiles (
            name
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching replies:', error);
        return;
      }

      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setRepliesLoading(false);
    }
  };

  const handleSubmitPost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o título e o conteúdo da sua pergunta.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          user_id: user.id,
          title: newPostTitle.trim(),
          content: newPostContent.trim(),
          category: 'Geral'
        });

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar sua pergunta. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: "Sua pergunta foi enviada com sucesso.",
      });
      
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPostForm(false);
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim() || !selectedPost || !user) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma resposta.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          user_id: user.id,
          post_id: selectedPost,
          content: newReply.trim()
        });

      if (error) {
        console.error('Error creating reply:', error);
        toast({
          title: "Erro",
          description: "Não foi possível enviar sua resposta. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: "Sua resposta foi enviada com sucesso.",
      });
      
      setNewReply('');
      fetchReplies(selectedPost); // Refresh replies
    } catch (error) {
      console.error('Error creating reply:', error);
    }
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

  const getDisplayName = (post: ForumPost) => {
    return post.profiles?.name || 'Usuário';
  };

  const getReplyDisplayName = (reply: ForumReply) => {
    return reply.profiles?.name || 'Usuário';
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
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-violin-200 animate-pulse">
                      <CardHeader>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <Card className="border-violin-200">
                  <CardContent className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-violin-300 mx-auto mb-4" />
                    <p className="text-violin-500">
                      Ainda não há perguntas no fórum. Seja o primeiro a fazer uma pergunta!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
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
                            {getDisplayName(post)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {replies.filter(r => r.user_id === post.user_id).length} respostas
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
                    {repliesLoading ? (
                      <div className="space-y-4">
                        {[1, 2].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-16 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : replies.length === 0 ? (
                      <p className="text-violin-500 text-center py-4">
                        Ainda não há respostas para esta pergunta.
                      </p>
                    ) : (
                      replies.map((reply) => (
                        <div key={reply.id} className="border-l-4 border-violin-200 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-violin-900">{getReplyDisplayName(reply)}</span>
                          </div>
                          <p className="text-violin-700 text-sm mb-2">{reply.content}</p>
                          <span className="text-xs text-violin-500">{formatDate(reply.created_at)}</span>
                        </div>
                      ))
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
