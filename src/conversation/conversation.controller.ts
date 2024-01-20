import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { ConversationService } from "./conversation.service";
import { ApiPath } from "src/utils/path.param";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminService } from "src/admin/admin.service";

@ApiTags("Article")
@Controller("article")
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private adminService: AdminService
  ) {}

  @Post("/advsertisement")
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
      required: ["file", "payload"],
    },
  })
  async addNewAdvertisement(
    @UploadedFile() file,
    @Body() payload: any
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.addNewAdvertisement(file, payload);
  }

  @Get("blogs")
  async listBlogs(
    @Query(ApiPath.PAGE_PARA)
    page: number,
    @Query(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.listBlog(page, limit);
  }
  @Get("advsertisements")
  async listPaginatedAdvertisement(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.listPaginatedAdvertisement(
      page,
      limit
    );
  }
}
