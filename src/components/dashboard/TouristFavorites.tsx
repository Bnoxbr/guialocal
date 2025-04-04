import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, MapPin, Heart } from "lucide-react";

interface FavoriteItem {
  id: string;
  type: "guide" | "destination" | "tour";
  name: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  price?: number;
  tags: string[];
}

const TouristFavorites = () => {
  const favorites: FavoriteItem[] = [
    {
      id: "1",
      type: "tour",
      name: "Trilha da Pedra do Baú",
      description:
        "Uma das mais belas trilhas da Serra da Mantiqueira, com vista panorâmica incrível.",
      location: "São Bento do Sapucaí",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      rating: 4.9,
      price: 150,
      tags: ["Aventura", "Trilha", "Natureza"],
    },
    {
      id: "2",
      type: "destination",
      name: "Ilhabela",
      description:
        "Paraíso natural com praias, cachoeiras e trilhas em meio à Mata Atlântica.",
      location: "Litoral Norte de SP",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
      rating: 4.8,
      tags: ["Praia", "Natureza", "Ilha"],
    },
    {
      id: "3",
      type: "guide",
      name: "Ecoturismo Mantiqueira",
      description:
        "Especialistas em observação de aves e fauna local com equipamentos profissionais.",
      location: "Serra da Mantiqueira",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      rating: 4.95,
      price: 200,
      tags: ["Ecoturismo", "Aves", "Fotografia"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <FavoriteCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const FavoriteCard = ({ item }: { item: FavoriteItem }) => {
  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-md border-none hover:shadow-lg transition-all h-full flex flex-col">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 text-white hover:text-white bg-black/20 hover:bg-black/30 rounded-full"
        >
          <Heart className="w-5 h-5 fill-white" />
        </Button>
        <Badge className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-emerald-800">
          {item.type === "guide"
            ? "Guia"
            : item.type === "destination"
              ? "Destino"
              : "Tour"}
        </Badge>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{item.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin className="w-3 h-3" />
            <span>{item.location}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-emerald-50">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex justify-between items-center">
          {item.price ? (
            <div>
              <p className="text-sm text-muted-foreground">A partir de</p>
              <p className="font-semibold">R$ {item.price}</p>
            </div>
          ) : (
            <div></div>
          )}
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            {item.type === "guide"
              ? "Contatar"
              : item.type === "destination"
                ? "Explorar"
                : "Reservar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TouristFavorites;
