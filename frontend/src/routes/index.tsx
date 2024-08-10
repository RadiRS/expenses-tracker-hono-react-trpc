import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import api from "../lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Expense } from "../../../server/routes/expenses";

const getExpenses = async () => {
  return api.expenses.$get().then((res) => res.json());
};

const Home = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (error) return `An error has accurred: ${error.message}`;

  return (
    <div className="container py-5">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data?.totalAmount}</p>
        </CardContent>
      </Card>
      {!isPending && <DataTable data={data?.expenses || []} />}
    </div>
  );
};

const DataTable = ({ data }: { data: Expense[] }) => {
  return (
    <Card className="p-6">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
