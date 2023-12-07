import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { AdminService } from "./admin.service";
import { UserInvitationRequest } from "src/model/app.request.model";
import { ApiTags } from "@nestjs/swagger";
import { ApiPath } from "src/utils/path.param";
import { AuthenticationGuard } from "src/guards/authentication.guard";
@ApiTags("admin")
@Controller("admin")
@UseGuards(AuthenticationGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("visitors")
  async getPaginatedVisitors(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.getPaginatedVisitors(page, limit);
  }
  @Get("users")
  async getPaginatedUsers(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.getPaginatedUsers(page, limit);
  }
  @Post("user/send/invitation")
  async sendInvitationToUser(
      @Body()
    invitationRequest: UserInvitationRequest
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.sendInvitationToUser(invitationRequest);
  }
}
