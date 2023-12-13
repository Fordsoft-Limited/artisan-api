import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // specify the destination folder for uploaded files
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
