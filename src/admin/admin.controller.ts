import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { AdminService } from "./admin.service";
import { UserInvitationRequest } from "src/model/app.request.model";
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiPath } from "src/utils/path.param";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoginUser } from "src/middleware/login.user";
import { GetUserMiddleware } from "src/middleware/get-user.middleware";
import { User } from "src/model/user.schema";
@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("visitors")
  async getPaginatedVisitors(
    @Query(ApiPath.PAGE_PARA)
    page: number,
    @Query(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.getPaginatedVisitors(page, limit);
  }
  @Get("users")
  async getPaginatedUsers(
    @Query(ApiPath.PAGE_PARA)
    page: number,
    @Query(ApiPath.LIMIT_PARAM)
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

  @UseGuards(GetUserMiddleware)
  @Post("/blogs")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        payload: {
          type: "object",
        },
      },
      required: ["payload"],
    },
  })
  async addBlog(@LoginUser() loginUser:User,
    @UploadedFile() file,
    @Body() payload: any
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.addNewBlog(loginUser,file, payload);
  }
}
