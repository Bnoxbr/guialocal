import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

interface GuideCardProps {
  name?: string;
  photo?: string;
  location?: string;
  languages?: string[];
  rating?: number;
  specialties?: string[];
}

const GuideCard = ({
  name = "John Doe",
  photo = "https://api.dicebear.com/7.x/avataaars/svg?seed=guide1",
  location = "Serra da Mantiqueira",
  languages = ["Português", "Inglês"],
  rating = 4.8,
  specialties = ["Turismo de Aventura", "Ecoturismo", "Turismo Cultural"],
}: GuideCardProps) => {
  return (
    <Card className="w-[280px] h-[380px] bg-white hover:shadow-lg transition-shadow relative">
      <Button
        className="absolute bottom-4 left-4 right-4 bg-emerald-600 hover:bg-emerald-700"
        onClick={() =>
          (window.location.href = `/booking/${name.toLowerCase().replace(/ /g, "-")}`)
        }
      >
        A partir de R$150
      </Button>
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="w-24 h-24 rounded-full overflow-hidden">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Idiomas</p>
          <div className="flex flex-wrap gap-1">
            {languages.map((language) => (
              <Badge key={language} variant="secondary" className="text-xs">
                {language}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Especialidades</p>
          <div className="flex flex-wrap gap-1">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
