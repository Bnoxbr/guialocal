import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import SearchResults from "./components/SearchResults";
import BookingConfirmation from "./components/BookingConfirmation";
import GuideDashboard from "./components/dashboard/GuideDashboard";
import { LoginForm } from "./components/auth/LoginForm";

const App = () => {
  return (
    <>
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking/:guideId" element={<BookingConfirmation />} />
        <Route path="/dashboard" element={<GuideDashboard />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Add this before the catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
};

export default App;
