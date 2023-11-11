import { Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { VisitorModule } from './visitor/visitor.module';

@Module({
  imports: [EntranceModule, VisitorModule]
})
export class AppModule {}
