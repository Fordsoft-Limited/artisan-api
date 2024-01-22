import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { ConversationService } from "./conversation.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoginUser } from "src/middleware/login.user";
import { GetUserMiddleware } from "src/middleware/get-user.middleware";

@ApiTags("Administrative Actions")
@Controller("actions")
@UseGuards(GetUserMiddleware)
export class ConversationController {
  constructor(private conversationService: ConversationService) {}
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
  async addBlog(
    @LoginUser() loginUser: any,
    @UploadedFile() file,
    @Body() payload: any
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.addNewBlog(loginUser, file, payload);
  }

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

  @Post("/artisan")
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
  async addArtisan(
    @LoginUser() loginUser: any,
    @UploadedFile() file,
    @Body() payload: any
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.addArtisan(loginUser, file, payload);
  }

  @Delete("deleteBlog/:id")
  async deleteBlog(@Param("id") id: string): Promise<ArtisanApiResponse> {
    return this.conversationService.deleteBlog(id);
  }

  @Delete("deleteArtisan/:id")
  async deleteArtisan(@Param("id") id: string): Promise<ArtisanApiResponse> {
    return this.conversationService.deleteArtisan(id);
  }

  @Delete("deleteAdvertisement/:id")
  async deleteAdvertisement(
    @Param("id") id: string
  ): Promise<ArtisanApiResponse> {
    return this.conversationService.deleteAdvertisement(id);
  }

  @Delete("deleteVisitor/:id")
  async deleteVisitor(@Param("id") id: string): Promise<ArtisanApiResponse> {
    return this.conversationService.deleteVisitor(id);
  }
}
