import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { EntranceModule } from 'src/entrance/entrance.module';
import { AdminService } from './admin.service';

@Module({
  imports: [
    EntranceModule,
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
