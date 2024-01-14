import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { ConversationModule } from './conversation/conversation.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './global/database/database.module';
import SecretConfig from './config/secret.config'
import { AdminController } from './admin/admin.controller';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { ConversationController } from './conversation/ConversationController';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    EntranceModule,
    AdminModule,
    NotificationModule,
    MediaModule,
    ConversationModule,
    UploadModule],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {

    consumer
        .apply(GetUserMiddleware)
        .forRoutes(
            ConversationController,
            AdminController
        );

}
}
