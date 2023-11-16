import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { EntranceModule } from 'src/entrance/entrance.module';
import { AdminService } from './admin.service';
import { User, UserSchema } from 'src/model/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    EntranceModule,
    NotificationModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
