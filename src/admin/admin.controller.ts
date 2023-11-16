import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { AdminService } from "./admin.service";
import { UserInvitationRequest } from "src/model/app.request.model";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("visitors")
  async getPaginatedVisitors(
    @Param()
    page: number,
    @Param()
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.getPaginatedVisitors(page, limit);
  }
  @Post("user/send/invitation")
  async sendInvitationToUser(
      @Body()
    invitationRequest: UserInvitationRequest
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.sendInvitationToUser(invitationRequest);
  }
}
