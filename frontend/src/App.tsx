import { useEffect, useState } from "react";

import api from "./lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await api.expenses.$get().then((res) => res.json());
      setTotalSpent(res.totalAmount);
    };

    fetchExpenses();
  }, []);

  return (
    <div className="container py-5">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
