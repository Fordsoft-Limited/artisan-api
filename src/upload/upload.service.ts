// upload.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { FileNotFoundException } from "src/filters/file.fount.exception";
import { NotificationMessage } from "src/utils/app.util";
import { FILE_UPLOAD_DIRECTORY } from "src/utils/constants";
import * as uuid from "uuid";
import { Response, Request } from "express";
import * as mimeTypes from "mime-types";

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File, req: Request): Promise<string> {
    if (!file) {
      return "NA";
    }
    const fileId = uuid.v4();
    const originalFileName = file.originalname;
    const sanitizedFileName = originalFileName.replace(/\s/g, "_");
    const fileName = `${fileId}-${sanitizedFileName}`;
    const filePath = path.join(FILE_UPLOAD_DIRECTORY, fileName);

    fs.writeFileSync(filePath, file.buffer);
    const originalHost = req.get('X-Forwarded-Host') || req.get('host');
    return (
      `${req.protocol}://${originalHost}` +
      "/api/v1/entrance/download/file?fileName=" +
      fileName
    );
  }

  async deleteFile(url: string): Promise<void> {
    // Extract filename from URL
    let fileName = url.split("/").pop();
    if (!fileName) return;
    const startIndex = fileName.indexOf("=") + 1;

    const filePath = path.join(
      FILE_UPLOAD_DIRECTORY,
      fileName.substring(startIndex)
    );
    console.log(filePath);
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
    } else {
      throw new FileNotFoundException(NotificationMessage.FILE_NOT_FOUND);
    }
  }

  async downloadFile(fileName: string, res: Response): Promise<void> {
    const filePath = path.join(FILE_UPLOAD_DIRECTORY, `${fileName}`);
    if (!fs.existsSync(filePath)) {
      throw new FileNotFoundException(NotificationMessage.FILE_NOT_FOUND);
    }

    const fileBuffer = fs.readFileSync(filePath);

    // Infer the Content-Type based on the file extension
    const contentType = mimeTypes.contentType(path.extname(fileName));

    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    // Set Content-Disposition for inline display
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    // Send file buffer as response
    res.send(fileBuffer);
  }
}
