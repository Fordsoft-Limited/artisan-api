import { Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';

@Module({
  imports: [EntranceModule]
})
export class AppModule {}
