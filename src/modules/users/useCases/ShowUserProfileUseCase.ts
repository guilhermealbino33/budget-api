import { inject, injectable } from "tsyringe";
import ShowUserProfileService from "../services/showUserProfile.service";

@injectable()
export class ShowUserProfileUseCase {
  constructor(
    @inject("ShowUserProfileService")
    private showUserProfileService: ShowUserProfileService
  ) {}

  async execute(user_id: string) {
    return this.showUserProfileService.execute(user_id);
  }
}
