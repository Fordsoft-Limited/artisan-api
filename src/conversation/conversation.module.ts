import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './ConversationController';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports:[AdminModule],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
