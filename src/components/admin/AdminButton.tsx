import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 opacity-50 hover:opacity-100 transition-opacity"
      onClick={() => navigate("/admin")}
    >
      <Settings className="w-4 h-4" />
      Admin
    </Button>
  );
};
