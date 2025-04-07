import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Search, UserPlus, RefreshCw } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("tourists");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch tourists
      const { data: touristsData, error: touristsError } = await supabase
        .from("profiles")
        .select("*")
        .eq("type", "tourist");

      if (touristsError) throw touristsError;

      // Fetch guides
      const { data: guidesData, error: guidesError } = await supabase
        .from("guides")
        .select("*");

      if (guidesError) throw guidesError;

      setUsers(touristsData || []);
      setGuides(guidesData || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredGuides = guides.filter(
    (guide) =>
      guide.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar usuários..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchUsers}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Usuário
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="tourists"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tourists">Turistas</TabsTrigger>
          <TabsTrigger value="guides">Guias</TabsTrigger>
        </TabsList>

        <TabsContent value="tourists">
          <Card>
            <CardHeader>
              <CardTitle>Turistas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-4">Carregando...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          Nenhum turista encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name || "--"}</TableCell>
                          <TableCell>{user.email || "--"}</TableCell>
                          <TableCell>{user.phone || "--"}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Ativo
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="destructive" size="sm">
                                Desativar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>Guias</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-4">Carregando...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Especialidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuides.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          Nenhum guia encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredGuides.map((guide) => (
                        <TableRow key={guide.id}>
                          <TableCell>{guide.name || "--"}</TableCell>
                          <TableCell>{guide.email || "--"}</TableCell>
                          <TableCell>{guide.specialty || "--"}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Ativo
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="destructive" size="sm">
                                Desativar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserList;
