
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Sucesso!",
          description: "Login realizado com sucesso.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro interno do servidor. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="gradient-bg min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-violin-200 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-violin-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎻</span>
              </div>
              <CardTitle className="text-2xl text-violin-900">Fazer Login</CardTitle>
              <CardDescription className="text-violin-600">
                Entre na sua conta para acessar as aulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-violin-200 focus:border-violin-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-violin-200 focus:border-violin-400"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-violin-gradient hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-violin-600">
                  Não tem uma conta?{' '}
                  <Link to="/register" className="text-violin-800 hover:text-violin-900 font-semibold">
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
