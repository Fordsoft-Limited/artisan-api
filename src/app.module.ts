import { Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { EnvService } from './env/env.service';
@Module({
  imports: [EntranceModule,
    MongooseModule.forRoot(process.env.MONG_CONNECTION_ARTISAN),
    AdminModule,
    NotificationModule]
})
export class AppModule {}
