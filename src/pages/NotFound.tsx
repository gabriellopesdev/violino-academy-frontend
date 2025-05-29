
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-8xl mb-8">🎻</div>
          <h1 className="text-6xl font-bold text-violin-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-violin-800 mb-4">
            Página não encontrada
          </h2>
          <p className="text-violin-600 mb-8">
            Parece que a página que você está procurando não existe. 
            Que tal voltar para o início e explorar nossos cursos de violino?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-violin-gradient hover:opacity-90">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/classes">
                Ver Nossos Cursos
              </Link>
            </Button>
          </div>
          
          <div className="mt-8">
            <Button asChild variant="ghost" className="text-violin-600">
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à página anterior
              </button>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
