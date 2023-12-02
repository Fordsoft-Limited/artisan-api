import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdvertisementRequest } from 'src/model/app.request.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { ConversationService } from './conversation.service';
import { ApiPath } from 'src/utils/path.param';
import { AdminService } from 'src/admin/admin.service';

@ApiTags("Conversation")
@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService,
      private adminService:AdminService) { }

    @Post("/advsertisement")
    async addNewAdvertisement(@Body() payload: AdvertisementRequest): Promise<ArtisanApiResponse> {
        return await this.conversationService.addNewAdvertisement(payload);
    }

    // @Get("/advsertisements")
    // async listPaginatedAdvertisement(@Param()
    // page: number,
    // @Param()
    // limit: number): Promise<ArtisanApiResponse>{
    //     return new ArtisanApiResponse(["Test", "Anohter test","More test"], NotificationMessage.SUCCESS_STATUS, ErrorCode.HTTP_200);
    // }

    @Get("advertisement")
    async listPaginatedAdvertisement(
    @Param(ApiPath.PAGE_PARA)
    page: number,
    @Param(ApiPath.LIMIT_PARAM)
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.adminService.getPaginatedAdvertisement(page, limit);
  }

    
   
}
