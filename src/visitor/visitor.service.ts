import { Injectable } from '@nestjs/common';
import { ArtisanApiResponse } from 'src/model/app.model';
import { NotificationMessage, ErrorCode } from 'src/utils/app.util';

@Injectable()
export class VisitorService {
    
    async getData():Promise<ArtisanApiResponse>{
        return new ArtisanApiResponse(["Osun","Ibadan","Oyo"], NotificationMessage.SUCCESS_STATUS, ErrorCode.HTTP_200)
    }
}
