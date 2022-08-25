import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { CreateUserService } from "../../modules/users/services/createUser.service";
import ShowUserProfileService from "../../modules/users/services/showUserProfile.service";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

// Users
container.registerSingleton("CreateUserService", CreateUserService);
container.registerSingleton("ShowUserProfileService", ShowUserProfileService);
