import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import MobileHome from "./components/MobileHome";
import SearchResults from "./components/SearchResults";
import MobileSearchResults from "./components/MobileSearchResults";
import BookingConfirmation from "./components/BookingConfirmation";
import GuideDetail from "./components/GuideDetail";
import GuideDashboard from "./components/dashboard/GuideDashboard";
import TouristDashboard from "./components/dashboard/TouristDashboard";
import { LoginForm } from "./components/auth/LoginForm";
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Use a named function component instead of an arrow function for better Fast Refresh support
function App() {
  // Check if the device is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Separate the tempo routes to avoid potential issues
  const tempoRoutesElement = useRoutes(
    import.meta.env.VITE_TEMPO ? routes : [],
  );

  return (
    <AuthProvider>
      {/* For the tempo routes */}
      {tempoRoutesElement}

      <Routes>
        <Route path="/" element={isMobile ? <MobileHome /> : <Home />} />
        <Route
          path="/search"
          element={isMobile ? <MobileSearchResults /> : <SearchResults />}
        />
        <Route
          path="/booking/:guideId"
          element={<GuideDetail isMobile={isMobile} />}
        />
        <Route path="/dashboard/guide" element={<GuideDashboard />} />
        <Route path="/dashboard" element={<TouristDashboard />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Add this before the catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>

      <Toaster />
    </AuthProvider>
  );
}

export default App;
