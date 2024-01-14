import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { NotificationModule } from 'src/notification/notification.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    NotificationModule,
    AuthModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
