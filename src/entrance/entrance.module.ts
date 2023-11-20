import { Module } from '@nestjs/common';
import { EntranceController } from './entrance.controller';
import { EntranceService } from './entrance.service';

@Module({
  imports: [
  ],
  controllers: [EntranceController],
  providers: [EntranceService],
  exports: [EntranceService],
})
export class EntranceModule {}
