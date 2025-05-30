import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Teacher {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  rating: number;
  price_per_hour: number;
  available_times: string[];
}

const Schedule = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [justScheduled, setJustScheduled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching teachers:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os professores.",
          variant: "destructive",
        });
        return;
      }

      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTeacher || !selectedTime || !user) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data, professor e horário.",
        variant: "destructive",
      });
      return;
    }

    setIsConfirming(true);
    
    try {
      const { error } = await supabase
        .from('class_schedules')
        .insert({
          user_id: user.id,
          teacher_id: selectedTeacher,
          scheduled_date: selectedDate.toISOString().split('T')[0],
          scheduled_time: selectedTime,
          status: 'agendado'
        });

      if (error) {
        console.error('Error scheduling class:', error);
        toast({
          title: "Erro",
          description: "Não foi possível agendar a aula. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: "Sua aula foi agendada com sucesso. Você receberá um email de confirmação.",
      });
      
      // Reset form and show success state
      setSelectedTeacher(null);
      setSelectedTime(null);
      setJustScheduled(true);
    } catch (error) {
      console.error('Error scheduling class:', error);
      toast({
        title: "Erro",
        description: "Erro interno. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsConfirming(false);
    }
  };

  const selectedTeacherData = teachers.find(t => t.id === selectedTeacher);

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-violin-900 mb-2">Agendar Aula Particular</h1>
            <p className="text-violin-600">
              Escolha um professor e horário para sua aula individual
            </p>
          </div>

          {/* Success Message */}
          {justScheduled && (
            <Card className="border-green-200 bg-green-50 mb-8">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">Aula Agendada com Sucesso!</h3>
                <p className="text-green-700 mb-4">Sua aula foi agendada. Você pode visualizar todas as suas aulas na página "Minhas Aulas".</p>
                <div className="flex gap-4 justify-center">
                  <Button asChild variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                    <Link to="/my-lessons">Ver Minhas Aulas</Link>
                  </Button>
                  <Button 
                    onClick={() => setJustScheduled(false)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Agendar Outra Aula
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!justScheduled && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <Card className="border-violin-200">
                  <CardHeader>
                    <CardTitle className="text-violin-900 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Selecione a Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => !isDateAvailable(date)}
                      className="rounded-md border border-violin-200"
                    />
                    {selectedDate && (
                      <div className="mt-4 p-3 bg-violin-100 rounded-lg">
                        <p className="text-sm font-medium text-violin-900">Data selecionada:</p>
                        <p className="text-violin-700 capitalize">{formatDate(selectedDate)}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Teachers and Times */}
              <div className="lg:col-span-2 space-y-6">
                {/* Teachers Selection */}
                <Card className="border-violin-200">
                  <CardHeader>
                    <CardTitle className="text-violin-900 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Escolha o Professor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-24 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teachers.map((teacher) => (
                          <Card 
                            key={teacher.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedTeacher === teacher.id 
                                ? 'ring-2 ring-violin-400 bg-violin-50' 
                                : 'border-violin-200'
                            }`}
                            onClick={() => setSelectedTeacher(teacher.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{teacher.avatar}</div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-violin-900">{teacher.name}</h3>
                                  <p className="text-sm text-violin-600">{teacher.specialty}</p>
                                  <p className="text-xs text-violin-500">{teacher.experience}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-medium text-violin-900">
                                      R$ {teacher.price_per_hour?.toFixed(2)}/hora
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                      ⭐ {teacher.rating?.toFixed(1)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Time Selection */}
                {selectedTeacher && selectedTeacherData && (
                  <Card className="border-violin-200">
                    <CardHeader>
                      <CardTitle className="text-violin-900 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Horários Disponíveis
                      </CardTitle>
                      <CardDescription>
                        Horários disponíveis para {selectedTeacherData.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {selectedTeacherData.available_times?.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`${
                              selectedTime === time 
                                ? '  hover:opacity-90' 
                                : 'border-violin-200 hover:bg-violin-50'
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        )) || (
                          <p className="text-violin-500 col-span-full text-center">
                            Nenhum horário disponível
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Confirmation */}
                {selectedDate && selectedTeacher && selectedTime && selectedTeacherData && (
                  <Card className="border-violin-200 bg-violin-50">
                    <CardHeader>
                      <CardTitle className="text-violin-900 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Confirmar Agendamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-violin-700">
                          <strong>Professor:</strong> {selectedTeacherData.name}
                        </p>
                        <p className="text-violin-700">
                          <strong>Data:</strong> {formatDate(selectedDate)}
                        </p>
                        <p className="text-violin-700">
                          <strong>Horário:</strong> {selectedTime}
                        </p>
                        <p className="text-violin-700">
                          <strong>Valor:</strong> R$ {selectedTeacherData.price_per_hour?.toFixed(2)}
                        </p>
                      </div>
                      
                      <Button 
                        onClick={handleSchedule}
                        disabled={isConfirming}
                        className="w-full   hover:opacity-90"
                      >
                        {isConfirming ? 'Agendando...' : 'Confirmar Agendamento'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Schedule;
