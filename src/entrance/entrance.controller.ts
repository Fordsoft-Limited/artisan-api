import { Body, Controller, Get, HttpCode, Param, Post, Query, Res } from "@nestjs/common";
import { EntranceService } from "./entrance.service";
import { LoginRequest } from "./model/login.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { ErrorCode } from "src/utils/app.util";
import {
  AccountActivationRequest,
  ArtisanRequest,
  RatingRequest,
  VisitorRequest,
} from "src/model/app.request.model";
import { ApiTags } from "@nestjs/swagger";
import { ApiPath } from "src/utils/path.param";
@ApiTags("Entrance")
@Controller("entrance")
export class EntranceController {
  constructor(private entranceService: EntranceService) {}

  @Get("blogs")
  async listBlogs(
    @Query(ApiPath.PAGE_PARA)
    page: number,
    @Query(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.listBlog(page, limit);
  }
  @Get("advsertisements")
  async listPaginatedAdvertisement(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.listPaginatedAdvertisement(page, limit);
  }
  @Get("artisans")
  async listPaginatedArtisan(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.listPaginatedArtisan(page, limit);
  }

  @Post("artisans/rating")
  async rateArtisan(
    @Body() payload: RatingRequest
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.rateArtisan(payload);
  }

  @Get("recent/blog")
  async listRecentBlogs(
    @Query(ApiPath.PAGE_PARA)
    page: number,
    @Query(ApiPath.LIMIT_PARAM) 
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.listRecentBlogs(page, limit);
  }

  @Post("/account/activate")
  @HttpCode(ErrorCode.HTTP_200)
  async activateAccount(
    @Body()
    payload: AccountActivationRequest
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.activateAccount(payload);
  }
  @Post("login")
  @HttpCode(ErrorCode.HTTP_200)
  async login(@Body() payload: LoginRequest): Promise<ArtisanApiResponse> {
    return await this.entranceService.login(payload);
  }
  @Post("visitor/register")
  async createVisitRequest(
    @Body()
    visitorRequest: VisitorRequest
  ): Promise<ArtisanApiResponse> {
    return await this.entranceService.createVisitRequest(visitorRequest);
  }
}
