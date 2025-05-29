
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-violin-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-violin-900 font-bold">🎻</span>
              </div>
              <span className="text-xl font-bold">Aulas de Violino</span>
            </div>
            <p className="text-violin-100 mb-4 max-w-md">
              Aprenda violino com os melhores professores online. Nossa plataforma oferece aulas 
              personalizadas, materiais de qualidade e acompanhamento individual para seu desenvolvimento musical.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-violin-200 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/about" className="block text-violin-200 hover:text-white transition-colors">
                Sobre
              </Link>
              <Link to="/classes" className="block text-violin-200 hover:text-white transition-colors">
                Aulas
              </Link>
              <Link to="/contact" className="block text-violin-200 hover:text-white transition-colors">
                Contato
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <div className="space-y-2">
              <Link to="/support" className="block text-violin-200 hover:text-white transition-colors">
                Central de Ajuda
              </Link>
              <Link to="/login" className="block text-violin-200 hover:text-white transition-colors">
                Fazer Login
              </Link>
              <Link to="/register" className="block text-violin-200 hover:text-white transition-colors">
                Criar Conta
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-violin-800 mt-8 pt-8 text-center">
          <p className="text-violin-200">
            © 2024 Site de Aulas de Violino. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
