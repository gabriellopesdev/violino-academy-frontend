
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    question: 'Qual é a ordem correta das cordas do violino, da mais grave para a mais aguda?',
    options: [
      'Mi, Lá, Ré, Sol',
      'Sol, Ré, Lá, Mi',
      'Ré, Sol, Mi, Lá',
      'Lá, Mi, Sol, Ré'
    ],
    correct: 1,
    explanation: 'A ordem correta das cordas do violino da mais grave para a mais aguda é: Sol (G), Ré (D), Lá (A), Mi (E).'
  },
  {
    id: 2,
    question: 'Qual é a postura correta para segurar o violino?',
    options: [
      'Apoiar o violino no ombro direito',
      'Segurar o violino com as duas mãos',
      'Apoiar o violino entre o ombro esquerdo e o queixo',
      'Apoiar o violino no peito'
    ],
    correct: 2,
    explanation: 'O violino deve ser apoiado entre o ombro esquerdo e o queixo, permitindo que a mão esquerda se mova livremente pelo braço do instrumento.'
  },
  {
    id: 3,
    question: 'O que é a técnica "détaché" no violino?',
    options: [
      'Uma técnica de pizzicato',
      'Uma técnica de arco onde cada nota é tocada com uma arcada separada',
      'Uma técnica de vibrato',
      'Uma técnica de mudança de posição'
    ],
    correct: 1,
    explanation: 'Détaché é uma técnica fundamental de arco onde cada nota é tocada com uma arcada separada e clara.'
  }
];

const Evaluation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione uma resposta antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === mockQuestions[index].correct ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setShowResult(true);
    }
  };

  const handleShowExplanation = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione uma resposta primeiro.",
        variant: "destructive",
      });
      return;
    }
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setScore(0);
  };

  const currentQuestionData = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / mockQuestions.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen bg-violin-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-violin-200 text-center">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4">
                  {score >= mockQuestions.length * 0.7 ? (
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  ) : (
                    <XCircle className="w-20 h-20 text-red-500" />
                  )}
                </div>
                <CardTitle className="text-2xl text-violin-900">
                  Avaliação Concluída!
                </CardTitle>
                <CardDescription>
                  Você acertou {score} de {mockQuestions.length} questões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-violin-900">
                  {Math.round((score / mockQuestions.length) * 100)}%
                </div>
                
                {score >= mockQuestions.length * 0.7 ? (
                  <div className="text-green-600">
                    <p className="text-lg font-semibold">Parabéns!</p>
                    <p>Você demonstrou um bom entendimento dos conceitos básicos do violino.</p>
                  </div>
                ) : (
                  <div className="text-yellow-600">
                    <p className="text-lg font-semibold">Continue praticando!</p>
                    <p>Revise o material das aulas e tente novamente para melhorar sua pontuação.</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={resetQuiz} className="bg-violin-gradient hover:opacity-90">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Tentar Novamente
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/dashboard">Voltar ao Dashboard</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-violin-600 mb-2">
              <span>Questão {currentQuestion + 1} de {mockQuestions.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Question Card */}
          <Card className="border-violin-200">
            <CardHeader>
              <CardTitle className="text-violin-900">
                {currentQuestionData.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Options */}
              <RadioGroup value={selectedAnswer?.toString() || ""} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer p-3 rounded-lg border border-violin-200 hover:bg-violin-50 transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Explanation */}
              {showExplanation && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                        selectedAnswer === currentQuestionData.correct ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {selectedAnswer === currentQuestionData.correct ? '✓' : '✗'}
                      </div>
                      <div>
                        <p className="font-semibold text-violin-900 mb-2">
                          {selectedAnswer === currentQuestionData.correct ? 'Correto!' : 'Incorreto'}
                        </p>
                        <p className="text-violin-700">{currentQuestionData.explanation}</p>
                        {selectedAnswer !== currentQuestionData.correct && (
                          <p className="text-green-700 mt-2">
                            <strong>Resposta correta:</strong> {currentQuestionData.options[currentQuestionData.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                {!showExplanation ? (
                  <Button 
                    onClick={handleShowExplanation}
                    variant="outline"
                    className="order-2 sm:order-1"
                  >
                    Ver Explicação
                  </Button>
                ) : (
                  <div className="order-2 sm:order-1"></div>
                )}
                
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-violin-gradient hover:opacity-90 order-1 sm:order-2"
                >
                  {currentQuestion < mockQuestions.length - 1 ? 'Próxima Questão' : 'Finalizar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Evaluation;
