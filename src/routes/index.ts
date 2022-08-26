import { Router } from "express";

import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
// router.use("/costumers", costumersRouter);
// router.use("/products", productsRouter);
// router.use("/budgets", budgetsRouter);

export { router };
