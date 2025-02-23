import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

interface Destination {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

interface DestinationCarouselProps {
  destinations?: Destination[];
}

const DestinationCarousel = ({
  destinations = [
    {
      id: 1,
      title: "Serra da Mantiqueira",
      description: "Trilhas deslumbrantes, cachoeiras e clima de montanha",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      location: "Serra da Mantiqueira",
    },
    {
      id: 2,
      title: "Mantiqueira Paulista",
      description: "Campos de lavanda, araucárias e gastronomia local",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      location: "Mantiqueira Paulista",
    },
    {
      id: 3,
      title: "Litoral Norte",
      description: "Praias paradisíacas e trilhas costeiras",
      imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
      location: "Litoral Norte",
    },
  ],
}: DestinationCarouselProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-16 bg-emerald-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-emerald-900">
        Destinos em Destaque
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {destinations.map((destination) => (
            <CarouselItem
              key={destination.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="mx-2">
                <CardContent className="p-0">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={destination.imageUrl}
                      alt={destination.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                    <h3 className="text-xl font-semibold">
                      {destination.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {destination.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Saiba Mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12" />
        <CarouselNext className="-right-12" />
      </Carousel>
    </div>
  );
};

export default DestinationCarousel;
