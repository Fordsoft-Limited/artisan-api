import { Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { ConversationModule } from './conversation/conversation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EntranceModule,
    MongooseModule.forRoot(process.env.MONG_CONNECTION_ARTISAN),
    AdminModule,
    NotificationModule,
    MediaModule,
    ConversationModule],
  providers: []
})
export class AppModule {}
