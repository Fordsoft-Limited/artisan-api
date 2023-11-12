import { Module } from '@nestjs/common';
import { ArtisanController } from './artisan.controller';
import { ArtisanService } from './artisan.service';

@Module({
  controllers: [ArtisanController],
  providers: [ArtisanService]
})
export class ArtisanModule {}
