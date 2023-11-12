import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
