import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Calendar as CalendarIcon,
} from "lucide-react";

interface Booking {
  id: string;
  guideName: string;
  tourType: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  image: string;
}

const TouristBookings = () => {
  const bookings: Booking[] = [
    {
      id: "1",
      guideName: "Turismo de Aventura",
      tourType: "Trilha da Pedra do Baú",
      location: "São Bento do Sapucaí",
      date: "15 de Maio, 2024",
      time: "08:00",
      participants: 2,
      price: 250,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
      id: "2",
      guideName: "Ecoturismo",
      tourType: "Observação de Aves",
      location: "Ubatuba",
      date: "22 de Abril, 2024",
      time: "06:30",
      participants: 1,
      price: 180,
      status: "completed",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    {
      id: "3",
      guideName: "Turismo Cultural",
      tourType: "Centro Histórico",
      location: "Paraty",
      date: "10 de Março, 2024",
      time: "10:00",
      participants: 3,
      price: 120,
      status: "cancelled",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    },
  ];

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusText = (status: Booking["status"]) => {
    switch (status) {
      case "upcoming":
        return "Agendado";
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/50 p-1 w-full justify-start mb-6">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Todas
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Agendadas
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Concluídas
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
          >
            Canceladas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {bookings
            .filter((booking) => booking.status === "upcoming")
            .map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {bookings
            .filter((booking) => booking.status === "completed")
            .map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {bookings
            .filter((booking) => booking.status === "cancelled")
            .map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-md border-none hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img
            src={booking.image}
            alt={booking.tourType}
            className="w-full h-full object-cover"
          />
          <Badge
            className={`absolute top-4 right-4 ${getStatusColor(booking.status)}`}
          >
            {getStatusText(booking.status)}
          </Badge>
        </div>

        <div className="flex-1 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1">{booking.tourType}</h3>
            <p className="text-muted-foreground">{booking.guideName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>{booking.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              <span>
                {booking.participants}{" "}
                {booking.participants === 1 ? "pessoa" : "pessoas"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Valor total</p>
              <p className="text-xl font-semibold">
                R$ {booking.price.toFixed(2)}
              </p>
            </div>

            <div className="space-x-2">
              {booking.status === "upcoming" && (
                <>
                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Reagendar
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Ver Detalhes
                  </Button>
                </>
              )}
              {booking.status === "completed" && (
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Avaliar Experiência
                </Button>
              )}
              {booking.status === "cancelled" && (
                <Button variant="outline">Reservar Novamente</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TouristBookings;
