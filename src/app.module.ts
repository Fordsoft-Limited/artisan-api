import { Logger, Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { ConversationModule } from './conversation/conversation.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './global/database/database.module';
import SecretConfig from './config/secret.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[SecretConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV ?? ''}.env`,
    }),
    DatabaseModule,
    EntranceModule,
    AdminModule,
    NotificationModule,
    MediaModule,
    ConversationModule,
    AuthModule],
  providers: []
})
export class AppModule {}
