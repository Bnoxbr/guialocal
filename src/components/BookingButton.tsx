import React, { useState } from "react";
import { Button } from "./ui/button";
import BookingConfirmation from "./BookingConfirmation";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

interface BookingButtonProps {
  guideData: {
    name: string;
    email: string;
    price: number;
    location: string;
  };
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  guideData,
  className = "",
  variant = "default",
  size = "default",
  children = "Reservar agora",
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para fazer uma reserva",
        variant: "default",
      });
      navigate("/login");
      return;
    }

    setShowBookingModal(true);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleBookingClick}
      >
        {children}
      </Button>

      {showBookingModal && (
        <BookingConfirmation
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          guideData={guideData}
        />
      )}
    </>
  );
};

export default BookingButton;
