import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { multerConfig } from 'src/multer/multer.configs';

@Controller('uploads')
export class UploadsController {
  @Post('/file')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File',
    type: 'object',
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file) {
    // Handle the uploaded file, e.g., save its information to a database
    console.log(file);
    return { message: 'File uploaded successfully' };
  }
}
