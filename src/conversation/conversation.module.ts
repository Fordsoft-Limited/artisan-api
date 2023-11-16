import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { EntranceModule } from 'src/entrance/entrance.module';
import { Advertisement, AdvertisementSchema } from 'src/model/advertisement.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[EntranceModule, MongooseModule.forFeature([
    { name: Advertisement.name, schema: AdvertisementSchema },
    ,
  ]),],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
