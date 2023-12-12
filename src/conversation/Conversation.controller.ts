import { Body, Controller, Get, Param, Post} from '@nestjs/common';
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


   @Post("/blog")
    async createNewBlog(@Body() payload: BlogCreateRequest): Promise<ArtisanApiResponse> {
        return await this.conversationService.createNewBlog(payload);
    }


    @Get("blog")
    async getPaginatedBlog(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.conversationService.getPaginatedBlog(page, limit);
  }


  
   
}
