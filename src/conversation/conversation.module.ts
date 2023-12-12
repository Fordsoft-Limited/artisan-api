import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { EntranceModule } from 'src/entrance/entrance.module';

@Module({
  imports:[EntranceModule,
   
  ],
  providers: [ConversationService],
})
export class ConversationModule {}
