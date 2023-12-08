import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './Conversation.controller';
import { EntranceModule } from 'src/entrance/entrance.module';

@Module({
  imports:[EntranceModule],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
