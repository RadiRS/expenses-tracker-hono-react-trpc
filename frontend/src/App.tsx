import { useQuery } from "@tanstack/react-query";

import api from "./lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const getExpenses = async () => {
  return api.expenses.$get().then((res) => res.json());
};

const App = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (error) return `An error has accurred: ${error.message}`;

  return (
    <div className="container py-5">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data?.totalAmount}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
