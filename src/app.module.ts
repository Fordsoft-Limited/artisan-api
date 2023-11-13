import { Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONG_CONNECTION_ARTISAN } from './utils/constants';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [EntranceModule,
    MongooseModule.forRoot(MONG_CONNECTION_ARTISAN),
    AdminModule]
})
export class AppModule {}
