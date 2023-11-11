import { Controller, Get } from '@nestjs/common';
import { ArtisanApiResponse } from 'src/model/app.model';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';
import { VisitorService } from './visitor.service';

@Controller('visitor')
export class VisitorController {
    constructor(private visitorService: VisitorService){}
    @Get()
    async getData():Promise<ArtisanApiResponse>{
       return this.visitorService.getData()
    }
}
