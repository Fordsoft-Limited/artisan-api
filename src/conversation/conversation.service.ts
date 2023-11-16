import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntranceService } from 'src/entrance/entrance.service';
import { Advertisement } from 'src/model/advertisement.schema';
import { AdvertisementRequest } from 'src/model/app.request.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';

@Injectable()
export class ConversationService {

    constructor(private entranceService: EntranceService,
        @InjectModel(Advertisement.name) private advertisementModel: Model<Advertisement>){}

        async addNewAdvertisement(payload: AdvertisementRequest): Promise<ArtisanApiResponse>{
          const existingContact=  await this.entranceService.checkDuplicate({...payload,willIdReturn:false});
          return null;
        }
}
