import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { MediaModule } from './media/media.module';
import { ConversationModule } from './conversation/conversation.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './global/database/database.module';
import { AdminController } from './admin/admin.controller';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { ConversationController } from './conversation/conversation.controller';
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
    UploadModule
  ],

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
