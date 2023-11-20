import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { EntranceModule } from 'src/entrance/entrance.module';
import { AdminService } from './admin.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    EntranceModule,
    NotificationModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
