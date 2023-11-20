import { Logger, Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { ConversationModule } from './conversation/conversation.module';
import { AppConfig } from './config/app.config';
import SecretConfig from './config/secret.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[SecretConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV ?? ''}.env`,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>(AppConfig.MONGO_CONNECTION_ARTISAN);
        Logger.log(`MongoDB Connection URI: ${uri}`);
        return { uri };
      },
      inject: [ConfigService],
    }),
    EntranceModule,
    AdminModule,
    NotificationModule,
    MediaModule,
    ConversationModule],
  providers: []
})
export class AppModule {}
