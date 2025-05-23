import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Calendar } from "lucide-react";
import { Label } from "./ui/label";
import { AuthButton } from "./auth/AuthButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  backgroundImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&h=1200&fit=crop",
  title = "Descubra locais, viva momentos",
  subtitle = "Conecte-se com guias locais certificados para experiências inesquecíveis",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full min-h-[600px] md:h-[600px] bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <AuthButton />
        </div>
        <div className="flex flex-col justify-center items-center text-center text-white h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl font-light">
            {subtitle}
          </p>

          <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md rounded-md border border-white/10 shadow-lg p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Select>
                  <SelectTrigger className="w-full bg-white/90 text-gray-900 border-0 shadow-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <SelectValue placeholder="Selecione o local" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <p className="font-semibold mb-2 text-sm text-primary">
                        Serra da Mantiqueira MG/SP
                      </p>
                      <SelectItem value="campos-do-jordao">
                        Campos do Jordão
                      </SelectItem>
                      <SelectItem value="sao-bento-sapucai">
                        São Bento do Sapucaí
                      </SelectItem>
                      <SelectItem value="monte-verde">Monte Verde</SelectItem>
                      <SelectItem value="goncalves">Gonçalves</SelectItem>
                    </div>

                    <div className="p-2 border-t">
                      <p className="font-semibold mb-2 text-sm text-primary">
                        Litoral Norte Paulista
                      </p>
                      <SelectItem value="ubatuba">Ubatuba</SelectItem>
                      <SelectItem value="ilhabela">Ilhabela</SelectItem>
                      <SelectItem value="sao-sebastiao">
                        São Sebastião
                      </SelectItem>
                      <SelectItem value="caraguatatuba">
                        Caraguatatuba
                      </SelectItem>
                    </div>

                    <div className="p-2 border-t">
                      <p className="font-semibold mb-2 text-sm text-primary">
                        Litoral Sul Fluminense
                      </p>
                      <SelectItem value="paraty">Paraty</SelectItem>
                      <SelectItem value="angra-dos-reis">
                        Angra dos Reis
                      </SelectItem>
                      <SelectItem value="buzios">Búzios</SelectItem>
                      <SelectItem value="cabo-frio">Cabo Frio</SelectItem>
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Select>
                  <SelectTrigger className="w-full bg-white/90 text-gray-900 border-0 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <SelectValue placeholder="Selecione a atividade" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trekking">Trekking</SelectItem>
                    <SelectItem value="cultural">Turismo Cultural</SelectItem>
                    <SelectItem value="aventura">
                      Turismo de Aventura
                    </SelectItem>
                    <SelectItem value="gastronomico">
                      Turismo Gastronômico
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Select>
                  <SelectTrigger className="w-full bg-white/90 text-gray-900 border-0 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <SelectValue placeholder="Selecione as datas" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-4">
                      <div className="space-y-2">
                        <Label>Check-in</Label>
                        <Input type="date" className="w-full" />
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label>Check-out</Label>
                        <Input type="date" className="w-full" />
                      </div>
                      <Button
                        className="w-full mt-4"
                        onClick={() => (window.location.href = "/search")}
                      >
                        Buscar Experiências
                      </Button>
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
