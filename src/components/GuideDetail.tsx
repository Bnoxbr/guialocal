import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  ArrowLeft,
  Heart,
  Calendar,
  Users,
  Clock,
  Check,
} from "lucide-react";
import BookingConfirmation from "./BookingConfirmation";

interface GuideDetailProps {
  isMobile?: boolean;
}

const GuideDetail: React.FC<GuideDetailProps> = ({ isMobile = true }) => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - in a real app, this would come from an API call using the guideId
  const guide = {
    id: guideId,
    title: "Trilha do Pico dos Marins",
    description:
      "Uma das mais belas trilhas da Serra da Mantiqueira, com vista panorâmica incrível e experiência única de montanhismo.",
    location: "Piquete, SP",
    price: "R$ 180",
    rating: 4.8,
    reviewCount: 32,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80",
    ],
    guideName: "Carlos Oliveira",
    guidePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    guideRating: 4.9,
    guideExperience: "5 anos",
    languages: ["Português", "Inglês"],
    includes: ["Equipamentos", "Lanche", "Fotos"],
    duration: "6 horas",
    difficulty: "Moderada",
    maxPeople: 8,
  };

  if (isMobile) {
    return (
      <div className="relative min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <header className="fixed top-0 w-full bg-white shadow-md z-50 px-4 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <button className="text-gray-600" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">Detalhes</h1>
            <button
              className="text-gray-600"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 pb-24">
          {/* Image Gallery */}
          <div className="relative h-64 bg-gray-200">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex space-x-1">
              {guide.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          {/* Guide Info */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{guide.title}</h2>

            <div className="flex items-center mb-4">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-500 text-sm">{guide.location}</span>
              <div className="ml-auto flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{guide.rating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({guide.reviewCount})
                </span>
              </div>
            </div>

            <div className="border-t border-b py-4 my-4">
              <div className="flex items-center mb-4">
                <img
                  src={guide.guidePhoto}
                  alt={guide.guideName}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium">{guide.guideName}</h3>
                  <p className="text-sm text-gray-500">
                    Guia há {guide.guideExperience}
                  </p>
                </div>
                <div className="ml-auto flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{guide.guideRating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {guide.languages.map((language) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="my-4">
              <h3 className="font-semibold mb-2">Sobre a experiência</h3>
              <p className="text-gray-700">{guide.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Duração</p>
                  <p className="font-medium">{guide.duration}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Máx. pessoas</p>
                  <p className="font-medium">Até {guide.maxPeople}</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <h3 className="font-semibold mb-3">O que está incluso</h3>
              <div className="space-y-2">
                {guide.includes.map((item) => (
                  <div key={item} className="flex items-center">
                    <Check className="h-5 w-5 text-emerald-600 mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div>
              <p className="text-sm text-gray-500">A partir de</p>
              <p className="text-xl font-bold">{guide.price}</p>
            </div>
            <button
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium"
              onClick={() => setShowBookingModal(true)}
            >
              Reservar agora
            </button>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <BookingConfirmation
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            guideData={{
              name: guide.guideName,
              email: "guide@example.com",
              price: parseInt(guide.price.replace("R$ ", "")),
              location: guide.location,
            }}
          />
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          className="flex items-center text-gray-600 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para resultados
        </button>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {/* Image Gallery */}
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {guide.images.map((img, index) => (
                <div
                  key={index}
                  className="h-32 bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`${guide.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Guide Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h1 className="text-2xl font-bold mb-2">{guide.title}</h1>

              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 text-gray-500 mr-1" />
                <span className="text-gray-500">{guide.location}</span>
                <div className="ml-4 flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{guide.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({guide.reviewCount} avaliações)
                  </span>
                </div>
              </div>

              <div className="my-6">
                <h2 className="text-xl font-semibold mb-3">
                  Sobre a experiência
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 my-8">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-emerald-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Duração</p>
                    <p className="font-medium">{guide.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-emerald-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Máx. pessoas</p>
                    <p className="font-medium">Até {guide.maxPeople}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-emerald-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Disponibilidade</p>
                    <p className="font-medium">Todos os dias</p>
                  </div>
                </div>
              </div>

              <div className="my-8">
                <h2 className="text-xl font-semibold mb-4">
                  O que está incluso
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {guide.includes.map((item) => (
                    <div key={item} className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            {/* Guide Profile */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <img
                  src={guide.guidePhoto}
                  alt={guide.guideName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{guide.guideName}</h3>
                  <p className="text-gray-500">
                    Guia há {guide.guideExperience}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{guide.guideRating}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Idiomas</h4>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((language) => (
                    <span
                      key={language}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">A partir de</p>
                  <p className="text-2xl font-bold">{guide.price}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{guide.rating}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border rounded-lg p-3">
                  <label className="block text-sm font-medium mb-1">Data</label>
                  <input type="date" className="w-full" />
                </div>

                <div className="border rounded-lg p-3">
                  <label className="block text-sm font-medium mb-1">
                    Horário
                  </label>
                  <select className="w-full p-1">
                    <option>08:00</option>
                    <option>10:00</option>
                    <option>14:00</option>
                  </select>
                </div>

                <div className="border rounded-lg p-3">
                  <label className="block text-sm font-medium mb-1">
                    Pessoas
                  </label>
                  <select className="w-full p-1">
                    <option>1 pessoa</option>
                    <option>2 pessoas</option>
                    <option>3 pessoas</option>
                    <option>4 pessoas</option>
                  </select>
                </div>
              </div>

              <button
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium"
                onClick={() => setShowBookingModal(true)}
              >
                Reservar agora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingConfirmation
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          guideData={{
            name: guide.guideName,
            email: "guide@example.com",
            price: parseInt(guide.price.replace("R$ ", "")),
            location: guide.location,
          }}
        />
      )}
    </div>
  );
};

export default GuideDetail;
