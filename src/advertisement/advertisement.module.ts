import { Module } from '@nestjs/common';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';

@Module({
  controllers: [AdvertisementController],
  providers: [AdvertisementService]
})
export class AdvertisementModule {}
