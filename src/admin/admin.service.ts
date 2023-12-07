import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { EntranceService } from "src/entrance/entrance.service";
import {
  DuplicateResourceException,
} from "src/filters/app.custom.exception";
import {
  UserInvitationRequest,
} from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Category } from "src/model/contact.schema";
import { User } from "src/model/user.schema";
import { NotificationService } from "src/notification/notification.service";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";

@Injectable()
export class AdminService {

  constructor(
    private autService: AuthService,
    private entranceService: EntranceService,
    private notificationSerivce: NotificationService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}
  async getPaginatedUsers(page: number, limit: number): Promise<ArtisanApiResponse> {
    return await this.autService.getPaginatedUsers(page, limit);
  }
 
  async checkDuplicateUsername(
    userRequest: UserInvitationRequest
  ): Promise<void> {
    await this.entranceService.checkDuplicate({
      ...userRequest,
      willIdReturn: false,
    });
    const existingUser = await this.userModel.findOne({
      username: userRequest.email,
    });
    if (existingUser) {
      throw new DuplicateResourceException(
        NotificationMessage.DUPLICATE_ACCOUNT
      );
    }
  }
  async sendInvitationToUser(
    invitationRequest: UserInvitationRequest
  ): Promise<ArtisanApiResponse> {
    await this.checkDuplicateUsername(invitationRequest);
    const savedContact = await this.entranceService.createContact({
      ...invitationRequest,
      category: Category.User,
    });
    const notificationCode = await this.notificationSerivce.sendInvitationCode(
      invitationRequest.email
    );
    console.log("The code sent his this::::::::", notificationCode);
    const savedUser = new this.userModel({
      username: invitationRequest.email,
      contact: savedContact._id,
      invitationCode: notificationCode,
      isActive: false,
      isBlocked: false,
    });
    await savedUser.save();
    console.log("Record saved successfully");
    return new ArtisanApiResponse(
      NotificationMessage.INVITATION_SENT,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async getPaginatedVisitors(
    page: number,
    limit: number
  ): Promise<ArtisanApiResponse> {
    return this.autService.getPaginatedVisitors(page, limit);
  }
}
