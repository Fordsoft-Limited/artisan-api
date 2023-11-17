import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Advertisement } from 'src/model/advertisement.schema';
import { AdvertisementRequest } from 'src/model/app.request.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';

@Controller('conversation')
export class ConversationController {

    @Post("/advertisement")
    async addNewAdvertisement(@Body() payload: AdvertisementRequest): Promise<ArtisanApiResponse>{
        return new ArtisanApiResponse("Good", NotificationMessage.SUCCESS_STATUS, ErrorCode.HTTP_200);
    }

    // @Get("/advsertisements")
    // async listAdvertisement(@Param()
    // page: number, 
    // @Param()
    // limit: number): Promise<ArtisanApiResponse>{
    //     return new ArtisanApiResponse(["Test", "Anohter test","More test"], NotificationMessage.SUCCESS_STATUS, ErrorCode.HTTP_200);
    // }


    @Get("/advsertisements")
    async listAllAdvertisement(): Promise<ArtisanApiResponse>{
        return new ArtisanApiResponse( ["Test", "Anohter test","More test"],NotificationMessage.SUCCESS_STATUS, ErrorCode.HTTP_200)
    }

    @Get("/:advertisementsId")
    async getAdvertisement(
         @Param('advertisementsId')
         advertisementsId:string
    ): Promise<ArtisanApiResponse>{
        return new ArtisanApiResponse( ["Test", "Anohter test","More test"],NotificationMessage.SUCCESS_STATUS, ErrorCode.HTTP_200)
    }


}
