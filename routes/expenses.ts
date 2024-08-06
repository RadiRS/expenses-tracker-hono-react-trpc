import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Food",
    amount: 20,
  },
  {
    id: 2,
    title: "Phone",
    amount: 30,
  },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");

    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

    return c.json({ status: 201, expense });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((item) => item.id === id);

    if (!expense) return c.notFound();

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((item) => item.id === id);

    if (!expense) return c.notFound();

    const deletedExpense = fakeExpenses.filter((item) => item.id !== id);

    return c.json({ expense: deletedExpense });
  });
