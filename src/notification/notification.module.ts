import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EnvService } from 'src/env/env.service';

@Module({
  providers: [NotificationService,EnvService],
  exports:[NotificationService,EnvService]
})
export class NotificationModule {}
