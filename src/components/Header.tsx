
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Home, User, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Get user name from user metadata
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-violin-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10   rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎻</span>
            </div>
            <span className="text-xl font-bold text-violin-800">
              Aulas de Violino
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-violin-700 hover:text-violin-900 transition-colors">
              Início
            </Link>
            <Link to="/about" className="text-violin-700 hover:text-violin-900 transition-colors">
              Sobre
            </Link>
            <Link to="/classes" className="text-violin-700 hover:text-violin-900 transition-colors">
              Aulas
            </Link>
            <Link to="/contact" className="text-violin-700 hover:text-violin-900 transition-colors">
              Contato
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-violin-700 hover:text-violin-900 transition-colors">
                  Dashboard
                </Link>
                <Link to="/forum" className="text-violin-700 hover:text-violin-900 transition-colors">
                  Fórum
                </Link>
                <Link to="/schedule" className="text-violin-700 hover:text-violin-900 transition-colors">
                  Agendamento
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-violin-700">Olá, {userName}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="  hover:opacity-90">
                  <Link to="/register">Cadastrar</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-violin-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/" 
                className="text-violin-700 hover:text-violin-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/about" 
                className="text-violin-700 hover:text-violin-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                to="/classes" 
                className="text-violin-700 hover:text-violin-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Aulas
              </Link>
              <Link 
                to="/contact" 
                className="text-violin-700 hover:text-violin-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-violin-700 hover:text-violin-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/forum" 
                    className="text-violin-700 hover:text-violin-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Fórum
                  </Link>
                  <Link 
                    to="/schedule" 
                    className="text-violin-700 hover:text-violin-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Agendamento
                  </Link>
                </>
              )}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-violin-200">
                {isAuthenticated ? (
                  <>
                    <span className="text-violin-700">Olá, {userName}</span>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-fit">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-fit">
                      <Link to="/login">Entrar</Link>
                    </Button>
                    <Button asChild className="  hover:opacity-90 w-fit">
                      <Link to="/register">Cadastrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
