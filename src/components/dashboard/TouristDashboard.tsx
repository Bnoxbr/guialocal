import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TouristProfile from "./TouristProfile";
import TouristBookings from "./TouristBookings";
import TouristFavorites from "./TouristFavorites";

const TouristDashboard = () => {
  return (
    <div className="container mx-auto py-8 bg-gradient-to-br from-slate-50 to-emerald-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-emerald-800">Meu Painel</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-white/50 p-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Meu Perfil
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Minhas Reservas
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Favoritos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <TouristProfile />
        </TabsContent>

        <TabsContent value="bookings">
          <TouristBookings />
        </TabsContent>

        <TabsContent value="favorites">
          <TouristFavorites />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TouristDashboard;
