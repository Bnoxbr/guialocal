import React, { useState } from "react";
import { MapPin, Calendar, Search, Heart, User } from "lucide-react";

const MobileHome: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDates, setSelectedDates] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showDatesDropdown, setShowDatesDropdown] = useState(false);

  const locations = [
    "Montanhas Paulistas",
    "Sul de Minas",
    "Litoral Norte SP",
    "Serra da Mantiqueira",
  ];

  const activities = ["Ecoturismo", "Gastronomia", "Aventura", "Cultural"];

  const categories = [
    {
      id: 1,
      title: "Ecoturismo",
      image:
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&q=80",
      count: "42 experiências",
    },
    {
      id: 2,
      title: "Gastronomia",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
      count: "35 experiências",
    },
    {
      id: 3,
      title: "Aventura",
      image:
        "https://images.unsplash.com/photo-1496947850313-7743325fa58c?w=500&q=80",
      count: "28 experiências",
    },
    {
      id: 4,
      title: "Cultural",
      image:
        "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?w=500&q=80",
      count: "31 experiências",
    },
  ];

  const experiences = [
    {
      id: 1,
      title: "Trilha do Pico dos Marins",
      location: "Piquete, SP",
      price: "R$ 180",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    },
    {
      id: 2,
      title: "Tour Gastronômico em Campos do Jordão",
      location: "Campos do Jordão, SP",
      price: "R$ 250",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80",
    },
    {
      id: 3,
      title: "Observação de Aves em Ubatuba",
      location: "Ubatuba, SP",
      price: "R$ 150",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=500&q=80",
    },
    {
      id: 4,
      title: "Passeio de Barco em Ilhabela",
      location: "Ilhabela, SP",
      price: "R$ 300",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=500&q=80",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Nav Bar */}
      <nav className="fixed top-0 w-full max-w-md mx-auto bg-white shadow-sm z-50">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold text-primary">LocalGuia</div>
          <button
            className="text-gray-600 hover:text-primary"
            onClick={() => (window.location.href = "/login")}
          >
            <User className="h-5 w-5" /> Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] mt-14">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
            alt="Serra da Mantiqueira ao entardecer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        <div className="relative pt-12 sm:pt-20 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Descubra locais, viva momentos
          </h1>
          <p className="text-base sm:text-lg text-white mb-6 sm:mb-8 font-light">
            Conecte-se com guias locais certificados para experiências
            inesquecíveis
          </p>

          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-md rounded-md border border-white/10 shadow-lg p-4 mx-auto max-w-md">
            <div className="relative mb-3">
              <button
                className="w-full px-4 py-2 text-left border border-gray-200 rounded-md shadow-sm flex items-center bg-white"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              >
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                {selectedLocation || "Selecione o local"}
                <span className="ml-auto text-gray-400">▼</span>
              </button>
              {showLocationDropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationDropdown(false);
                      }}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mb-3">
              <button
                className="w-full px-4 py-2 text-left border border-gray-200 rounded-md shadow-sm flex items-center bg-white"
                onClick={() => setShowActivityDropdown(!showActivityDropdown)}
              >
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                {selectedActivity || "Selecione a atividade"}
                <span className="ml-auto text-gray-400">▼</span>
              </button>
              {showActivityDropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedActivity(activity);
                        setShowActivityDropdown(false);
                      }}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mb-3">
              <button
                className="w-full px-4 py-2 text-left border border-gray-200 rounded-md shadow-sm flex items-center bg-white"
                onClick={() => setShowDatesDropdown(!showDatesDropdown)}
              >
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                {selectedDates || "Selecione as datas"}
                <span className="ml-auto text-gray-400">▼</span>
              </button>
              {showDatesDropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg z-10 p-4 max-h-72 overflow-y-auto">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Data de início
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <label className="block text-sm font-medium">
                      Data de fim
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <button
                    className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      setSelectedDates("15/05 - 20/05");
                      setShowDatesDropdown(false);
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              )}
            </div>

            <button
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm"
              onClick={() => (window.location.href = "/search")}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 py-8 mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Categorias</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="text-center p-4 bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-medium mb-2 text-gray-800">
                {category.title}
              </h3>
              <p className="text-xs text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Experiences */}
      <div className="px-4 py-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Experiências em Destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{experience.title}</h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  {experience.location}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{experience.rating}</span>
                  </div>
                  <span className="font-bold">{experience.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 shadow-md">
        <div className="grid grid-cols-5 gap-0">
          <button className="flex flex-col items-center justify-center p-2 text-primary">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">Explorar</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 text-gray-500 hover:text-primary transition-colors"
            onClick={() => (window.location.href = "/search")}
          >
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs">Favoritos</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 text-gray-500 hover:text-primary transition-colors"
            onClick={() => (window.location.href = "/dashboard")}
          >
            <Calendar className="h-5 w-5 mb-1" />
            <span className="text-xs">Reservas</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 text-gray-500 hover:text-primary transition-colors"
            onClick={() => (window.location.href = "/profile")}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-2 text-gray-500 hover:text-primary transition-colors"
            onClick={() => (window.location.href = "/login")}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Login</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileHome;
