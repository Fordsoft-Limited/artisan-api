import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MadiaRequest } from 'src/model/app.request.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { Media } from 'src/model/media.schema';
import { ErrorCode, NotificationMessage } from 'src/utils/app.util';
import { DEFAULT_PAGE, DEFAULT_SIZE } from 'src/utils/constants';

@Injectable()
export class UploadService {
 constructor(
   @InjectModel(Media.name)
  private  modelMedia: Model<Media>
 ){}

async saveUploadMedia(fileUrl: string, fileName: string, fileType: string): Promise<ArtisanApiResponse> {
  try {
    // Assuming modelMedia is your Mongoose model
    const newMedia = new this.modelMedia({fileUrl, fileName, fileType});
    
    // Save the document
    const savedMedia = await newMedia.save();

    return new ArtisanApiResponse(
      NotificationMessage.BLOG_SAVED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  } catch (error) {
    console.error('Error saving media URL:', error);
    return new ArtisanApiResponse(
      NotificationMessage.ERROR_SAVING_MEDIA,
      NotificationMessage.FAIL_STATUS,
      ErrorCode.HTTP_500
    );
  }
}

async listPaginatedMedia(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const blog = await this.modelMedia
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      blog,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }


}
