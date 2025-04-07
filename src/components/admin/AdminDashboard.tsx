import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import UserList from "./UserList";
import FinancialData from "./FinancialData";

const PaymentManagement = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Gestão de Pagamentos</h2>
    <p className="text-gray-500">
      Sistema de gestão de pagamentos será implementado aqui.
    </p>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is admin - this is a placeholder, implement proper admin check
  const isAdmin = user?.email?.includes("admin") || true; // Temporarily true for testing

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
        <p className="text-gray-500 mb-4">
          Você não tem permissão para acessar esta página.
        </p>
        <Button onClick={() => navigate("/")}>Voltar para Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Painel de Administração</h1>
      </div>

      <Tabs
        defaultValue="users"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialData />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
