import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { ApiPath } from 'src/utils/path.param';

@ApiTags('File Upload')
@Controller('upload')
export class UploadController {

  constructor (
    private uploadMedia: UploadService
  ){}

@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async saveUploadMedia(
  @UploadedFile() file,
  @Body('fileName') fileName: string,
  @Body('fileType') fileType: string
): Promise<ArtisanApiResponse> {
const fileUrl = file && file.filename ? 'https://your-file-storage.com/' + file.filename : '';
  return await this.uploadMedia.saveUploadMedia(fileUrl, fileName, fileType);
}

@Get("/fetch_media")
async listPaginatedMedia(
@Param(ApiPath.PAGE_PARA)
page: number,
@Param(ApiPath.LIMIT_PARAM)
limit: number
): Promise<ArtisanApiResponse> {
  return await this.uploadMedia.listPaginatedMedia(page, limit);
} 
  
}
