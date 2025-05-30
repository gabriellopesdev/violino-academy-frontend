
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const QuickActionsSection = () => {
  return (
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
  );
};

export default QuickActionsSection;
