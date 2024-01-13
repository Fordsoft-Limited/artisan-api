// upload.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FileNotFoundException } from 'src/filters/file.fount.exception';
import { NotificationMessage } from 'src/utils/app.util';
import { FILE_UPLOAD_DIRECTORY } from 'src/utils/constants';
import * as uuid from 'uuid';

@Injectable()
export class UploadService {
  
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileId = uuid.v4();
        const fileName = `${fileId}-${file.originalname}`;
        const filePath = path.join(FILE_UPLOAD_DIRECTORY, fileName);
    
        fs.writeFileSync(filePath, file.buffer);
    
        return fileName; 
      }
 

  async downloadFile(fileName: string): Promise<Buffer> {
    const filePath = path.join(FILE_UPLOAD_DIRECTORY, `${fileName}`);
    
    if (!fs.existsSync(filePath)) {
      throw new FileNotFoundException(NotificationMessage.FILE_NOT_FOUND);
    }

    return fs.readFileSync(filePath);
  }
}
