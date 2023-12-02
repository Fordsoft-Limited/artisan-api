import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './ConversationController';
import { EntranceModule } from 'src/entrance/entrance.module';
import { AdminService } from 'src/admin/admin.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports:[EntranceModule],
  providers: [ConversationService, AdminService, NotificationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
