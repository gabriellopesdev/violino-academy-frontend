
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, MapPin, Phone } from 'lucide-react';

interface ScheduledLesson {
  id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  teacher: {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    price_per_hour: number;
  };
}

const MyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<ScheduledLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchScheduledLessons();
    }
  }, [user]);

  const fetchScheduledLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('class_schedules')
        .select(`
          *,
          teacher:teachers (
            id,
            name,
            specialty,
            avatar,
            price_per_hour
          )
        `)
        .eq('user_id', user?.id)
        .order('scheduled_date', { ascending: true })
        .order('scheduled_time', { ascending: true });

      if (error) {
        console.error('Error fetching scheduled lessons:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar suas aulas agendadas.",
          variant: "destructive",
        });
        return;
      }

      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching scheduled lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelLesson = async (lessonId: string) => {
    try {
      const { error } = await supabase
        .from('class_schedules')
        .update({ status: 'cancelado' })
        .eq('id', lessonId);

      if (error) {
        console.error('Error canceling lesson:', error);
        toast({
          title: "Erro",
          description: "Não foi possível cancelar a aula.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Aula cancelada com sucesso.",
      });

      // Refresh the lessons
      fetchScheduledLessons();
    } catch (error) {
      console.error('Error canceling lesson:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      case 'concluido':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const isUpcoming = (date: string, time: string) => {
    const lessonDateTime = new Date(`${date}T${time}`);
    return lessonDateTime > new Date();
  };

  // Separate upcoming and past lessons
  const upcomingLessons = lessons.filter(lesson => 
    isUpcoming(lesson.scheduled_date, lesson.scheduled_time) && lesson.status !== 'cancelado'
  );
  
  const pastLessons = lessons.filter(lesson => 
    !isUpcoming(lesson.scheduled_date, lesson.scheduled_time) || lesson.status === 'cancelado'
  );

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-violin-900 mb-2">Minhas Aulas</h1>
            <p className="text-violin-600">
              Visualize e gerencie suas aulas agendadas
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse border-violin-200">
                  <CardContent className="p-6">
                    <div className="h-24 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Lessons */}
              <div>
                <h2 className="text-2xl font-bold text-violin-900 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Próximas Aulas ({upcomingLessons.length})
                </h2>
                
                {upcomingLessons.length === 0 ? (
                  <Card className="border-violin-200">
                    <CardContent className="p-8 text-center">
                      <Calendar className="w-12 h-12 mx-auto text-violin-400 mb-4" />
                      <p className="text-violin-600 mb-4">Você não tem aulas agendadas.</p>
                      <Button asChild className="  hover:opacity-90">
                        <a href="/schedule">Agendar Nova Aula</a>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {upcomingLessons.map((lesson) => (
                      <Card key={lesson.id} className="border-violin-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{lesson.teacher.avatar}</div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-semibold text-violin-900">
                                    {lesson.teacher.name}
                                  </h3>
                                  <Badge className={getStatusColor(lesson.status)}>
                                    {lesson.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-violin-600 mb-2">{lesson.teacher.specialty}</p>
                                <div className="flex items-center space-x-4 text-sm text-violin-700">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(lesson.scheduled_date)}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {formatTime(lesson.scheduled_time)}
                                  </div>
                                </div>
                                {lesson.notes && (
                                  <p className="text-sm text-violin-600 mt-2">
                                    <strong>Observações:</strong> {lesson.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-violin-900 mb-2">
                                R$ {lesson.teacher.price_per_hour?.toFixed(2)}
                              </p>
                              {lesson.status === 'agendado' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => cancelLesson(lesson.id)}
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  Cancelar
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Lessons */}
              {pastLessons.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-violin-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Histórico de Aulas ({pastLessons.length})
                  </h2>
                  
                  <div className="space-y-4">
                    {pastLessons.map((lesson) => (
                      <Card key={lesson.id} className="border-violin-200 opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl opacity-60">{lesson.teacher.avatar}</div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-semibold text-violin-900">
                                    {lesson.teacher.name}
                                  </h3>
                                  <Badge className={getStatusColor(lesson.status)}>
                                    {lesson.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-violin-600 mb-2">{lesson.teacher.specialty}</p>
                                <div className="flex items-center space-x-4 text-sm text-violin-700">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(lesson.scheduled_date)}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {formatTime(lesson.scheduled_time)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-violin-900">
                                R$ {lesson.teacher.price_per_hour?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyLessons;
