import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AuthButton = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => navigate("/login")}
      >
        <UserCircle className="w-5 h-5" />
        Entrar
      </Button>
    );
  }

  const userType = user?.user_metadata?.type || "tourist";
  const dashboardPath =
    userType === "guide" ? "/dashboard/guide" : "/dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <UserCircle className="w-5 h-5" />
          Minha Conta
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate(dashboardPath)}>
          Meu Painel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/bookings")}>
          Minhas Reservas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Meu Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
