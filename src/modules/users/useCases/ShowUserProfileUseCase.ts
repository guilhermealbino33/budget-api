import { inject, injectable } from "tsyringe";
import ShowUserProfileService from "../services/showUserProfile.service";

@injectable()
export class ShowUserProfileUseCase {
  constructor(
    @inject("ShowUserProfileService")
    private showUserProfileService: ShowUserProfileService
  ) {}

  execute(user_id: string) {
    this.showUserProfileService.execute(user_id);
  }
}
