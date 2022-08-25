import { Router } from "express";
import { AuthenticateUserController } from "../../modules/users/controllers/AuthenticateUserController";

const authenticationRouter = Router();
const authenticateUserController = new AuthenticateUserController();

authenticationRouter.post("/sessions", authenticateUserController.execute);

export { authenticationRouter };
