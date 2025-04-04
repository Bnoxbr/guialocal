import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { toggleFavorite } from "../lib/supabaseClient";
import { useToast } from "./ui/use-toast";

interface FavoriteButtonProps {
  guideId: string;
  initialIsFavorite?: boolean;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  guideId,
  initialIsFavorite = false,
  className = "",
  variant = "ghost",
  size = "icon",
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para favoritar guias",
        variant: "default",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error, action } = await toggleFavorite(user.id, guideId);

      if (error) {
        throw error;
      }

      setIsFavorite(action === "added");

      toast({
        title:
          action === "added"
            ? "Adicionado aos favoritos"
            : "Removido dos favoritos",
        description:
          action === "added"
            ? "Guia adicionado à sua lista de favoritos"
            : "Guia removido da sua lista de favoritos",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao atualizar favoritos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      <Heart
        className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButton;
