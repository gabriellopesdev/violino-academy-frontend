
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressSection = () => {
  return (
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
  );
};

export default ProgressSection;
