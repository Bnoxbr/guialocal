import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { RefreshCw, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Transaction = {
  id: string;
  created_at: string;
  amount: number;
  status: string;
  type: string;
  description: string;
  user_id?: string;
  guide_id?: string;
};

type RevenueData = {
  month: string;
  revenue: number;
  bookings: number;
};

const FinancialData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("transactions");

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      // Fetch transactions
      const { data: transactionsData, error: transactionsError } =
        await supabase
          .from("transactions")
          .select("*")
          .order("created_at", { ascending: false });

      if (transactionsError) throw transactionsError;

      // For demo purposes, generate some sample data if no transactions exist
      const finalTransactions = transactionsData?.length
        ? transactionsData
        : generateSampleTransactions();

      setTransactions(finalTransactions);

      // Generate monthly revenue data
      const monthlyData = generateMonthlyRevenueData(finalTransactions);
      setRevenueData(monthlyData);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  // Generate sample transactions for demo purposes
  const generateSampleTransactions = (): Transaction[] => {
    const types = ["booking", "commission", "refund"];
    const statuses = ["completed", "pending", "failed"];
    const sampleTransactions = [];

    for (let i = 0; i < 20; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const amount = Math.floor(Math.random() * 500) + 50;
      const daysAgo = Math.floor(Math.random() * 60);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      sampleTransactions.push({
        id: `tr-${i + 1000}`,
        created_at: date.toISOString(),
        amount: type === "refund" ? -amount : amount,
        status,
        type,
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} payment`,
        user_id: `user-${Math.floor(Math.random() * 100) + 1}`,
        guide_id:
          type === "commission"
            ? `guide-${Math.floor(Math.random() * 50) + 1}`
            : undefined,
      });
    }

    return sampleTransactions;
  };

  // Generate monthly revenue data
  const generateMonthlyRevenueData = (
    transactions: Transaction[],
  ): RevenueData[] => {
    const monthlyData: {
      [key: string]: { revenue: number; bookings: number };
    } = {};

    // Initialize last 6 months
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthlyData[monthKey] = { revenue: 0, bookings: 0 };
    }

    // Aggregate transaction data
    transactions.forEach((transaction) => {
      if (transaction.status === "completed") {
        const date = new Date(transaction.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        if (monthlyData[monthKey]) {
          monthlyData[monthKey].revenue += transaction.amount;
          if (transaction.type === "booking") {
            monthlyData[monthKey].bookings += 1;
          }
        }
      }
    });

    // Convert to array and sort by month
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        bookings: data.bookings,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dados Financeiros</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchFinancialData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="transactions"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="revenue">Receita Mensal</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-4">Carregando...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Nenhuma transação encontrada
                        </TableCell>
                      </TableRow>
                    ) : (
                      transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-xs">
                            {transaction.id}
                          </TableCell>
                          <TableCell>
                            {formatDate(transaction.created_at)}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction.type === "booking"
                                  ? "bg-blue-100 text-blue-800"
                                  : transaction.type === "commission"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.type === "booking"
                                ? "Reserva"
                                : transaction.type === "commission"
                                  ? "Comissão"
                                  : "Reembolso"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.status === "completed"
                                ? "Concluído"
                                : transaction.status === "pending"
                                  ? "Pendente"
                                  : "Falhou"}
                            </span>
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.amount < 0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {formatCurrency(transaction.amount)}
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

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-4">Carregando...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead>Reservas</TableHead>
                      <TableHead className="text-right">Receita</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          Nenhum dado de receita encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      revenueData.map((data) => (
                        <TableRow key={data.month}>
                          <TableCell>{formatMonthName(data.month)}</TableCell>
                          <TableCell>{data.bookings}</TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            {formatCurrency(data.revenue)}
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

export default FinancialData;
