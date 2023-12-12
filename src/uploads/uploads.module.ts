import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/multer.configs';

@Module({
   imports: [
    MulterModule.register(multerConfig)
  ],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
