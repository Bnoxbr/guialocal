import React from "react";
import HeroSection from "./HeroSection";
import FeaturedGuides from "./FeaturedGuides";
import DestinationCarousel from "./DestinationCarousel";
import RegistrationSection from "./RegistrationSection";

const StepsSection = () => (
  <div className="py-16 bg-emerald-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-emerald-900">
        Encontre seu guia em 3 cliques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            step: 1,
            title: "Escolha o destino",
            description:
              "Selecione entre Sul de Minas, Mantiqueira Paulista ou Litoral Norte",
            icon: "🗺️",
          },
          {
            step: 2,
            title: "Defina a experiência",
            description:
              "Escolha entre trilhas, praias, cachoeiras e muito mais",
            icon: "🏃‍♂️",
          },
          {
            step: 3,
            title: "Reserve seu guia",
            description: "Conecte-se com guias locais certificados",
            icon: "✨",
          },
        ].map((step) => (
          <div
            key={step.step}
            className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">
              {step.title}
            </h3>
            <p className="text-emerald-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection className="flex" />
      {/* Featured Guides Section - Moved directly below Hero */}
      <div className="py-8">
        <FeaturedGuides />
      </div>
      {/* Destination Carousel Section */}
      <div className="py-12 bg-gray-50">
        <DestinationCarousel />
      </div>
      {/* Registration Section */}
      <div className="py-12">
        <RegistrationSection />
      </div>
    </div>
  );
};

export default Home;
