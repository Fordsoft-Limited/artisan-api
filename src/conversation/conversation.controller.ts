import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { ConversationService } from "./conversation.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoginUser } from "src/middleware/login.user";
import { AdvertisementRequest, ArtisanRequest, BlogCreateRequest } from "src/model/app.request.model";
import { ErrorCode } from "src/utils/app.util";
import { BaseAuthController } from "src/utils/auth.util";
import {Request} from 'express'

@ApiTags("Administrative Actions")
@Controller("actions")
export class ConversationController  extends BaseAuthController{
  
  constructor(private conversationService: ConversationService) {
    super()
  }
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
    @Body() payload: any,
    @Req()req:Request
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.addNewBlog(loginUser, file, payload,req);
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
    @Body() payload: any,
    @Req()req: Request
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.addNewAdvertisement(file, payload,req);
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
    @Body() payload: any,
    @Req()req:Request
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.addArtisan(loginUser, file, payload,req);
  }

  @Delete("blog/delete/:id")
  async deleteBlog(@Param("id") id: string): Promise<ArtisanApiResponse> {
    return this.conversationService.deleteBlog(id);
  }
  @Delete("user/delete/:id")
  async deleteUser(@Param("id") id: string): Promise<ArtisanApiResponse> {
    return this.conversationService.deleteUser(id);
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

  @Put("updateArtisan/:id")
  @HttpCode(ErrorCode.HTTP_200)
  async updateArtisan(
    @Param("id")
    id: string,
    @Body()
    payload: ArtisanRequest
  ): Promise<ArtisanApiResponse> {
    return this.conversationService.updateArtisan(id, payload);
  }

  @Put("blog/update/:id")
  @HttpCode(ErrorCode.HTTP_200)
  async updateBlog(
    @Param("id")
    id: string,
    @Body()
    payload: BlogCreateRequest
  ): Promise<ArtisanApiResponse> {
    return this.conversationService.updateBlog(id, payload);
  }

  @Put("updateAdvert/:id")
  @HttpCode(ErrorCode.HTTP_200)
  async updateAdvertisement(
    @Param("id")
    id: string,
    @Body()
    payload: AdvertisementRequest
  ): Promise<ArtisanApiResponse> {
    return this.conversationService.updateAdvertisement(id, payload);
  }
}
