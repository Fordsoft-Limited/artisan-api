import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdvertisementRequest, BlogCreateRequest } from 'src/model/app.request.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { ConversationService } from './conversation.service';
import { ApiPath } from 'src/utils/path.param';

@ApiTags("Conversation")
@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Post("/advsertisement")
    async addNewAdvertisement(@Body() payload: AdvertisementRequest): Promise<ArtisanApiResponse> {
        return await this.conversationService.addNewAdvertisement(payload);
    }


    @Get("advsertisements")
    async listPaginatedAdvertisement(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.listPaginatedAdvertisement(page, limit);
  }

   @Post("/blogs")
    async addNewBlog(@Body() payload: BlogCreateRequest): Promise<ArtisanApiResponse> {
        return await this.conversationService.addNewBlog(payload);
    }

    @Get("blog")
    async listPaginatedBlog(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.listPaginatedBlog(page, limit);
  }


  @Put('advertisement/:id')
  async updateAdvertisement(@Param('id')
   id: string,
   @Body()
   payload: AdvertisementRequest): Promise<ArtisanApiResponse>{
    return this.conversationService.updateAdvertisement(id, payload)
   }
   
}
