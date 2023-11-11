import { Module } from '@nestjs/common';
import { EntranceController } from './entrance.controller';
import { EntranceService } from './entrance.service';

@Module({
  controllers: [EntranceController],
  providers: [EntranceService]
})
export class EntranceModule {}
