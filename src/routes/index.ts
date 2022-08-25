import { Router } from "express";

import { authenticationRouter } from "./user/authentication.routes";
import { userProfileRouter } from "./user/userProfile.routes";
import { usersRouter } from "./user/users.routes";

const router = Router();

router.use("/", authenticationRouter);
router.use("/users", usersRouter);
router.use("/profile", userProfileRouter);

export { router };
