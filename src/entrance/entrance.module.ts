import { Global, Module } from '@nestjs/common';
import { EntranceController } from './entrance.controller';
import { EntranceService } from './entrance.service';
@Global()
@Module({
  imports: [
  ],
  controllers: [EntranceController],
  providers: [EntranceService],
  exports: [EntranceService],
})
export class EntranceModule {}
