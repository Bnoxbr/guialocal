import React, { useState } from "react";
import { MapPin, Heart, Star, ArrowLeft, Filter, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Guide {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  isFavorite?: boolean;
}

const MobileSearchResults: React.FC = () => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const guides: Guide[] = [
    {
      id: "1",
      title: "Trilha do Pico dos Marins",
      location: "Piquete, SP",
      price: "R$ 180",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    },
    {
      id: "2",
      title: "Tour Gastronômico em Campos do Jordão",
      location: "Campos do Jordão, SP",
      price: "R$ 250",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80",
    },
    {
      id: "3",
      title: "Observação de Aves em Ubatuba",
      location: "Ubatuba, SP",
      price: "R$ 150",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=500&q=80",
    },
    {
      id: "4",
      title: "Passeio de Barco em Ilhabela",
      location: "Ilhabela, SP",
      price: "R$ 300",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=500&q=80",
    },
    {
      id: "5",
      title: "Cachoeiras da Serra da Mantiqueira",
      location: "Santo Antônio do Pinhal, SP",
      price: "R$ 120",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    },
    {
      id: "6",
      title: "Rota do Vinho em São Roque",
      location: "São Roque, SP",
      price: "R$ 280",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&q=80",
    },
  ];

  const toggleFavorite = (id: string) => {
    // Implementar lógica para favoritar
    console.log("Toggle favorite:", id);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="text-gray-600" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Resultados da Busca</h1>
          <button
            className="text-gray-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-white z-40 pt-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center py-4 border-b">
              <h2 className="text-xl font-semibold">Filtros</h2>
              <button
                className="text-gray-600"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>

            <div className="py-4 border-b">
              <h3 className="text-lg font-medium mb-3">Preço</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border rounded-full text-sm">
                  Até R$100
                </button>
                <button className="px-4 py-2 border rounded-full text-sm">
                  R$100-R$200
                </button>
                <button className="px-4 py-2 border rounded-full text-sm">
                  R$200+
                </button>
              </div>
            </div>

            <div className="py-4 border-b">
              <h3 className="text-lg font-medium mb-3">Avaliação</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border rounded-full text-sm flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />{" "}
                  4.5+
                </button>
                <button className="px-4 py-2 border rounded-full text-sm flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />{" "}
                  4.0+
                </button>
              </div>
            </div>

            <div className="py-4">
              <h3 className="text-lg font-medium mb-3">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 border rounded-full text-sm">
                  Aventura
                </button>
                <button className="px-4 py-2 border rounded-full text-sm">
                  Ecoturismo
                </button>
                <button className="px-4 py-2 border rounded-full text-sm">
                  Gastronomia
                </button>
                <button className="px-4 py-2 border rounded-full text-sm">
                  Cultural
                </button>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
              <div className="max-w-md mx-auto flex space-x-4">
                <button className="flex-1 py-2 border rounded-lg">
                  Limpar
                </button>
                <button
                  className="flex-1 py-2 bg-emerald-600 text-white rounded-lg"
                  onClick={() => setShowFilters(false)}
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Map/List View */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-2 flex">
          <button
            className={`flex-1 py-2 text-center ${!showMap ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500"}`}
            onClick={() => setShowMap(false)}
          >
            Lista
          </button>
          <button
            className={`flex-1 py-2 text-center ${showMap ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500"}`}
            onClick={() => setShowMap(true)}
          >
            Mapa
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-16 px-4">
        {showMap ? (
          <div className="h-[calc(100vh-180px)] bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234746.43965861606!2d-45.23576395!3d-23.4355909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cd631551d51f3d%3A0x934663ee4f49338a!2sUbatuba%2C%20SP!5e0!3m2!1sen!2sbr!4v1710016076102!5m2!1sen!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="space-y-4 max-w-md mx-auto">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
                onClick={() => navigate(`/booking/${guide.id}`)}
              >
                <div className="relative">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(guide.id);
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${guide.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1">{guide.title}</h3>
                  <p className="text-gray-500 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {guide.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{guide.rating}</span>
                    </div>
                    <span className="font-bold">{guide.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Map Button (only in list view) */}
      {!showMap && (
        <button
          className="fixed bottom-20 right-4 p-3 bg-emerald-600 text-white rounded-full shadow-lg"
          onClick={() => setShowMap(true)}
        >
          <Map className="h-6 w-6" />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 gap-0 max-w-md mx-auto">
          <button className="flex flex-col items-center justify-center p-2 text-emerald-600">
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs">Explorar</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 text-gray-500">
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs">Favoritos</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 text-gray-500">
            <Star className="h-5 w-5 mb-1" />
            <span className="text-xs">Reservas</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 text-gray-500">
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileSearchResults;
