
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';

// Mock teachers data
const mockTeachers = [
  {
    id: 1,
    name: 'Prof. Carlos Silva',
    specialty: 'Técnica Clássica',
    experience: '15 anos',
    avatar: '👨‍🏫',
    rating: 4.9,
    price: 'R$ 80/hora'
  },
  {
    id: 2,
    name: 'Profa. Maria Santos',
    specialty: 'Música Popular',
    experience: '12 anos',
    avatar: '👩‍🏫',
    rating: 4.8,
    price: 'R$ 75/hora'
  },
  {
    id: 3,
    name: 'Prof. João Oliveira',
    specialty: 'Iniciantes',
    experience: '8 anos',
    avatar: '👨‍🎓',
    rating: 4.7,
    price: 'R$ 70/hora'
  }
];

// Mock available times
const mockAvailableTimes = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!selectedDate || !selectedTeacher || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data, professor e horário.",
        variant: "destructive",
      });
      return;
    }

    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Sucesso!",
        description: "Sua aula foi agendada com sucesso. Você receberá um email de confirmação.",
      });
      
      // Reset form
      setSelectedTeacher(null);
      setSelectedTime(null);
      setIsConfirming(false);
    }, 2000);
  };

  const selectedTeacherData = mockTeachers.find(t => t.id === selectedTeacher);

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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockTeachers.map((teacher) => (
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
                                <span className="text-sm font-medium text-violin-900">{teacher.price}</span>
                                <Badge variant="secondary" className="text-xs">
                                  ⭐ {teacher.rating}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Selection */}
              {selectedTeacher && (
                <Card className="border-violin-200">
                  <CardHeader>
                    <CardTitle className="text-violin-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Horários Disponíveis
                    </CardTitle>
                    <CardDescription>
                      Horários disponíveis para {selectedTeacherData?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {mockAvailableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`${
                            selectedTime === time 
                              ? 'bg-violin-gradient hover:opacity-90' 
                              : 'border-violin-200 hover:bg-violin-50'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Confirmation */}
              {selectedDate && selectedTeacher && selectedTime && (
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
                        <strong>Professor:</strong> {selectedTeacherData?.name}
                      </p>
                      <p className="text-violin-700">
                        <strong>Data:</strong> {formatDate(selectedDate)}
                      </p>
                      <p className="text-violin-700">
                        <strong>Horário:</strong> {selectedTime}
                      </p>
                      <p className="text-violin-700">
                        <strong>Valor:</strong> {selectedTeacherData?.price}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleSchedule}
                      disabled={isConfirming}
                      className="w-full bg-violin-gradient hover:opacity-90"
                    >
                      {isConfirming ? 'Agendando...' : 'Confirmar Agendamento'}
                    </Button>
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

export default Schedule;
