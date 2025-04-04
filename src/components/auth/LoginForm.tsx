import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../context/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message || "Verifique suas credenciais",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login realizado com sucesso",
        description: "Redirecionando para o dashboard",
      });

      // Redirecionar para o dashboard após login
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center space-y-2">
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={() => navigate("/forgot-password")}
                disabled={isLoading}
              >
                Esqueceu sua senha?
              </Button>

              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Não tem uma conta?
                </span>
                <Button
                  variant="link"
                  className="text-sm"
                  onClick={() => navigate("/register")}
                  disabled={isLoading}
                >
                  Registre-se
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
