import { Injectable } from '@nestjs/common';
import { EntranceService } from 'src/entrance/entrance.service';
import { ArtisanApiResponse } from 'src/model/app.response.model';

@Injectable()
export class AdminService {
    constructor(private entranceService: EntranceService){}
    async getPaginatedVisitors(
       
        page: number,
   
        limit: number
      ): Promise<ArtisanApiResponse> {
return this.entranceService.getPaginatedVisitors(page,limit)
      }

}
